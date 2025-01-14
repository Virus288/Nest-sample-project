import defaultConfig from '../jest.config';
import type { JestConfigWithTsJest } from 'ts-jest';

const config: JestConfigWithTsJest = {
  ...defaultConfig,
  rootDir: 'e2e',
};

export default config;
