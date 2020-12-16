module.exports = {
  plugins: [
    'gatsby-plugin-sass',
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
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
  ]
}

/**
 *     {
      resolve: ,
      options: {
        data: `@import "${__dirname}/src/elements/variables";`,
      }
    },
 */