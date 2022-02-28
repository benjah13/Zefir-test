import { User } from '../user.entity';
import { UserRepository } from './user.repository';

export class InMemUserRepository implements UserRepository {
  users: User[] = [];

  async saveUser(user: User): Promise<void> {
    this.users.push(user);
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    return this.users.find((user: User) => user.email === email);
  }

  async getAllUsers(): Promise<User[]> {
    return this.users;
  }

  async deleteAll(): Promise<void> {
    this.clear();
  }

  clear() {
    this.users = [];
  }

  count() {
    return this.users.length;
  }
}
