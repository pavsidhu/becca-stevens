import React from "react"
import { createGlobalStyle } from "styled-components"

import Header from "./Header"
import { colors } from "../styles"

const GlobalStyle = createGlobalStyle`
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Open Sans', sans-serif;
    color: ${colors.black}
  }

  html {
    font-size: 62.5%;
  }

  body {
    background: #efefef;
    display: flex;
    flex-direction: column;
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
    </>
  )
}
