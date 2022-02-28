import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('anagram')
export class Anagram {
  @PrimaryGeneratedColumn('uuid', { name: 'anagram_id' })
  id: string;

  @Column({ name: 'user_id', type: 'varchar', length: 200, nullable: false })
  userId: string;

  @Column({ name: 'anagram_map', type: 'jsonb', nullable: false })
  anagramMap: string;

  constructor(copy: Partial<Anagram> = {}) {
    this.id = getOrDefault(copy.id, '');
    this.userId = getOrDefault(copy.userId, '');
    this.anagramMap = getOrDefault(copy.anagramMap, '');
  }
}

export function getOrDefault<T>(source: T | undefined, defaultValue: T) {
  return source === undefined ? defaultValue : source;
}
