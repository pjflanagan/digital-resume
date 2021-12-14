module.exports = {
  siteMetadata: {
    title: `Peter James Flanagan`
  },
  plugins: [
    'gatsby-plugin-sass',
    `gatsby-plugin-image`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    'gatsby-plugin-root-import',
    `gatsby-transformer-remark`,
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
      }
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/static/img/bio`,
        name: "bio",
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `markdown-pages`,
        path: `${__dirname}/static/blog`,
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
