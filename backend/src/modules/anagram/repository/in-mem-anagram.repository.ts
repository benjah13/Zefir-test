import { Anagram } from '../anagram.entity';
import { AnagramRepository } from './anagram.repository';

export class InMemAnagramRepository implements AnagramRepository {
  anagrams: Anagram[] = [];

  async saveAnagram(anagram: Anagram): Promise<void> {
    this.anagrams.push(anagram);
  }

  async getByUserId(userId: string): Promise<Anagram | undefined> {
    return this.anagrams.find((anagram: Anagram) => anagram.userId === userId);
  }

  async getAllAnagrams(): Promise<Anagram[]> {
    return this.anagrams;
  }

  async deleteAll(): Promise<void> {
    this.clear();
  }

  clear() {
    this.anagrams = [];
  }

  count() {
    return this.anagrams.length;
  }
}
