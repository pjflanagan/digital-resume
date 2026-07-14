import path from 'path';
import type { GatsbyNode } from 'gatsby';

// Allow imports rooted at the project (e.g. `import { useReveal } from 'src/hooks'`).
// Replaces gatsby-plugin-root-import.
export const onCreateWebpackConfig: GatsbyNode['onCreateWebpackConfig'] = ({ actions }) => {
  actions.setWebpackConfig({
    resolve: {
      alias: {
        src: path.resolve(__dirname, 'src'),
      },
    },
  });
};
