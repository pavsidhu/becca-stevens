import React, { useState } from "react"
import styled, { css } from "styled-components"

import InstagramIcon from "../images/icons/instagram.svg"
import MenuIcon from "../images/icons/menu.svg"
import ExitIcon from "../images/icons/exit.svg"
import { colors, size } from "../styles"
import { Link } from "gatsby"

const Container = styled.header`
  position: fixed;
  width: 100%;
  height: var(--header-height);
  top: 0;
  left: 0;
  flex: 1;
  z-index: 10;
  display: flex;
  align-items: center;
  padding: 24px 32px;
  background: ${colors.white};
  box-shadow: 0 2px 20px rgba(0, 0, 0, 0.1);
  text-transform: uppercase;
  user-select: none;

  @media (min-width: ${size.medium}) {
    padding: 24px 64px;
  }
`

const Title = styled.p`
  margin-left: 32px;
  font-size: 1.6rem;
  font-weight: 600;
  letter-spacing: 12px;
  line-height: 2.4rem;
  text-align: right;
  flex: 1;

  @media (min-width: ${size.medium}) {
    flex: initial;
    margin-left: 0;
    margin-right: 64px;
    text-align: left;
  }
`

const Menu = styled(MenuIcon)`
  width: 32px;
  height: 32px;
  fill: ${colors.black};

  @media (min-width: ${size.medium}) {
    display: none;
  }
`

const Nav = styled.nav<{ isVisible: boolean }>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: white;
  transform: translateX(-100%);
  transition: transform 200ms ease-out;
  padding: 32px;

  ${(props) =>
    props.isVisible &&
    css`
      transform: translateX(0);
    `}

  @media (min-width: ${size.medium}) {
    position: initial;
    height:initial;
    transform: translateX(0);
    transition: none;
    padding: 0;
    flex: 1;
    display: flex;
    flex-direction:row;
    align-items: center;
    justify-content: flex-end;
  }
`

const Exit = styled(ExitIcon)`
  position: absolute;
  top: 32px;
  left: 32px;
  width: 32px;
  height: 32px;
  fill: ${colors.black};

  @media (min-width: ${size.medium}) {
    display: none;
  }
`

const navItem = css`
  color: ${colors.grey};
  font-size: 2.4rem;
  letter-spacing: 3px;
  position: relative;

  @media (min-width: ${size.medium}) {
    padding: 16px 8px;
    font-size: 1.2rem;
    letter-spacing: 3px;
  }

  @media (hover: hover) {
    &:hover {
      -webkit-text-stroke-width: 0.5px;
      -webkit-text-stroke-color: ${colors.grey};
    }
  }
`

const NavItemLink = styled(Link)`
  ${navItem}
`

const NavItemA = styled.a`
  ${navItem}
`

const Divider = styled.div`
  width: 50%;
  max-width: 250px;
  height: 2px;
  margin: 48px 0;
  background-color: ${colors.black};
  opacity: 0.1;

  @media (min-width: ${size.medium}) {
    width: 2px;
    height: 3.2rem;
    margin: 0 16px;
  }
`

const SocialIcon = styled.a`
  background: ${colors.pink};
  border-radius: 50%;
  padding: 12px;
  height: 48px;
  width: 48px;
  margin-top: 48px;
  transition: background 80ms;

  @media (min-width: ${size.medium}) {
    padding: 10px;
    height: 40px;
    width: 40px;
    margin-top: 0;
    margin-left: 24px;
  }

  @media (hover: hover) {
    &:hover {
      background: ${colors.lightPink};
    }
  }
`

const Instagram = styled(InstagramIcon)`
  width: 100%;
  height: 100%;
  fill: ${colors.white};
`

export default function Header() {
  const [isMenuVisible, setMenuVisible] = useState(false)

  return (
    <Container>
      <Menu onClick={() => setMenuVisible(true)} />

      <Title>
        <Link to="/">Maintain Fitness</Link>
      </Title>

      <Nav isVisible={isMenuVisible}>
        <Exit onClick={() => setMenuVisible(false)} />

        <NavItemLink to="/#about" onClick={() => setMenuVisible(false)}>
          About
        </NavItemLink>
        <Divider />
        <NavItemLink to="/blog" onClick={() => setMenuVisible(false)}>
          Blog
        </NavItemLink>
        <Divider />
        <NavItemA
          href="mailto:becca@traintomaintain.co.uk"
          onClick={() => setMenuVisible(false)}
        >
          Contact
        </NavItemA>

        <SocialIcon
          href="https://instagram.com/beccastevensfit"
          aria-label="Instagram"
          target="_blank"
          rel="noopener"
        >
          <Instagram />
        </SocialIcon>
      </Nav>
    </Container>
  )
}
