module.exports = {
  collectCoverage: true,
  collectCoverageFrom: ['src/**/*.{ts,tsx}', '!src/**/*.d.ts', '!**/vendor/**'],
  coverageDirectory: 'coverage',
  testEnvironment: 'jest-fixed-jsdom',
  transform: {
    '.(ts|tsx)': 'ts-jest',
  },
  roots: ['<rootDir>'],
  modulePaths: ['<rootDir>'],
  moduleDirectories: ['node_modules'],
  moduleNameMapper: {
    '\\.(css|less)$': '<rootDir>/__mocks__/styleMock.js',
  },
  coveragePathIgnorePatterns: [
    '/node_modules/',
    '/coverage',
    'package.json',
    'package-lock.json',
    'reportWebVitals.ts',
    'setupTests.ts',
    'index.tsx',
  ],
};
