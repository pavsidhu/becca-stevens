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

// Ignore seamless-scroll-polyfill library when building due to references to document
exports.onCreateWebpackConfig = ({ stage, loaders, actions }) => {
  if (stage === "build-html") {
    actions.setWebpackConfig({
      module: {
        rules: [
          {
            test: /seamless-scroll-polyfill/,
            use: loaders.null(),
          },
        ],
      },
    })
  }
}
