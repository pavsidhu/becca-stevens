import React from "react"
import styled from "styled-components"

import { colors, size } from "../styles"
import { graphql, useStaticQuery } from "gatsby"
import InstagramIcon from "../images/icons/instagram.svg"

const Container = styled.article`
  display: grid;
  grid-template-areas:
    "title"
    "handle"
    "content";
  align-items: center;
  justify-items: center;
  padding: 32px;
  gap: 16px;

  @media (min-width: ${size.medium}) {
    justify-items: initial;
    gap: 24px;
    grid-template-areas:
      "title handle"
      "content content";
  }
`

const Title = styled.div`
  display: flex;
  align-items: center;
  grid-area: title;
`

const TitleText = styled.h3`
  margin-left: 16px;
  text-transform: uppercase;
  letter-spacing: 0.4rem;
  font-size: 2.8rem;
  font-weight: 300;
  color: ${colors.black};
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
  --gap: 16px;
  --posts-per-row: 2;
  grid-area: content;
  display: grid;
  gap: var(--gap);

  grid-template-columns: repeat(
    var(--posts-per-row),
    calc(
      (100vw - 64px - (var(--gap) * (var(--posts-per-row) - 1))) /
        var(--posts-per-row)
    )
  );

  @media (min-width: 550px) {
    --gap: 24px;
    --posts-per-row: 3;
  }

  @media (min-width: 1000px) {
    --gap: 32px;
    --posts-per-row: 6;
  }
`

const PostImage = styled.img`
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
      <Title>
        <InstagramIcon />
        <TitleText>My Instagram</TitleText>
      </Title>

      <Handle>
        <a href="https://instagram.com/traintomaintain">@traintomaintain</a>
      </Handle>
      <Posts>
        {getInstagramPosts.allInstaNode.edges.map(({ node }) => (
          <a href={`https://instagram.com/p/${node.id}`} key={node.id}>
            <PostImage src={node.preview} alt={node.caption} />
          </a>
        ))}
      </Posts>
    </Container>
  )
}
