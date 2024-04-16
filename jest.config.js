/** @returns {Promise<import('jest').Config>} */
module.exports = async () => {
  return {
    testEnvironment: "jsdom",
    collectCoverageFrom: [
      'src/**/*.{js,jsx}', // Include all JavaScript and JSX files in the src directory
      '!**/node_modules/**', // Exclude files in node_modules directory
      '!**/.next/**', // Exclude Next.js build directory
      '!**/*.config.js' // Exclude configuration files
    ],
    moduleNameMapper: {
      '^src/(.*)$': '<rootDir>/src/$1',
      '^@components/(.*)$': '<rootDir>/src/components/$1',
      '^@theme/(.*)$': '<rootDir>/src/theme/$1',

    },
    transform: {
      '^.+\\.jsx?$': 'babel-jest',
    },
  };
};
