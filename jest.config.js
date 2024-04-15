/** @returns {Promise<import('jest').Config>} */
module.exports = async () => {
    return {
      verbose: true,
      collectCoverage: true,
      collectCoverageFrom: [
        '**/*.{js,jsx}', // Include JavaScript files
        '!**/node_modules/**', // Exclude files in node_modules directory
        '!**/.next/**', // Exclude Next.js build directory
        '!**/*.config.js', // Exclude configuration files
        '!**/__tests__/**' // Exclude test files
      ],
    };
  };