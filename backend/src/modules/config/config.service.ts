export abstract class ConfigService {
  abstract get(key: string): string;

  abstract isProduction(): boolean;

  abstract isTest(): boolean;
}
