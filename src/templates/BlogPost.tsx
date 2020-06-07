import React from "react"
import styled from "styled-components"
import { graphql } from "gatsby"
import Image from "gatsby-image"

import { SEO, Title, Instagram } from "../components"

const Container = styled.article`
  display: grid;
  grid-template-areas:
    "cover    "
    "content  ";
  grid-template-rows: minmax(50vh, 400px) auto;
  row-gap: 24px;
  width: 100%;
`

const Cover = styled.div`
  grid-area: cover;
  grid-template-areas:
    ". .       ."
    ". title   ."
    ". details ."
    ". .       .";
  display: grid;
  grid-template-rows: 40px auto auto 40px;
  justify-items: center;
  gap: 16px;
  filter: drop-shadow(0 2px 20px rgba(0, 0, 0, 0.1));
`

const CoverImage = styled(Image)`
  grid-row: 1 / 5;
  grid-column: 1 / 4;
  width: 100%;
  overflow: hidden;
  z-index: 0;
  clip-path: polygon(0 0, 100% 20%, 100% 100%, 0 80%);
  filter: brightness(0.6);
`

const CoverRectangle = styled.div`
  grid-row: 1 / 5;
  grid-column: 1 / 4;
  height: 100%;
  width: 100%;
  z-index: -2;
  clip-path: polygon(0 30%, 100% 0, 100% 70%, 0 100%);
  background: var(--pink);
`

const BlogPostTitle = styled(Title)`
  grid-area: title;
  color: var(--white);
  align-self: end;
  font-size: 2.4rem;
  letter-spacing: 0.4rem;
  z-index: 2;
  max-width: 700px;

  /* Fixes Edge where cover image displays over text */
  position: relative;

  @media (min-width: 800px) {
    font-size: 3.2rem;
  }
`

const Details = styled.p`
  grid-area: details;
  font-size: 1.6rem;
  text-transform: uppercase;
  color: var(--white);
  z-index: 1;
  text-align: center;

  /* Fixes Edge where cover image displays over text */
  position: relative;
`

const DetailsDivider = styled.span`
  display: block;
  color: transparent;
  font-size: 0.5rem;

  @media (min-width: 800px) {
    display: inline;
    padding: 0 8px;
    font-size: inherit;
    color: var(--white);
  }
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
    color: var(--black);
    max-width: 700px;
    width: 100%;
  }

  > :not(img):not(video) {
    padding: 0 24px;
  }

  @media (min-width: 800px) {
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
    color: var(--blue);
    border-bottom: 1px solid var(--blue);
    transition: filter 80ms;
  }

  @media (hover: hover) {
    p &:hover {
      filter: brightness(2);
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

export default function BlogPost({ data }) {
  const { frontmatter, html, excerpt, timeToRead } = data.markdownRemark

  return (
    <>
      <Container>
        <SEO
          title={frontmatter.title}
          description={excerpt}
          image={frontmatter.coverImage.childImageSharp.resize.src}
        />

        <Cover>
          <BlogPostTitle>{frontmatter.title}</BlogPostTitle>
          <Details>
            {frontmatter.date} <DetailsDivider>•</DetailsDivider> {timeToRead}{" "}
            Minute Read
          </Details>

          <CoverImage
            fluid={frontmatter.coverImage.childImageSharp.fluid}
            alt={frontmatter.coverImageAlt}
            draggable={false}
            imgStyle={{ color: "transparent" }}
          />
          <CoverRectangle />
        </Cover>

        <Content dangerouslySetInnerHTML={{ __html: html }} />
      </Container>
      <Instagram />
    </>
  )
}

export const query = graphql`
  query($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      excerpt(pruneLength: 160)
      timeToRead
      frontmatter {
        title
        date(formatString: "D MMMM YYYY")
        coverImage {
          childImageSharp {
            fluid {
              ...GatsbyImageSharpFluid_withWebp
            }
            resize(width: 1200) {
              src
            }
          }
        }
      }
    }
  }
`
