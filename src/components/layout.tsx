import React from "react"
import styled, { createGlobalStyle } from "styled-components"

import Header from "./Header"
import { colors } from "../styles"
import Helmet from "react-helmet"

const GlobalStyle = createGlobalStyle`
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Open Sans', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: ${colors.black}
  }

  html {
    font-size: 62.5%;
  }

  body {
    background: #efefef;
  }

  a {
    text-decoration: none;
    color: inherit;
  }
`

const Container = styled.div`
  height: 100vh;
  width: 100%;
  display: grid;
  grid-template-rows: auto 1fr;
`

const Main = styled.main`
  display: flex;
`

export default function Layout({ children }) {
  return (
    <>
      <Helmet>
        <link
          href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;600&display=swap"
          rel="stylesheet"
        />
      </Helmet>
      <GlobalStyle />

      <Container>
        <Header />
        <Main>{children}</Main>
      </Container>
    </>
  )
}
