module.exports = {
  transform: {
    '^.+\\.(ts)?$': 'ts-jest',
  },
  moduleFileExtensions: ['ts', 'js', 'json', 'node'],
  preset: 'ts-jest',
  roots: ['<rootDir>/tests'],
  coveragePathIgnorePatterns: ['/node_modules/'],
  collectCoverage: true,
  testEnvironment: './prisma/test-environment.ts',
  setupFilesAfterEnv: ['<rootDir>/setupTests.ts'],
};
