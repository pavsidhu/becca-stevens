import React from "react"
import styled, { css } from "styled-components"
import { graphql } from "gatsby"

import { Layout, SEO, Title, Instagram } from "../components"
import { colors, size } from "../styles"

const Container = styled.article`
  display: grid;
  grid-template-areas:
    "cover    "
    "content  "
    "instagram";
  grid-template-rows: minmax(50vh, auto) auto auto;
  row-gap: 24px;
`

const Cover = styled.div`
  grid-area: cover;
  grid-template-areas:
    ". .         ."
    ". title     ."
    ". date      ."
    ". .         .";
  display: grid;
  grid-template-rows: 40px auto auto 40px;
  justify-items: center;
  gap: 16px;
  filter: drop-shadow(0 2px 20px rgba(0, 0, 0, 0.1));
`

const CoverImage = styled.div`
  grid-row: -1 / 1;
  grid-column: -1 / 1;
  height: 100%;
  width: 100%;
  clip-path: polygon(0 0, 100% 20%, 100% 100%, 0 80%);
  background-size: cover;
  background-position: 50%;

  ${(props: { background: string }) => css`
    background-image: 
      linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)),
      url("${props.background}");
  `}
`

const CoverRectangle = styled.div`
  grid-row: -1 / 1;
  grid-column: -1 / 1;
  height: 100%;
  width: 100%;
  clip-path: polygon(0 30%, 100% 0, 100% 70%, 0 100%);
  background: ${colors.pink};
`

const BlogPostTitle = styled(Title)`
  grid-area: title;
  color: ${colors.white};
  align-self: end;
  font-size: 2.4rem;
  letter-spacing: 0.4rem;
  z-index: 1;
  max-width: 700px;

  @media (min-width: ${size.medium}) {
    font-size: 3.2rem;
  }
`

const Date = styled.p`
  grid-area: date;
  font-size: 1.6rem;
  text-transform: uppercase;
  color: ${colors.white};
  z-index: 1;
`

const Content = styled.section`
  grid-area: content;
  display: grid;
  gap: 24px;
  font-size: 1.6rem;
  line-height: 2.8rem;
  justify-items: center;
  word-break: break-word;

  * {
    color: ${colors.black};
    max-width: 700px;
    width: 100%;
  }

  > :not(img):not(video) {
    padding: 0 24px;
  }

  @media (min-width: ${size.medium}) {
    > :not(img):not(video) {
      padding: initial;
    }
  }

  h2,
  h3,
  h4,
  h5,
  h6 {
    padding: 8px 0 0;
    font-weight: 300;
  }

  h2 {
    font-size: 3.2rem;
    line-height: 4rem;
  }

  h3 {
    font-size: 2.4rem;
    line-height: 3.2rem;
  }

  a {
    color: ${colors.blue};
    border-bottom: 1px solid ${colors.blue};
    transition: filter 80ms;

    @media (hover: hover) {
      &:hover {
        filter: brightness(2);
      }
    }
  }

  img {
    filter: brightness(0.9);
  }

  ul,
  ol {
    list-style-position: inside;
  }
`

const StyledInstagram = styled(Instagram)`
  grid-area: instagram;
`

export default function BlogPost({ data }) {
  const post = data.markdownRemark

  return (
    <Layout>
      <SEO title={post.frontmatter.title} />

      <Container>
        <Cover>
          <BlogPostTitle>{post.frontmatter.title}</BlogPostTitle>
          <Date>{post.frontmatter.date}</Date>

          <CoverRectangle />
          <CoverImage background={post.frontmatter.coverImage} />
        </Cover>

        <Content dangerouslySetInnerHTML={{ __html: post.html }} />

        <StyledInstagram />
      </Container>
    </Layout>
  )
}

export const query = graphql`
  query($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
        date(formatString: "D MMMM YYYY")
        coverImage
      }
    }
  }
`
