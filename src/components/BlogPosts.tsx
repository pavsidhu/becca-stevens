import React, { useRef } from "react"
import styled from "styled-components"
import { useStaticQuery, graphql, Link } from "gatsby"
import { seamless } from "seamless-scroll-polyfill"

import LeftArrowIcon from "../images/icons/left-arrow.svg"
import RightArrowIcon from "../images/icons/right-arrow.svg"
import { BlogPostCard, Title } from "."
import { size, colors } from "../styles"

seamless({})

const Container = styled.article`
  display: grid;
  grid-template-areas:
    ". .          .        .           ."
    ". title      title    title       ."
    ". .          .        .           ."
    ". left-arrow posts    right-arrow ."
    ". .          .        .           ."
    ". see-more   see-more see-more    ."
    ". .          .        .           .";
  grid-template-rows: 168px auto 24px auto 24px auto 168px;
  grid-template-columns: 0 64px 1fr 64px 0;
  align-items: center;
  gap: 24px;

  @media (min-width: ${size.medium}) {
    column-gap: 0;
  }
`

const BlogPostList = styled.div`
  grid-area: posts;
  grid-column: 2 / 8;
  display: grid;
  gap: 24px;
  grid-template-rows: repeat(4, min(60vw, 400px));

  @media (min-width: 550px) {
    grid-template-rows: repeat(2, 60vw);
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: ${size.medium}) {
    padding: 0 16px;
    grid-template-rows: repeat(1, 400px);
    grid-template-columns: repeat(8, calc(24vw - 16px));
    gap: 16px;
    overflow-x: scroll;
    overscroll-behavior-x: none;
    scroll-snap-type: x mandatory;
    scroll-behavior: smooth;
    -ms-overflow-style: none;

    &::-webkit-scrollbar {
      display: none;
    }
  }
`

const LeftArrow = styled(LeftArrowIcon)`
  grid-area: left-arrow;
  justify-self: end;
  width: 32px;
  height: 64px;
  z-index: 2;
  cursor: pointer;
`

const RightArrow = styled(RightArrowIcon)`
  grid-area: right-arrow;
  justify-self: start;
  width: 32px;
  height: 64px;
  z-index: 2;
  cursor: pointer;
`

const SeeMoreButton = styled(Link)`
  grid-area: see-more;
  justify-self: center;
  padding: 16px 32px;
  background: ${colors.pink};
  color: ${colors.black};
  font-size: 1.4rem;
  letter-spacing: 0.3rem;
  text-transform: uppercase;
  outline: none;
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
    query GetBlogPosts {
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
