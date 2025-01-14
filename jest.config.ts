import type { JestConfigWithTsJest } from 'ts-jest';

const config: JestConfigWithTsJest = {
  verbose: true,
  moduleDirectories: ['node_modules', 'src', "tests", __dirname],
  moduleFileExtensions: ['js', 'ts', 'json'],
  testPathIgnorePatterns: ['build'],
  extensionsToTreatAsEsm: ['.ts'],
  rootDir: "src",
  preset: 'ts-jest/presets/default-esm',
  testMatch: ['**/*.spec.ts'],
  testEnvironment: 'node',
  forceExit: true,
  clearMocks: true,
  testTimeout: 10000,
  passWithNoTests: true,
  transform: {
    "^.+\\.(t|j)s$": "ts-jest"
  },
  collectCoverageFrom: [
    "**/*.(t|j)s"
  ],
  coverageDirectory: "../coverage",
};

export default config;
