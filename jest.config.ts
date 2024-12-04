import type { Config } from 'jest';

const config: Config = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['**/test/**/*.test.ts', '**/test/features/**/*.feature'],
  transform: {
    '^.+\\.ts?$': 'ts-jest',
  },
  moduleFileExtensions: ['ts', 'js'],
  coveragePathIgnorePatterns: [
    '/node_modules/',
    'src/externals/repositories/',
    'src/core/',
    'src/adapters/gateways/',
    'src/microservice/',
    'src/main.ts',
  ],
};

export default config;
