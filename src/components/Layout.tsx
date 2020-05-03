import React from "react"
import styled, { createGlobalStyle } from "styled-components"
import "loading-attribute-polyfill"

import { Footer, Header } from "."
import { colors } from "../styles"

const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;600&display=swap');

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

      <Header />
      <Content>
        <main>{children}</main>
        <Footer />
      </Content>
    </>
  )
}
