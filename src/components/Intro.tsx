import React from "react"
import styled from "styled-components"

import becca from "../images/becca.jpg"
import { colors, size } from "../styles"

const Container = styled.article`
  margin-top: 96px;
  height: calc(100vh - 96px);
  display: grid;
  grid-template-areas: "content";
  align-items: center;
  justify-content: center;
  filter: drop-shadow(0 2px 20px rgba(0, 0, 0, 0.1));
`

const Photo = styled.img`
  grid-area: content;
  height: 100%;
  width: 100%;
  object-position: 50%;
  object-fit: cover;
  filter: brightness(0.6);
  clip-path: polygon(0 0, 100% 15%, 100% 100%, 0 85%);

  @media (min-width: ${size.medium}) {
    clip-path: polygon(0 0, 70% 0, 100% 100%, 30% 100%);
  }
`

const Highlight = styled.div`
  grid-area: content;
  height: 100%;
  background-color: white;
  opacity: 0.1;
  clip-path: polygon(0 25%, 62.5% 9.4%, 100% 15%, 100% 75%, 37.5% 90.6%, 0 85%);

  @media (min-width: ${size.medium}) {
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

  @media (min-width: ${size.medium}) {
    width: 100%;
    flex-direction: row;
  }
`

const TriangleStart = styled.div`
  justify-self: start;
  height: 50%;
  background: ${colors.pink};
  clip-path: polygon(100% 0, 0 50%, 100% 100%);

  @media (min-width: ${size.medium}) {
    width: 50%;
    height: 100%;
    clip-path: polygon(0 0, 0 90%, 80% 0);
  }
`

const TriangleEnd = styled.div`
  justify-self: end;
  height: 50%;
  background: ${colors.pink};
  clip-path: polygon(0 0, 0 100%, 100% 50%);

  @media (min-width: ${size.medium}) {
    width: 50%;
    height: 100%;
    clip-path: polygon(20% 100%, 100% 10%, 100% 100%);
  }
`

const Greeting = styled.div`
  grid-area: content;
  max-width: calc(100vw - 32px);
  justify-self: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 1;
  color: ${colors.white};
`

const Title = styled.h1`
  text-align: center;
  text-transform: uppercase;
  letter-spacing: 0.4rem;
  margin-bottom: 16px;
  font-size: 3.5rem;
  font-weight: 300;
  color: white;

  @media (min-width: ${size.medium}) {
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
  return (
    <Container>
      <Triangles>
        <TriangleStart />
        <TriangleEnd />
      </Triangles>

      <Photo src={becca} alt="Becca" />

      <Highlight />

      <Greeting>
        <Title>Hey I'm Becca</Title>
        <Description>
          I’m a vegan Personal Trainer from Surrey, UK. I have a passion for
          functional fitness, healthy food and being outdoors.
        </Description>
      </Greeting>
    </Container>
  )
}
