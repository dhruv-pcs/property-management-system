/** @returns {Promise<import('jest').Config>} */
module.exports = async () => {
  return {
    verbose: true,
    collectCoverage: true,
    collectCoverageFrom: [
      'src/**/*.{js,jsx}', // Include all JavaScript and JSX files in the src directory
      '!**/node_modules/**', // Exclude files in node_modules directory
      '!**/.next/**', // Exclude Next.js build directory
      '!**/*.config.js' // Exclude configuration files
    ],
  };
};
