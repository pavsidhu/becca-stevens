import React, { useState } from "react"
import styled, { css } from "styled-components"

import InstagramIcon from "../images/instagram.svg"
import MenuIcon from "../images/menu.svg"
import ExitIcon from "../images/exit.svg"
import { colors, size } from "../styles"

const Container = styled.header`
  flex: 1;
  display: flex;
  align-items: center;
  padding: 24px 32px;
  background: white;
  box-shadow: 0 2px 20px rgba(0, 0, 0, 0.1);
  text-transform: uppercase;

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

  @media (min-width: ${size.medium}) {
    margin: 0;
    text-align: left;
  }
`

const Menu = styled(MenuIcon)`
  @media (min-width: ${size.medium}) {
    display: none;
  }
`

const Nav = styled.nav<{ isVisible: boolean }>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: white;
  transform: translateX(-100%);
  transition: transform 200ms ease-out;

  ${(props) =>
    props.isVisible &&
    css`
      transform: translateX(0);
    `}

  @media (min-width: ${size.medium}) {
    position: initial;
    transform: translateX(0);
    transition: none;
    flex: 1;
    display: flex;
    flex-direction:row;
    align-items: center;
    justify-content: flex-end;
  }
`

const Exit = styled(ExitIcon)`
  position: absolute;
  top: 35px;
  left: 32px;

  @media (min-width: ${size.medium}) {
    display: none;
  }
`

const NavItem = styled.a`
  color: ${colors.grey};
  font-size: 2.4rem;
  letter-spacing: 3px;

  @media (min-width: ${size.medium}) {
    font-size: 1.2rem;
    letter-spacing: 3px;
  }

  @media (hover: hover) {
    &:hover {
      color: ${colors.black};
    }
  }
`

const Divider = styled.div`
  width: 50%;
  height: 2px;
  margin: 48px 0;
  background-color: ${colors.black};
  opacity: 0.1;

  @media (min-width: ${size.medium}) {
    width: 2px;
    height: 3.2rem;
    margin: 0 24px;
  }
`

const SocialIcon = styled.a`
  background: ${colors.pink};
  border-radius: 50%;
  padding: 12px;
  height: 48px;
  width: 48px;
  margin-top: 48px;

  @media (min-width: ${size.medium}) {
    padding: 10px;
    height: 40px;
    width: 40px;
    margin-top: 0;
    margin-left: 24px;
  }
`

const Instagram = styled(InstagramIcon)`
  width: 100%;
  height: 100%;
  fill: white;
`

export default function Header() {
  const [isMenuVisible, setMenuVisible] = useState(false)

  return (
    <Container>
      <Menu onClick={() => setMenuVisible(true)} />

      <Title>Maintain Fitness</Title>

      <Nav isVisible={isMenuVisible}>
        <Exit onClick={() => setMenuVisible(false)} />

        <NavItem href="">Blog</NavItem>
        <Divider />
        <NavItem href="">About</NavItem>
        <Divider />
        <NavItem href="">Contact</NavItem>

        <SocialIcon href="https://instagram.com/traintomaintain">
          <Instagram />
        </SocialIcon>
      </Nav>
    </Container>
  )
}
