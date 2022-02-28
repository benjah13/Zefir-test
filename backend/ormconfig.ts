import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { ConfigProvider } from './src/modules/config/config.provider';

const configService = new ConfigProvider();

module.exports = {
  type: 'postgres',
  host: configService.get('DATABASE_HOST'),
  port: Number.parseInt(configService.get('DATABASE_PORT'), 10),
  username: configService.get('DATABASE_USER'),
  password: configService.get('DATABASE_PASSWORD'),
  database: configService.get('DATABASE_NAME'),
  namingStrategy: new SnakeNamingStrategy(),
  entities: ['src/**/*.entity.ts'],
  migrations: ['src/migrations/*.ts'],
  cli: {
    migrationsDir: 'src/migrations',
  },
};
