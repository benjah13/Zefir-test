import { Module, Provider } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { GraphQlModule } from '../graphql/graphql.module';
import { CqrsModule } from '@nestjs/cqrs';
import { USER_REPOSITORY } from './repository/user.repository';
import { Connection } from 'typeorm';
import { SqlUserRepository } from './repository/sql-user.repository';
import { UserResolver } from './user.resolver';
import { SaveUserCommandHandler } from './commands/save-user/save-user.command';
import { GetAllUsersHandler } from './queries/get-all-users/get-all-users.query';
import { AnagramModule } from '../anagram/anagram.module';
import { ConfigModule } from '../config/config.module';

const repositories: Provider[] = [
  {
    provide: USER_REPOSITORY,
    inject: [Connection],
    useFactory: (connection: Connection) => connection.getCustomRepository(SqlUserRepository),
  },
];
const resolvers = [UserResolver];
const commands = [SaveUserCommandHandler];
const queries = [GetAllUsersHandler];

@Module({
  imports: [CqrsModule, AnagramModule, ConfigModule],
  providers: [...repositories, ...resolvers, ...commands, ...queries],
  exports: [],
})
export class UserModule {}
