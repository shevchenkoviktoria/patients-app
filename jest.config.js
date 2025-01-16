module.exports = {
  transform: {
    '^.+\\.(ts|tsx)$': 'babel-jest', // Handle TypeScript files
    '^.+\\.(js|jsx)$': 'babel-jest', // Handle JavaScript files
  },
  transformIgnorePatterns: [
    'node_modules/(?!axios|some-other-module)', // Explicitly transform 'axios'
  ],
  testEnvironment: 'jsdom', // Ensure Jest runs in a browser-like environment
}
