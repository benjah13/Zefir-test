import { User } from '../user.entity';

export const USER_REPOSITORY = Symbol();

export interface UserRepository {
  saveUser(user: User): Promise<void>;
  getUserByEmail(email: string): Promise<User | undefined>;
  getAllUsers(): Promise<User[]>;
  deleteAll(): Promise<void>;
}
