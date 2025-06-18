module.exports = {
  // Clear mock calls and instances between tests
  clearMocks: true,

  // The test environment that will be used for testing
  testEnvironment: 'jest-environment-jsdom',

  // Setup files after the environment is set up
  setupFilesAfterEnv: ['@testing-library/jest-dom/extend-expect'],

  // Transform config — use esbuild or ts-jest depending on your stack
  transform: {
    // For TypeScript, use ts-jest
    // For modern JS (including JSX), use jest-esbuild or similar
    '^.+\\.(ts|tsx|js|jsx)$': 'jest-esbuild',
  },

  // File extensions Jest will process
  moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx', 'json', 'node'],

  // Pattern to find test files
  testMatch: [
    '**/__tests__/**/*.[jt]s?(x)',
    '**/?(*.)+(spec|test).[tj]s?(x)',
  ],

  // Map CSS/Sass/SCSS modules to identity-obj-proxy
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
  },
};