import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  testEnvironment: 'node',
  preset: 'ts-jest',
  moduleFileExtensions: ['ts', 'js', 'json', 'node'],
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.(ts|js)?$',
  globals: {
    'ts-jest': {
      tsconfig: '<rootDir>/tsconfig.jest.json',
    },
  },
};

export default config;
