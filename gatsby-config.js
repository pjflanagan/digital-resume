module.exports = {
  siteMetadata: {
    title: `Peter James Flanagan`
  },
  plugins: [
    'gatsby-plugin-sass',
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    'gatsby-plugin-root-import',
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        icon: `src/images/favicon.png`
      }
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/static/img`,
      },
    },
    {
      resolve: `gatsby-plugin-google-fonts`,
      options: {
        fonts: [
          `Ubuntu\:300,500`
        ],
        display: 'swap'
      }
    },
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: "UA-66104630-1",
        head: false,
      },
    },
  ]
}

/** SCSS variables
 *     {
      resolve: ,
      options: {
        data: `@import "${__dirname}/src/elements/variables";`,
      }
    },
 */