import React from "react"
import styled from "styled-components"
import Image from "gatsby-image"

import { colors, size } from "../styles"
import { useStaticQuery, graphql } from "gatsby"

const Container = styled.article`
  display: grid;
  grid-template-areas:
    ". .        ."
    ". photo    ."
    ". subtitle ."
    ". desc     ."
    ". .        .";
  grid-template-rows: 64px auto auto auto 64px;
  grid-template-columns: 1fr minmax(auto, 70ch) 1fr;
  justify-items: center;
  align-items: center;
  gap: 24px;

  @media (min-width: ${size.medium}) {
    grid-template-areas:
      ".     .     .     .        ."
      ".     photo .     subtitle ."
      ".     photo .     desc     ."
      ".     .     .     .        .";
    grid-template-rows: 120px auto auto 172px;
    grid-template-columns:
      minmax(24px, 1fr)
      minmax(300px, 400px)
      minmax(0, 64px)
      minmax(60ch, 70ch)
      minmax(24px, 1fr);
    gap: 24px;
  }
`

const Background = styled.div`
  background: ${colors.pink};
  width: 100%;
  height: 100%;
  z-index: -1;
  grid-row: 1 / -1;
  grid-column: 1 / -1;
  clip-path: polygon(0 80px, 0 100%, 100% calc(100% - 80px), 100% 0);

  @media (min-width: ${size.medium}) {
    clip-path: polygon(0 200px, 0 100%, 100% calc(100% - 200px), 100% 0);
  }
`

const BeccaPhoto = styled(Image)`
  grid-area: photo;
  width: 100%;
  filter: brightness(0.9);
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
`

const Subtitle = styled.h3`
  grid-area: subtitle;
  align-self: end;
  text-transform: uppercase;
  letter-spacing: 0.4rem;
  font-size: 2.2rem;
  font-weight: 300;
  color: ${colors.black};
`

const Desc = styled.div`
  grid-area: desc;
`

const P = styled.p`
  font-size: 1.4rem;
  line-height: 2.4rem;
  color: ${colors.black};

  &:not(:last-child) {
    margin-bottom: 24px;
  }
`

export default function About() {
  const data = useStaticQuery(graphql`
    query {
      file(relativePath: { eq: "about.jpg" }) {
        childImageSharp {
          fluid {
            ...GatsbyImageSharpFluid_noBase64
          }
        }
      }
    }
  `)

  return (
    <Container id="about">
      <Background />

      <BeccaPhoto
        fluid={data.file.childImageSharp.fluid}
        alt="Becca"
        draggable={false}
      />

      <Subtitle>
        I’m a Sports Science student at the University of Birmingham.
      </Subtitle>
      <Desc>
        <P>
          I’ve always been active, from bike rides with my dad as a kid or
          long-distance running as a teenager. Now, I focus more on
          weightlifting, yoga and functional fitness training.
        </P>
        <P>
          I workout around 6 times per week, usually HIIT plus a few strength
          sessions and a swim or yoga. My favourite workouts are high-intensity
          sessions, using weights and bands for muscle stimulation.
        </P>
        <P>
          I turned vegan in 2017 to help reduce the environmental impact of my
          diet. I also wanted to improve my health, as I struggle with IBS. My
          IBS improved after cutting out animal products and so I stuck with the
          diet. I still slip up every now and then, but balance is key.
        </P>
        <P>
          I hope that this blog will help direct you to the next step in your
          fitness journey, so you can love fitness as much as I do!
        </P>
      </Desc>
    </Container>
  )
}
