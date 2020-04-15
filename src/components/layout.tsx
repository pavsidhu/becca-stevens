import React from "react"
import { createGlobalStyle } from "styled-components"

const GlobalStyle = createGlobalStyle`
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Open Sans', sans-serif;
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
      <main>{children}</main>
    </>
  )
}
