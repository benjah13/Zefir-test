import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

import { ConfigModule } from '../config/config.module';
import { ConfigService } from '../config/config.service';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DATABASE_HOST'),
        port: Number.parseInt(configService.get('DATABASE_PORT'), 10),
        username: configService.get('DATABASE_USER'),
        password: configService.get('DATABASE_PASSWORD'),
        database: configService.get('DATABASE_NAME'),
        namingStrategy: new SnakeNamingStrategy(),
        logging: configService.get('DATABASE_VERBOSE') === 'true' ? ['query', 'error'] : false,
        logger: 'advanced-console',
        entities: configService.isTest() ? ['./src/**/*.entity.ts'] : ['./dist/**/*.entity.js'],
        synchronize: false,
        dropSchema: false,
        migrationsRun: true,
        migrations: ['./dist/migrations/*.js'],
      }),
    }),
  ],
  exports: [TypeOrmModule],
})
export class DatabaseModule {}
