import React from "react"
import styled from "styled-components"
import { graphql } from "gatsby"

import { SEO, Title, BlogPostCard } from "../components"

const Container = styled.article`
  display: grid;
  justify-self: center;
  grid-template-areas:
    ". .     ."
    ". title ."
    ". .     ."
    ". posts ."
    ". .     .";
  grid-template-columns: 24px 1fr 24px;
  grid-template-rows: 32px auto 32px auto 24px;
  max-width: var(--max-content-width);
  width: 100%;

  @media (min-width: 800px) {
    grid-template-rows: 48px auto 48px auto 24px;
    grid-template-columns: 64px 1fr 64px;
  }
`

const BlogTitle = styled(Title)`
  grid-area: title;
`

const BlogPostList = styled.div`
  grid-area: posts;
  display: grid;
  gap: 24px;
  grid-auto-rows: min(60vw, 400px);
  width: 100%;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
`

export default function Blog({ data }: { data: GetBlogPosts }) {
  return (
    <Container>
      <SEO title="Blog" />

      <BlogTitle>Blog</BlogTitle>

      <BlogPostList>
        {data.allMarkdownRemark.edges.map(({ node }) => (
          <BlogPostCard post={node} key={node.id} />
        ))}
      </BlogPostList>
    </Container>
  )
}

export const query = graphql`
  query {
    allMarkdownRemark(sort: { order: DESC, fields: [frontmatter___date] }) {
      edges {
        node {
          id
          frontmatter {
            title
            coverImage {
              childImageSharp {
                fluid {
                  ...GatsbyImageSharpFluid_withWebp
                }
              }
            }
            date(formatString: "D MMM YYYY")
          }
          fields {
            slug
          }
        }
      }
    }
  }
`
