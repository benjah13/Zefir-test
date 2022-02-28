import { Module, Provider } from '@nestjs/common';

import { ANAGRAM_REPOSITORY } from './repository/anagram.repository';
import { Connection } from 'typeorm';
import { SqlAnagramRepository } from './repository/sql-user.repository';
import { AnagramService } from './anagram.service';
import { ConfigModule } from '../config/config.module';

const repositories: Provider[] = [
  {
    provide: ANAGRAM_REPOSITORY,
    inject: [Connection],
    useFactory: (connection: Connection) => connection.getCustomRepository(SqlAnagramRepository),
  },
];
const providers = [AnagramService];

@Module({
  imports: [ConfigModule],
  providers: [...repositories, ...providers],
  exports: [ANAGRAM_REPOSITORY, AnagramService],
})
export class AnagramModule {}
