import { Inject, Injectable } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { ConfigService } from '../config/config.service';
import { writeAnagramsFile } from '../utils/anagram.tools';
import { Anagram } from './anagram.entity';
import { AnagramRepository, ANAGRAM_REPOSITORY } from './repository/anagram.repository';
import { EventEmitter } from 'events';

@Injectable()
export class AnagramService {
  constructor(@Inject(ANAGRAM_REPOSITORY) private readonly anagramRepository: AnagramRepository, private readonly configService: ConfigService) {}

  async createAnagram(userId: string) {
    const id = uuid();
    const bus = new EventEmitter();

    console.log('start to write file');
    let anagrams = '';

    writeAnagramsFile(
      Number(this.configService.get('ANAGRAM_WORD_COUNT') || '10'),
      'tmp',
      Number(this.configService.get('ANAGRAM_MIN_LENGTH') || '4'),
      Number(this.configService.get('ANAGRAM_MAX_LENGTH') || '5'),
      async () => {
        anagrams = await this.generateAnagramsUsingFile();
        await this.anagramRepository.saveAnagram(new Anagram({ id, userId, anagramMap: anagrams }));
        console.log(`anagram ${id} created`);
        bus.emit('fileWritten');
      },
    );
    return new Promise((resolve) => {
      bus.once('fileWritten', resolve);
    });
  }

  async generateAnagramsUsingFile() {
    const fs = require('fs');
    const readline = require('readline');

    async function processLineByLine() {
      const fileStream = fs.createReadStream('tmp');
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
    const anagrams = await processLineByLine();
    return anagrams;
  }
}
