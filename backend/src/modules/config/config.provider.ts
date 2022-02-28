import { Injectable } from '@nestjs/common';
import dotenvSafe from 'dotenv-safe';

import { ConfigService } from './config.service';

/**
 * Wrapper around dotenv values and `process.env` values. Relies on `dotenv-safe` to read the
 * dotenv files and load their values.
 *
 * @see [dotenv-safe](https://www.npmjs.com/package/dotenv-safe)
 */
@Injectable()
export class ConfigProvider extends ConfigService {
  private readonly dotenvValues: Record<string, string>;

  constructor() {
    super();
    const envFilePath = this.getDotenvFileName();

    if (!envFilePath) {
      this.dotenvValues = {};
      return;
    }

    const envParsingResult = dotenvSafe.config({ allowEmptyValues: true, path: envFilePath });

    if (envParsingResult.error) {
      throw envParsingResult.error;
    }

    this.dotenvValues = envParsingResult.parsed!;
  }

  /**
   * Looks for a value associated to `key` in `process.env` first,
   * and in dotenv file next.
   *
   * @param key Key to look a value for.
   *
   * @throws {Error} If the given configuration `key` is not found (process.env or dotenv file).
   *
   * @return The value (as a string, no matter the value) associated to the given `key`.
   */
  get(key: string): string {
    if (key in process.env) {
      return process.env[key]!;
    }

    if (key in this.dotenvValues) {
      return this.dotenvValues[key];
    }

    throw new Error(`Configuration key ${key} not found`);
  }

  isProduction() {
    return process.env.NODE_ENV === 'production';
  }

  isTest() {
    return process.env.NODE_ENV === 'test';
  }

  getDotenvFileName() {
    if (process.env.CI === 'true') {
      return '.env.ci';
    }

    if (process.env.NODE_ENV === 'production') {
      return undefined;
    }

    return `.env.${process.env.NODE_ENV || 'development'}`;
  }
}
