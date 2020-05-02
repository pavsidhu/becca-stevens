import React from "react"
import { createGlobalStyle } from "styled-components"

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
`

export default function Layout({ children }) {
  return (
    <>
      <GlobalStyle />

      <Header />
      <main>{children}</main>
      <Footer />
    </>
  )
}
