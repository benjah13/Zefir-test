import { Anagram } from '../anagram.entity';

export const ANAGRAM_REPOSITORY = Symbol();

export interface AnagramRepository {
  saveAnagram(anagram: Anagram): Promise<void>;
  getByUserId(userId: string): Promise<Anagram | undefined>;
  deleteAll(): Promise<void>;
}
