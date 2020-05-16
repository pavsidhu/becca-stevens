import React, { useState } from "react"
import styled, { css } from "styled-components"
import Image from "gatsby-image"
import { graphql, useStaticQuery } from "gatsby"

const Container = styled.article`
  height: calc(100vh - var(--header-height));
  min-height: 400px;
  max-height: 1500px;
  width: 100vw;
  display: grid;
  grid-template-areas: "content";
  grid-template-columns: 1fr;
  align-items: center;
  justify-content: center;
  filter: drop-shadow(0 2px 20px rgba(0, 0, 0, 0.1));
`

const Photo = styled(Image)`
  grid-area: content;
  height: 100%;
  filter: brightness(0.6);
  clip-path: polygon(0 0, 100% 15%, 100% 100%, 0 85%);
  user-select: none;

  @media (min-width: 800px) {
    clip-path: polygon(0 0, 70% 0, 100% 100%, 30% 100%);
  }
`

const Highlight = styled.div`
  grid-area: content;
  height: 100%;
  background-color: white;
  opacity: 0.1;
  clip-path: polygon(0 25%, 62.5% 9.4%, 100% 15%, 100% 75%, 37.5% 90.6%, 0 85%);

  @media (min-width: 800px) {
    clip-path: polygon(
      16.1% 53.7%,
      40% 0%,
      70% 0,
      83.9% 46.3%,
      60% 100%,
      30% 100%
    );
  }
`

const Triangles = styled.div`
  grid-area: content;
  height: 100%;
  display: flex;
  flex-direction: column;

  @media (min-width: 800px) {
    width: 100%;
    flex-direction: row;
  }
`

const TriangleStart = styled.div`
  justify-self: start;
  height: 50%;
  background: var(--pink);
  clip-path: polygon(100% 0, 0 50%, 100% 100%);

  @media (min-width: 800px) {
    width: 50%;
    height: 100%;
    clip-path: polygon(0 0, 0 90%, 80% 0);
  }
`

const TriangleEnd = styled.div`
  justify-self: end;
  height: 50%;
  background: var(--pink);
  clip-path: polygon(0 0, 0 100%, 100% 50%);

  @media (min-width: 800px) {
    width: 50%;
    height: 100%;
    clip-path: polygon(20% 100%, 100% 10%, 100% 100%);
  }
`

const Greeting = styled.div`
  grid-area: content;
  max-width: calc(100vw - 48px);
  justify-self: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 1;
  color: var(--white);
  transition: opacity 400ms ease-in-out 300ms, transform 400ms ease-out 300ms;
  transform: translateY(-10px);
  opacity: 0;

  ${(props: { isVisible: boolean }) =>
    props.isVisible &&
    css`
      transform: translateY(0);
      opacity: 1;
    `};
`

const Title = styled.h1`
  text-align: center;
  text-transform: uppercase;
  letter-spacing: 0.4rem;
  margin-bottom: 16px;
  font-size: 3.5rem;
  font-weight: 300;
  color: white;

  @media (min-width: 800px) {
    font-size: 4.8rem;
  }
`

const Description = styled.p`
  max-width: 40ch;
  font-size: 1.6rem;
  line-height: 2.6rem;
  color: white;
`

export default function Intro() {
  const [loaded, setLoaded] = useState(false)

  const data = useStaticQuery(graphql`
    query {
      file(relativePath: { eq: "hero.jpg" }) {
        childImageSharp {
          fluid {
            ...GatsbyImageSharpFluid_withWebp
          }
        }
      }
    }
  `)

  return (
    <Container>
      <Triangles>
        <TriangleStart />
        <TriangleEnd />
      </Triangles>

      <Photo
        fluid={data.file.childImageSharp.fluid}
        alt="Becca"
        loading="eager"
        draggable={false}
        imgStyle={{ objectPosition: "50% 10%" }}
        onLoad={() => setLoaded(true)}
      />

      <Highlight />

      <Greeting isVisible={loaded}>
        <Title>Hey I'm Becca</Title>
        <Description>
          I’m a vegan Personal Trainer from Surrey, UK. I have a passion for
          functional fitness, healthy food and being outdoors.
        </Description>
      </Greeting>
    </Container>
  )
}
