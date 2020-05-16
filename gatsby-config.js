require("dotenv").config()

module.exports = {
  siteMetadata: {
    title: `Maintain Fitness`,
    description: `Hey I'm Becca, I’m a vegan Personal Trainer from Surrey, UK. I have a passion for functional fitness, healthy food and being outdoors.`,
    author: `@pavsidhu`,
  },
  plugins: [
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-typescript`,
    `gatsby-plugin-styled-components`,
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-netlify-cms`,
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
      resolve: `gatsby-plugin-layout`,
      options: {
        component: require.resolve(`./src/components/Layout.tsx`),
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
        path: `${__dirname}/src/images/`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `blogPostImages`,
        path: `${__dirname}/static/images/`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `blogPosts`,
        path: `${__dirname}/content/blog/`,
        ignore: [`**/\.*`],
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `blogPostImages`,
        path: `${__dirname}/static/images/`,
      },
    },
    {
      resolve: `gatsby-source-instagram`,
      options: {
        username: `beccastevensfit`,
        access_token: process.env.FACEBOOK_GRAPH_API_TOKEN,
        instagram_id: "17841401583236773",
        pagination: 6,
        maxPosts: 6,
      },
    },
    {
      resolve: "gatsby-transformer-remark",
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 700,
              quality: 80,
              withWebp: true,
              linkImagesToOriginal: false,
            },
          },
          {
            resolve: `gatsby-remark-images-medium-zoom`,
            options: {
              background: "rgba(0,0,0,0.8)",
            },
          },
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
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: "UA-41576939-6",
      },
    },
  ],
}
