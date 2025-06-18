module.exports = {
  // The test environment that will be used for testing
  testEnvironment: 'jest-environment-jsdom',
  setupFiles: ['text-encoding-polyfill'],
  // Setup files to run after the test framework is installed
  setupFilesAfterEnv: ['./setupTests.js'],

  // Transform config — use Babel, esbuild, or ts-jest depending on your stack
  transform: {
    // For modern JS/JSX files (including React components)
    '^.+\\.(js|jsx)$': 'jest-esbuild',
  },

  // File extensions Jest will process
  moduleFileExtensions: ['js', 'jsx', 'json', 'node'],

  // Pattern to find test files
  testMatch: [
    '**/__tests__/**/*.[jt]s?(x)',
    '**/?(*.)+(spec|test).[tj]s?(x)',
  ],

  // Map CSS/Sass/SCSS modules to identity-obj-proxy
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
  },

  // Automatically clear mock calls and instances between every test
  clearMocks: true,

  // Detect open handles to help track down memory leaks
  detectOpenHandles: true,
  forceExit: true,
};