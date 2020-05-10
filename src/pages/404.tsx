import React from "react"
import styled from "styled-components"

import { Layout, SEO, Title, Button } from "../components"

const Container = styled.article`
  display: grid;
  grid-template-areas:
    ". .           ."
    ". title       ."
    ". .           ."
    ". home-button ."
    ". .           .";
  grid-template-columns: 24px 1fr 24px;
  grid-template-rows: 1fr auto 24px auto 2fr;
  justify-items: center;
  min-height: 100%;
`

const NotFoundTitle = styled(Title)`
  grid-area: title;
`

const HomeButton = styled(Button)`
  grid-area: home-button;
`

export default function NotFoundPage() {
  return (
    <Layout>
      <SEO title="Page Not Found" />

      <Container>
        <NotFoundTitle>Page Not Found</NotFoundTitle>
        <HomeButton to="/">Go Back Home</HomeButton>
      </Container>
    </Layout>
  )
}
