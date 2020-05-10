import React, { forwardRef } from "react"
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
  scroll-snap-align: center;
  transition: transform 100ms, box-shadow 100ms;
  box-shadow: 0 0.3px 0.3px rgba(0, 0, 0, 0.028),
    0 0.7px 0.7px rgba(0, 0, 0, 0.04), 0 1.3px 1.3px rgba(0, 0, 0, 0.05),
    0 2.2px 2.2px rgba(0, 0, 0, 0.06), 0 4.2px 4.2px rgba(0, 0, 0, 0.072),
    0 10px 10px rgba(0, 0, 0, 0.1);
  will-change: transform;
  user-select: none;

  * {
    transition: transform 100ms ease-in-out;
  }

  @media (hover: hover) {
    &:hover {
      /* transform: scale(1.02); */
      box-shadow: 0 0.3px 0.4px rgba(0, 0, 0, 0.014),
        0 0.7px 1px rgba(0, 0, 0, 0.02), 0 1.3px 1.9px rgba(0, 0, 0, 0.025),
        0 2.2px 3.4px rgba(0, 0, 0, 0.03), 0 4.2px 6.3px rgba(0, 0, 0, 0.036),
        0 10px 15px rgba(0, 0, 0, 0.05);

      * {
        transform: translateY(-5px);
      }
    }
  }

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

  ${(props: { background: string }) => css`
    background-image: linear-gradient(rgba(0, 0, 0, 0.05), rgba(0, 0, 0, 0.5)), url("${props.background}");
    
    @media (hover:hover) {
      &:hover {
        background-image: linear-gradient(rgba(0, 0, 0, 0.04), rgba(0, 0, 0, 0.4)), url("${props.background}");
      }
    }
  `}
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
