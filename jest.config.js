module.exports = {
  // Jest transformations -- this adds support for TypeScript
  // using ts-jest
  transform: {
    '^.+\\.(ts)?$': 'ts-jest',
  },

  // Module file extensions for importing
  moduleFileExtensions: ['ts', 'js', 'json', 'node'],
  moduleNameMapper: {
    '@auth': '<rootDir>/src/auth',
    '@utils': '<rootDir>/src/utils',
    '@comment': '<rootDir>/src/models/comment',
    '@notification': '<rootDir>/src/models/notification',
    '@project': '<rootDir>/src/models/project',
    '@tag': '<rootDir>/src/models/tag',
    '@task': '<rootDir>/src/models/task',
    '@user': '<rootDir>/src/models/user',
    '@userProject': '<rootDir>/src/models/userProject',
  },
};
