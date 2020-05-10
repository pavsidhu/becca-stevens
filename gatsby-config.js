require("dotenv").config()

module.exports = {
  siteMetadata: {
    title: `Maintain Fitness`,
    description: `Kick off your next, great Gatsby project with this default starter. This barebones starter ships with the main Gatsby configuration files you might need.`,
    author: `@pavsidhu`,
  },
  plugins: [
    `gatsby-plugin-typescript`,
    `gatsby-plugin-styled-components`,
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-sharp`,
    `gatsby-plugin-netlify-cms`,
    `gatsby-plugin-smoothscroll`,
    `gatsby-transformer-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#CA8080`,
        theme_color: `#CA8080`,
        display: `minimal-ui`,
        icon: `src/images/favicon.png`,
        cache_busting_mode: "none",
      },
    },
    {
      resolve: `gatsby-plugin-react-svg`,
      options: {
        rule: {
          include: /images\/icons/,
        },
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `posts`,
        path: `${__dirname}/content/blog/`,
        ignore: [`**/\.*`],
      },
    },
    {
      resolve: `gatsby-source-instagram`,
      options: {
        username: `maintain.fitness`,
        access_token: process.env.FACEBOOK_GRAPH_API_TOKEN,
        instagram_id: "17841431366410261",
        pagination: 6,
        maxPosts: 6,
      },
    },
    {
      resolve: "gatsby-transformer-remark",
      options: {
        plugins: [
          "gatsby-remark-unwrap-images",
          "gatsby-remark-picture",
          {
            resolve: "gatsby-remark-external-links",
            options: {
              rel: "noopener",
            },
          },
        ],
      },
    },
    {
      resolve: "gatsby-plugin-offline",
      options: {
        workboxConfig: {
          globPatterns: ["**/*"],
        },
      },
    },
  ],
}
