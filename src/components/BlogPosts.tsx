import React, { useRef, useLayoutEffect, useState } from "react"
import styled, { css } from "styled-components"
import { useStaticQuery, graphql, Link } from "gatsby"

import LeftArrowIcon from "../images/icons/left-arrow.svg"
import RightArrowIcon from "../images/icons/right-arrow.svg"
import { BlogPostCard } from "."
import DefaultTitle from "./DefaultTitle"
import { colors, size } from "../styles"

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

  @media (min-width: ${size.medium}) {
    grid-template-areas:
      ".          .        .          "
      "title      title    title      "
      ".          .        .          "
      "left-arrow posts    right-arrow"
      ".          .        .          "
      "see-more   see-more see-more   "
      ".          .        .          ";
    grid-template-rows: 96px auto 32px auto 32px auto 96px;
    grid-template-columns: 64px 1fr 64px;
    align-items: center;
  }
`

const Title = styled(DefaultTitle)`
  grid-area: title;
  text-align: center;
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
    grid-column: 2 / 3;
    grid-template-rows: repeat(2, min(60vw, 300px));
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: ${size.medium}) {
    /* Show all available blog posts */
    & *:nth-child(n + 4) {
      display: flex;
    }

    grid-column: 1 / 5;
    padding: 0 16px;
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
  display: none;
  transition: transform 100ms;

  @media (min-width: ${size.medium}) {
    display: block;
    width: 32px;
    height: 64px;
    z-index: 2;
    cursor: pointer;
  }
`

const LeftArrow = styled(LeftArrowIcon)`
  ${arrow}
  
  @media (min-width: ${size.medium}) {
    grid-area: left-arrow;
    justify-self: end;
  }

  @media (hover: hover) {
    &:hover {
      transform: translateX(-5px);
    }
  }
`

const RightArrow = styled(RightArrowIcon)`
  ${arrow}

  @media (min-width: ${size.medium}) {
    grid-area: right-arrow;
    justify-self: start;
  }
  
  @media (hover: hover) {
    &:hover {
      transform: translateX(5px);
    }
  }
`

const SeeMoreButton = styled(Link)`
  grid-area: see-more;
  justify-self: center;
  padding: 16px 32px;
  border: 1px solid ${colors.blue};
  border-radius: 2px;
  color: ${colors.blue};
  font-size: 1.4rem;
  letter-spacing: 0.3rem;
  text-transform: uppercase;
  outline: none;
  transition: background-color 80ms, color 80ms;

  @media (hover: hover) {
    &:hover {
      background-color: ${colors.blue};
      color: ${colors.white};
    }
  }
`

export default function BlogPosts() {
  const blogPostListRef = useRef<HTMLDivElement>()
  const blogPostCardRef = useRef<typeof Link>()

  function nextPost() {
    if (blogPostListRef.current && blogPostCardRef.current) {
      blogPostListRef.current.scrollBy({
        left: blogPostCardRef.current.clientWidth,
        behavior: "smooth",
      })
    }
  }

  function previousPost() {
    if (blogPostListRef.current && blogPostCardRef.current) {
      blogPostListRef.current.scrollBy({
        left: -blogPostCardRef.current.clientWidth,
        behavior: "smooth",
      })
    }
  }

  const getBlogPosts = useStaticQuery<GetBlogPosts>(graphql`
    query GetBlogPostsList {
      allMarkdownRemark(
        sort: { order: DESC, fields: [frontmatter___date] }
        limit: 8
      ) {
        edges {
          node {
            id
            frontmatter {
              title
              coverImage
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
      <Title>My Recent Blog Posts</Title>

      <BlogPostList ref={blogPostListRef}>
        {getBlogPosts.allMarkdownRemark.edges.map(({ node }) => (
          <BlogPostCard post={node} key={node.id} ref={blogPostCardRef} />
        ))}
      </BlogPostList>

      <LeftArrow onClick={previousPost} />
      <RightArrow onClick={nextPost} />

      <SeeMoreButton to="/blog">See More</SeeMoreButton>
    </Container>
  )
}
