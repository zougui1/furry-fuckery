/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  rootDir: 'src',
  collectCoverageFrom: [
    '**/*.ts',
    '!**/index.ts',
    '!test/**',
    '!utils/query/internal-types.ts',
  ],
  coverageThreshold: {
    '**': {
      branches: 70,
      functions: 70,
      lines: 70,
      statements: 70,
    },
  },
  coverageDirectory: '../coverage'
};
