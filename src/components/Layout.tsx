import React from "react"
import Helmet from "react-helmet"
import styled, { createGlobalStyle } from "styled-components"
import "loading-attribute-polyfill"

import { Footer, Header } from "."
import { colors } from "../styles"

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
    scroll-behavior: smooth;
  }

  body {
    background: #f5f5f5;
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  :root {
    --header-height: 96px;
  }
`

const Content = styled.div`
  display: grid;
  min-height: calc(100vh - var(--header-height));
  margin-top: var(--header-height);
  grid-template-rows: 1fr auto;
`

export default function Layout({ children }) {
  return (
    <>
      <GlobalStyle />
      <Helmet>
        <link href="https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300;0,400;0,600;1,400&display=swap" rel="stylesheet">
      </Helmet>

      <Header />
      <Content>
        <main>{children}</main>
        <Footer />
      </Content>
    </>
  )
}
