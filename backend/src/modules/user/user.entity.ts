import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('user')
export class User {
  @PrimaryGeneratedColumn('uuid', { name: 'user_id' })
  id: string;

  @Column({ name: 'email', type: 'varchar', length: 200, nullable: false, unique: true })
  email: string;

  @Column({ name: 'fib', type: 'int', nullable: false })
  fib: number;

  constructor(copy: Partial<User> = {}) {
    this.id = getOrDefault(copy.id, '');
    this.fib = getOrDefault(copy.fib, 0);
    this.email = getOrDefault(copy.email, '');
  }
}

export function getOrDefault<T>(source: T | undefined, defaultValue: T) {
  return source === undefined ? defaultValue : source;
}
