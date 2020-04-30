import React, { forwardRef, useRef } from "react"
import styled, { css } from "styled-components"
import { Link } from "gatsby"

import { colors } from "../styles"

const Container = styled(Link)`
  width: 100%;
  height: 100%;
  padding: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  background-size: cover;
  background-position: 50%;
  scroll-snap-align: center;

  ${(props: { background: string }) => css`
    background-image: linear-gradient(rgba(0, 0, 0, 0.05), rgba(0, 0, 0, 0.5)), url("${props.background}");
  `}

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
`

const Date = styled.p`
  text-transform: uppercase;
  text-align: center;
  font-size: 1.4rem;
  color: ${colors.white};
  margin-bottom: 8px;
`

const Title = styled.p`
  text-align: center;
  font-size: 1.6rem;
  color: ${colors.white};
`

export default forwardRef(
  ({ post }: { post: BlogPost }, ref: React.MutableRefObject<typeof Link>) => (
    <Container
      to={`/blog${post.fields.slug}`}
      background={post.frontmatter.coverImage}
      ref={ref}
    >
      <Date>{post.frontmatter.date}</Date>
      <Title>{post.frontmatter.title}</Title>
    </Container>
  )
)
