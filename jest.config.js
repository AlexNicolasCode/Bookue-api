module.exports = {
  roots: ['<rootDir>/tests'],
  collectCoverageFrom: [
    '<rootDir>/src/**/*.ts',
    '!<rootDir>/src/infra/db/mongo.helper.ts',
    '!<rootDir>/src/main/**'
  ],
  coverageDirectory: 'coverage',
  coverageProvider: 'babel',
  testEnvironment: 'node',
  preset: '@shelf/jest-mongodb',
  transform: {
    '.+\\.ts$': 'ts-jest'
  },
  moduleNameMapper: {
    'tests/(.*)': '<rootDir>/tests/$1',
    '@/(.*)': '<rootDir>/src/$1',
    "uuid": require.resolve('uuid')
  }
}
  