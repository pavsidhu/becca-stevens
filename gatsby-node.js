const path = require(`path`)
const { createFilePath } = require("gatsby-source-filesystem")

// Add slug to blog post nodes
exports.onCreateNode = ({ node, getNode, actions }) => {
  if (node.internal.type === `MarkdownRemark`) {
    actions.createNodeField({
      node,
      name: `slug`,
      value: createFilePath({ node, getNode }),
    })
  }
}

// Generate pages for each blog post
exports.createPages = async ({ graphql, actions }) => {
  const result = await graphql(`
    query {
      allMarkdownRemark {
        edges {
          node {
            fields {
              slug
            }
          }
        }
      }
    }
  `)

  result.data.allMarkdownRemark.edges.forEach(({ node }) =>
    actions.createPage({
      path: "/blog" + node.fields.slug,
      component: path.resolve(`./src/templates/BlogPost.tsx`),
      context: {
        slug: node.fields.slug,
      },
    })
  )
}

exports.onCreateWebpackConfig = ({ stage, loaders, actions }) => {
  if (stage === "build-html") {
    actions.setWebpackConfig({
      module: {
        rules: [
          {
            test: /loading-attribute-polyfill/,
            use: loaders.null(),
          },
        ],
      },
    })
  }
}
