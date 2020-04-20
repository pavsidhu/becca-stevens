import React from "react"
import styled from "styled-components"

import { Title } from "."
import { colors, size } from "../styles"

const Container = styled.article`
  margin: 80px 0;
`

export default function BlogPosts() {
  return (
    <Container>
      <Title>My Recent Blog Posts</Title>
    </Container>
  )
}
