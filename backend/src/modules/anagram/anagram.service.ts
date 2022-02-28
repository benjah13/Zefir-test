import { Inject, Injectable } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { ConfigService } from '../config/config.service';
import { writeAnagramsFile } from '../utils/anagram.tools';
import { Anagram } from './anagram.entity';
import { AnagramRepository, ANAGRAM_REPOSITORY } from './repository/anagram.repository';
import { EventEmitter } from 'events';
import fs from 'fs';
import readline from 'readline';
@Injectable()
export class AnagramService {
  constructor(@Inject(ANAGRAM_REPOSITORY) private readonly anagramRepository: AnagramRepository, private readonly configService: ConfigService) {}

  async getAnagramForUser(userId: string) {
    return this.anagramRepository.getByUserId(userId);
  }

  async createAnagram(userId: string) {
    const id = uuid();
    const bus = new EventEmitter();

    console.log('start to write file');
    let anagrams = '';
    const timestamp = new Date().getTime();

    writeAnagramsFile(Number(this.configService.get('ANAGRAM_WORD_COUNT') || '10'), `anagramFile_${timestamp}.txt`, async () => {
      anagrams = await this.generateAnagramsUsingFile(timestamp);
      await this.anagramRepository.saveAnagram(new Anagram({ id, userId, anagramMap: anagrams }));
      console.log(`anagram ${id} created`);
      bus.emit('fileWritten');
    });
    return new Promise((resolve) => {
      bus.once('fileWritten', resolve);
    });
  }

  private async generateAnagramsUsingFile(timestamp: number) {
    async function computeAnagramsMap() {
      const fileStream = fs.createReadStream(`anagramFile_${timestamp}.txt`);
      const anagramsMap: any = {};

      const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity,
      });

      let word = '';
      let count = 0;
      let sortedWord = '';
      for await (const line of rl) {
        if (line.split('').sort().join('') === sortedWord) {
          count++;
        } else {
          if (count > 0) anagramsMap[word] = count;
          word = line;
          sortedWord = word.split('').sort().join('');
          count = 0;
        }
      }
      anagramsMap[word] = count;

      return JSON.stringify(anagramsMap);
    }
    const anagrams = await computeAnagramsMap();
    fs.unlinkSync(`anagramFile_${timestamp}.txt`);
    return anagrams;
  }
}
