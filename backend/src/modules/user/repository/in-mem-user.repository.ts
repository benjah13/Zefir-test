import { User } from '../user.entity';
import { UserRepository } from './user.repository';

export class InMemUserRepository implements UserRepository {
  users: User[] = [];

  async saveUser(user: User): Promise<void> {
    this.users.push(user);
  }

  async updateUser(user: User): Promise<void> {
    const matchingUserIdx = this.users.findIndex((existingUser) => existingUser.id === user.id);
    if (matchingUserIdx !== undefined) this.users.splice(matchingUserIdx);
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
