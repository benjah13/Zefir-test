import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { ConfigModule } from './modules/config/config.module';
import { GraphQlModule } from './modules/graphql/graphql.module';
import { DatabaseModule } from './modules/database/database.module';
import { UserModule } from './modules/user/user.module';


@Module({
  imports: [UserModule, CqrsModule, ConfigModule, DatabaseModule, GraphQlModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
