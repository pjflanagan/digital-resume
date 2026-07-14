const path = require('path');

// Allow imports rooted at the project (e.g. `import { useReveal } from 'src/hooks'`).
// Replaces gatsby-plugin-root-import.
exports.onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({
    resolve: {
      alias: {
        src: path.resolve(__dirname, 'src'),
      },
      modules: [path.resolve(__dirname, 'src'), 'node_modules'],
    },
  });
};
