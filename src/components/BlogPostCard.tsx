import React, { forwardRef } from "react"
import styled from "styled-components"
import Image from "gatsby-image"
import { Link } from "gatsby"

const Container = styled(Link)`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-areas:
    ". .     ."
    ". date  ."
    ". title ."
    ". .     .";
  grid-template-rows: minmax(16px, 1fr) auto auto 16px;
  grid-template-columns: 16px 1fr 16px;
  scroll-snap-align: center;

  transition: transform 100ms;
  box-shadow: 0 0.3px 0.3px rgba(0, 0, 0, 0.028),
    0 0.7px 0.7px rgba(0, 0, 0, 0.04), 0 1.3px 1.3px rgba(0, 0, 0, 0.05),
    0 2.2px 2.2px rgba(0, 0, 0, 0.06), 0 4.2px 4.2px rgba(0, 0, 0, 0.072),
    0 10px 10px rgba(0, 0, 0, 0.1);
  user-select: none;

  * {
    transition: transform 100ms ease-in-out;
  }

  @media (hover: hover) {
    &:hover p {
      transform: translateY(-5px);
    }
  }

  @media (min-width: 800px) {
    /* Fix no right padding due to overflow of parent */
    &:last-child {
      position: relative;

      &:after {
        content: "";
        display: block;
        position: absolute;
        right: -16px;
        width: 16px;
        height: 1px;
      }
    }
  }
`

const CoverImageGradient = styled.div`
  width: 100%;
  height: 100%;
  background: linear-gradient(rgba(0, 0, 0, 0.05), rgba(0, 0, 0, 0.5));
  grid-row: 1 / -1;
  grid-column: 1 / -1;
  z-index: 1;

  &:hover {
    background: linear-gradient(rgba(0, 0, 0, 0.04), rgba(0, 0, 0, 0.4));
  }
`

const CoverImage = styled(Image)`
  grid-row: 1 / -1;
  grid-column: 1 / -1;
  width: 100%;
  z-index: -1;
`

const Date = styled.p`
  grid-area: date;
  text-transform: uppercase;
  text-align: center;
  font-size: 1.4rem;
  color: var(--white);
  margin-bottom: 8px;
  z-index: 2;
`

const Title = styled.p`
  grid-area: title;
  text-align: center;
  font-size: 1.6rem;
  color: var(--white);
  z-index: 2;
`

export default forwardRef(
  ({ post }: { post: BlogPost }, ref: React.MutableRefObject<typeof Link>) => (
    <Container to={`/blog${post.fields.slug}`} ref={ref}>
      <CoverImageGradient />
      <CoverImage fluid={post.frontmatter.coverImage.childImageSharp.fluid} />
      <Date>{post.frontmatter.date}</Date>
      <Title>{post.frontmatter.title}</Title>
    </Container>
  )
)
