import React from "react"
import styled from "styled-components"

import { colors, size } from "../styles"

const Container = styled.article`
  margin: 80px 0;
`

const Title = styled.h2`
  text-align: center;
  text-transform: uppercase;
  letter-spacing: 0.4rem;
  font-size: 3.5rem;
  font-weight: 300;
  color: ${colors.black};
`

export default function BlogPosts() {
  return (
    <Container>
      <Title>My Recent Blog Posts</Title>
    </Container>
  )
}
