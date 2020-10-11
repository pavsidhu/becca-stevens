import React, { useRef } from "react"
import styled, { css } from "styled-components"
import { useStaticQuery, graphql, Link } from "gatsby"

import Title from "./Title"
import BlogPostCard from "./BlogPostCard"
import Button from "./Button"
import LeftArrowIcon from "../images/icons/left-arrow.svg"
import RightArrowIcon from "../images/icons/right-arrow.svg"

const Container = styled.article`
  display: grid;
  grid-template-areas:
    ". .        ."
    ". title    ."
    ". .        ."
    ". posts    ."
    ". .        ."
    ". see-more ."
    ". .        .";
  grid-template-rows: 64px auto 32px auto 24px auto 64px;
  grid-template-columns: 24px 1fr 24px;

  @media (min-width: 800px) {
    grid-template-areas:
      ".       "
      "title   "
      ".       "
      "posts   "
      ".       "
      "see-more"
      ".       ";
    grid-template-rows: 96px auto 32px auto 32px auto 96px;
    grid-template-columns: 1fr;
    align-items: center;
  }
`

const BlogPostsTitle = styled(Title)`
  grid-area: title;
`

const BlogPostList = styled.div`
  /* Only show 4 blog posts */
  & *:nth-child(n + 5) {
    display: none;
  }

  grid-area: posts;
  display: grid;
  grid-template-rows: repeat(4, min(60vw, 400px));
  gap: 24px;

  @media (min-width: 550px) {
    grid-template-rows: repeat(2, min(60vw, 300px));
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: 800px) {
    /* Show all available blog posts */
    & *:nth-child(n + 4) {
      display: grid;
    }

    grid-column: 1 / 5;
    padding: 0 12px;
    grid-template-rows: repeat(1, 400px);
    grid-template-columns: repeat(8, calc(24vw - 16px));
    gap: 16px;
    padding: 24px 16px;
    overflow-x: scroll;
    overscroll-behavior-x: none;
    scroll-snap-type: x mandatory;
    -ms-overflow-style: none;

    &::-webkit-scrollbar {
      display: none;
    }
  }
`

const arrow = css`
  grid-area: posts;
  width: 80px;
  height: 80px;
  padding: 16px;
  border-radius: 50%;
  z-index: 2;
  background: rgba(0, 0, 0, 0.2);
  transition: transform 100ms;
  cursor: pointer;
  display: none;

  @media (min-width: 800px) {
    display: block;
  }
`

const LeftArrow = styled(LeftArrowIcon)`
  ${arrow}
  justify-self: start;
  margin-left: 20px;

  @media (hover: hover) {
    &:hover {
      transform: translateX(-5px);
    }
  }
`

const RightArrow = styled(RightArrowIcon)`
  ${arrow}
  justify-self: end;
  margin-right: 20px;

  @media (hover: hover) {
    &:hover {
      transform: translateX(5px);
    }
  }
`

const SeeMoreButton = styled(Button)`
  grid-area: see-more;
  justify-self: center;
`

enum Direction {
  LEFT,
  RIGHT,
}

export default function BlogPosts() {
  const blogPostListRef = useRef<HTMLDivElement>()

  function scroll(direction: Direction) {
    if (blogPostListRef.current) {
      const { children } = blogPostListRef.current
      const multiplier = direction === Direction.LEFT ? -1 : 1

      blogPostListRef.current.scrollBy({
        left: multiplier * children[0].clientWidth,
        behavior: "smooth",
      })
    }
  }

  const getBlogPosts = useStaticQuery<GetBlogPosts>(graphql`
    query {
      allMarkdownRemark(
        sort: { order: DESC, fields: [frontmatter___date] }
        limit: 8
      ) {
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
  `)

  return (
    <Container>
      <BlogPostsTitle>My Recent Blog Posts</BlogPostsTitle>

      <BlogPostList ref={blogPostListRef}>
        {getBlogPosts.allMarkdownRemark.edges.map(({ node }) => (
          <BlogPostCard post={node} key={node.id} />
        ))}
      </BlogPostList>

      <LeftArrow onClick={() => scroll(Direction.LEFT)} />
      <RightArrow onClick={() => scroll(Direction.RIGHT)} />

      <SeeMoreButton to="/blog">See More</SeeMoreButton>
    </Container>
  )
}
