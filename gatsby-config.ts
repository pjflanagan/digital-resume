import type { GatsbyConfig } from 'gatsby';

const config: GatsbyConfig = {
  siteMetadata: {
    title: `Peter James Flanagan`,
  },
  jsxRuntime: `automatic`,
  plugins: [
    {
      resolve: `gatsby-plugin-sass`,
      options: {
        sassOptions: {
          loadPaths: [`${__dirname}/src`],
        },
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Peter James Flanagan`,
        short_name: `PJF`,
        start_url: `/`,
        background_color: `#112a32`,
        theme_color: `#112a32`,
        display: `standalone`,
        icon: `static/img/icon/icon.png`,
        include_favicon: false,
      },
    },
  ],
};

export default config;
