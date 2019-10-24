module.exports = {
  roots: ['./src'],
  testRegex: '/__tests__/.*(test|spec)\\.tsx?$',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  setupTestFrameworkScriptFile: '<rootDir>/src/__tests__/setup.ts',
  snapshotSerializers: ['enzyme-to-json/serializer'],
  collectCoverage: true,
  collectCoverageFrom: ['src/**/*.{ts,tsx}', '!src/index.tsx'],
  testPathIgnorePatterns: [],
  coverageReporters: ['html'],
  coverageThreshold: {
    global: {
      statements: 0,
    },
  },
  moduleNameMapper: {
    '\\.(css|less|sass|scss)$': 'identity-obj-proxy',
  },
  globals: {},
  testURL: 'http://localhost/',
}
