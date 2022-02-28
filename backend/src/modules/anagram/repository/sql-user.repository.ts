import { AbstractRepository, EntityRepository } from 'typeorm';
import { Anagram } from '../anagram.entity';
import { AnagramRepository } from './anagram.repository';

@EntityRepository(Anagram)
export class SqlAnagramRepository extends AbstractRepository<Anagram> implements AnagramRepository {
  users: Anagram[] = [];

  async saveAnagram(anagram: Anagram): Promise<void> {
    await this.repository.save(anagram);
  }

  async getByUserId(userId: string): Promise<Anagram | undefined> {
    return await this.repository.createQueryBuilder('anagram').where('anagram.user_id = :userId', { userId }).getOne();
  }

  async deleteAll(): Promise<void> {
    await this.repository.delete({});
  }
}
