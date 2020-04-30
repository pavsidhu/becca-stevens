const { createFilePath } = require("gatsby-source-filesystem")

exports.onCreateNode = ({ node, getNode, actions }) => {
  if (node.internal.type === `MarkdownRemark`) {
    actions.createNodeField({
      node,
      name: `slug`,
      value: createFilePath({ node, getNode }),
    })
  }
}
