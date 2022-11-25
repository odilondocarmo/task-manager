module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    coverageReporters: ['json', 'lcov', 'text', 'clover', 'cobertura', 'html'],
    testPathIgnorePatterns: ['./build/*', './dist/*'],
  };