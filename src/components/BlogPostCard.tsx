import React, { forwardRef, useRef } from "react"
import styled, { css } from "styled-components"
import { Link } from "gatsby"

import { colors, size } from "../styles"

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
  box-shadow:
    0 0.3px 0.3px rgba(0, 0, 0, 0.031),
    0 0.7px 0.9px rgba(0, 0, 0, 0.044),
    0 1.6px 1.8px rgba(0, 0, 0, 0.056),
    0 3.4px 3.7px rgba(0, 0, 0, 0.069),
    0 10px 10px rgba(0, 0, 0, 0.1);
  scroll-snap-align: center;

  ${(props: { background: string }) => css`
    background-image: linear-gradient(rgba(0, 0, 0, 0.05), rgba(0, 0, 0, 0.5)), url("${props.background}");
  `}

  @media (min-width: ${size.medium}) {
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
