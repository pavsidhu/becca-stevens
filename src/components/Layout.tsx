import React from "react"
import Helmet from "react-helmet"
import styled, { createGlobalStyle } from "styled-components"
import { CSSTransition, TransitionGroup } from "react-transition-group"

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

  @media (prefers-reduced-motion: reduce) {
    *,
    ::before,
    ::after {
      animation-delay: -1ms !important;
      animation-duration: 1ms !important;
      animation-iteration-count: 1 !important;
      background-attachment: initial !important;
      scroll-behavior: auto !important;
      transition-delay: 0s !important;
      transition-duration: 0s !important; 
    } 
  }
`

const timeout = 400

const Content = styled.div`
  display: grid;
  min-height: calc(100vh - var(--header-height));
  width: 100%;
  margin-top: var(--header-height);
  grid-template-rows: 1fr auto;
  transition: opacity ${timeout}ms ease-in-out,
    transform ${timeout}ms ease-in-out;

  &.enter {
    position: absolute;
    top: 0;
    left: 0;
    opacity: 0;
  }

  &.enter-active,
  &.exit {
    opacity: 1;
    transform: translateY(0);
  }

  &.exit-active {
    opacity: 0;
    transform: translateY(5vh);
  }
`

export default function Layout({ children, location }) {
  return (
    <>
      <GlobalStyle />
      <Helmet>
        <link
          href="https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300;0,400;0,600;1,400&display=swap"
          rel="stylesheet"
        />
      </Helmet>

      <Header />

      <TransitionGroup>
        <CSSTransition
          key={location.pathname}
          timeout={timeout}
          unmountOnExit={true}
          onExit={(node) => {
            node.style.position = "fixed"
            node.style.top = -1 * window.scrollY + "px"
          }}
        >
          <Content>
            <main>{children}</main>
            <Footer />
          </Content>
        </CSSTransition>
      </TransitionGroup>
    </>
  )
}
