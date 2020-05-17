import React from "react"
import styled from "styled-components"
import { graphql, useStaticQuery } from "gatsby"

import { Title } from "."
import InstagramIcon from "../images/icons/instagram.svg"

const Container = styled.article`
  display: grid;
  grid-template-areas:
    ". .       ."
    ". title   ."
    ". .       ."
    ". handle  ."
    ". .       ."
    ". content ."
    ". .       .";
  align-items: center;
  justify-items: center;
  grid-template-rows: 24px auto 8px auto 24px auto 24px;
  grid-template-columns: 24px 1fr 24px;
  max-width: var(--max-content-width);
  width: 100%;

  @media (min-width: 800px) {
    justify-items: initial;
    grid-template-rows: 64px auto 16px auto 24px;
    grid-template-columns: 24px 1fr 1fr 24px;
    grid-template-areas:
      ". .       .       ."
      ". title   handle  ."
      ". .       .       ."
      ". content content ."
      ". .       .       .";
  }
`

const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  grid-area: title;
`

const InstagramTitle = styled(Title)`
  margin-left: 16px;
  text-align: left;
  font-size: 2.6rem;
`

const Handle = styled.h4`
  grid-area: handle;
  text-transform: uppercase;
  letter-spacing: 0.2rem;
  font-size: 2rem;
  font-weight: 300;
  color: var(--blue);
  user-select: none;

  @media (min-width: 800px) {
    justify-self: end;
  }

  @media (hover: hover) {
    &:hover {
      -webkit-text-stroke-width: 0.5px;
      -webkit-text-stroke-color: var(--blue);
    }
  }
`

const Posts = styled.div`
  grid-area: content;
  width: 100%;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;

  @media (min-width: 550px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (min-width: 800px) {
    grid-template-columns: repeat(6, 1fr);
  }
`

const PostImage = styled.img`
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: brightness(0.9);
  transition: transform 100ms ease-in-out, filter 100ms ease-in-out;
  box-shadow: 0 0.3px 0.3px rgba(0, 0, 0, 0.028),
    0 0.7px 0.7px rgba(0, 0, 0, 0.04), 0 1.3px 1.3px rgba(0, 0, 0, 0.05),
    0 2.2px 2.2px rgba(0, 0, 0, 0.06), 0 4.2px 4.2px rgba(0, 0, 0, 0.072),
    0 10px 10px rgba(0, 0, 0, 0.1);
  user-select: none;

  @media (hover: hover) {
    &:hover {
      filter: brightness(0.95);
      transform: scale(1.02);
    }
  }
`

export default function Instagram() {
  const data = useStaticQuery(graphql`
    query {
      allInstaNode(limit: 6, sort: { order: DESC, fields: timestamp }) {
        edges {
          node {
            id
            caption
            preview
          }
        }
      }
    }
  `)

  return (
    <Container>
      <TitleContainer>
        <InstagramIcon />
        <InstagramTitle>My Instagram</InstagramTitle>
      </TitleContainer>

      <Handle>
        <a
          href="https://instagram.com/beccastevensfit"
          target="_blank"
          rel="noopener"
        >
          @beccastevensfit
        </a>
      </Handle>
      <Posts>
        {data.allInstaNode.edges.map(({ node }) => (
          <a
            href={`https://instagram.com/p/${node.id}`}
            target="_blank"
            rel="noopener"
            key={node.id}
          >
            <PostImage
              src={node.preview}
              alt={node.caption}
              loading="lazy"
              width="100"
              height="100"
            />
          </a>
        ))}
      </Posts>
    </Container>
  )
}
