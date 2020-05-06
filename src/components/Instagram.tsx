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
  color: ${colors.black};

  @media (min-width: ${size.medium}) {
    justify-self: end;
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
        <a href="https://instagram.com/maintain.fitness">@maintain.fitness</a>
      </Handle>
      <Posts>
        {getInstagramPosts.allInstaNode.edges.map(({ node }) => (
          <a href={`https://instagram.com/p/${node.id}`} key={node.id}>
            <PostImage src={node.preview} alt={node.caption} loading="lazy" />
          </a>
        ))}
      </Posts>
    </Container>
  )
}
