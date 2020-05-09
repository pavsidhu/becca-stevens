import React from "react"
import styled from "styled-components"
import { graphql, useStaticQuery } from "gatsby"

import DefaultTitle from "./DefaultTitle"
import InstagramIcon from "../images/icons/instagram.svg"
import { colors, size } from "../styles"

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

  @media (min-width: ${size.medium}) {
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

const Title = styled(DefaultTitle)`
  margin-left: 16px;
`

const Handle = styled.h4`
  grid-area: handle;
  text-transform: uppercase;
  letter-spacing: 0.2rem;
  font-size: 2rem;
  font-weight: 300;
  color: ${colors.blue};

  @media (min-width: ${size.medium}) {
    justify-self: end;
  }

  @media (hover: hover) {
    &:hover {
      -webkit-text-stroke-width: 0.5px;
      -webkit-text-stroke-color: ${colors.blue};
    }
  }
`

const Posts = styled.div`
  grid-area: content;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;

  @media (min-width: 550px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (min-width: ${size.medium}) {
    grid-template-columns: repeat(6, 1fr);
  }
`

const PostImage = styled.img`
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: brightness(0.9);
  transition: transform 100ms ease-in-out, filter 100ms ease-in-out; box-shadow 100ms ease-in-out;
  box-shadow: 0 0.3px 0.3px rgba(0, 0, 0, 0.028),
    0 0.7px 0.7px rgba(0, 0, 0, 0.04), 0 1.3px 1.3px rgba(0, 0, 0, 0.05),
    0 2.2px 2.2px rgba(0, 0, 0, 0.06), 0 4.2px 4.2px rgba(0, 0, 0, 0.072),
    0 10px 10px rgba(0, 0, 0, 0.1);

  @media (hover: hover) {
    &:hover {
      filter: brightness(0.95);
      transform: scale(1.02);
      box-shadow: 0 0.3px 0.4px rgba(0, 0, 0, 0.014),
        0 0.7px 1px rgba(0, 0, 0, 0.02), 0 1.3px 1.9px rgba(0, 0, 0, 0.025),
        0 2.2px 3.4px rgba(0, 0, 0, 0.03), 0 4.2px 6.3px rgba(0, 0, 0, 0.036),
        0 10px 15px rgba(0, 0, 0, 0.05);
    }
  }
`

export default function Instagram() {
  const getInstagramPosts = useStaticQuery(graphql`
    query GetInstagramPosts {
      allInstaNode(limit: 6, sort: { order: DESC, fields: timestamp }) {
        edges {
          node {
            id
            caption
            mediaType
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
        <Title>My Instagram</Title>
      </TitleContainer>

      <Handle>
        <a
          href="https://instagram.com/maintain.fitness"
          target="_blank"
          rel="noopener"
        >
          @maintain.fitness
        </a>
      </Handle>
      <Posts>
        {getInstagramPosts.allInstaNode.edges.map(({ node }) => (
          <a
            href={`https://instagram.com/p/${node.id}`}
            target="_blank"
            rel="noopener"
            key={node.id}
          >
            <PostImage src={node.preview} alt={node.caption} loading="lazy" />
          </a>
        ))}
      </Posts>
    </Container>
  )
}
