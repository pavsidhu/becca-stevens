import React from "react"
import { useStaticQuery, graphql } from "gatsby"

import { Layout, SEO } from "../components"

export default function BlogPost({ data }) {
  const post = data.markdownRemark

  return (
    <Layout>
      <SEO title="Blog" />
      <h1>{post.frontmatter.title}</h1>
    </Layout>
  )
}

export const query = graphql`
  query($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
        date
      }
    }
  }
`
