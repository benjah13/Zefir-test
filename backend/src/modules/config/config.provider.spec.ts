jest.mock('dotenv-safe');

import dotenvSafe from 'dotenv-safe';

import { ConfigProvider } from './config.provider';

describe('ConfigProvider', () => {
  let config: ConfigProvider;

  beforeEach(() => {
    dotenvSafe.config = jest.fn().mockReturnValue({ parsed: {} });
  });

  describe('constructor', () => {
    it('throws if the given file could not be loaded', () => {
      const expectedError = new Error('🤷');
      dotenvSafe.config = jest.fn().mockReturnValue({ error: expectedError });

      expect(() => new ConfigProvider()).toThrowError(expectedError);
    });
  });

  describe('get', () => {
    it('throws if the given configuration key is not found', () => {
      config = new ConfigProvider();

      expect(() => config.get('NOT_EXISTING')).toThrow(/not found/i);
    });

    it('returns the value associated to the given key in process.env', () => {
      config = new ConfigProvider();

      process.env.VP = 'David';
      expect(config.get('VP')).toEqual('David');
    });

    it('returns the value associated to the given key in the dotenv file', () => {
      dotenvSafe.config = jest.fn().mockReturnValue({ parsed: { LEAD: 'Vince' } });

      config = new ConfigProvider();
      expect(config.get('LEAD')).toEqual('Vince');
    });

    it('returns the value from process.env when the key exists in both dotenv and process.env', () => {
      process.env.COMPANY = 'ZEFIR';
      dotenvSafe.config = jest.fn().mockReturnValue({ parsed: { COMPANY: 'COCA' } });

      config = new ConfigProvider();
      expect(config.get('COMPANY')).toEqual('ZEFIR');
    });
  });
});
