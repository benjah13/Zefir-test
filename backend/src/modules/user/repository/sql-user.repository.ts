import { User } from '../user.entity';
import { UserRepository } from './user.repository';
import { AbstractRepository, EntityRepository } from 'typeorm';

@EntityRepository(User)
export class SqlUserRepository extends AbstractRepository<User> implements UserRepository {
  users: User[] = [];

  async saveUser(user: User): Promise<void> {
    await this.repository.save(user);
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    return await this.repository.createQueryBuilder('user').where('user.email = :email', { email }).getOne();
  }

  async getAllUsers(): Promise<User[]> {
    return await this.repository.createQueryBuilder('user').getMany();
  }

  async deleteAll(): Promise<void> {
    await this.repository.delete({});
  }
}
