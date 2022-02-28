import { Module } from '@nestjs/common';

import { ConfigProvider } from './config.provider';
import { ConfigService } from './config.service';

/**
 * Provides an entry point to the environment variables and values defined
 * in the dotenv files. **Not dotfile is used in production** (based on NODE_ENV).
 */
@Module({
  providers: [
    {
      provide: ConfigService,
      useClass: ConfigProvider,
    },
  ],
  exports: [ConfigService],
})
export class ConfigModule {}
