import React from "react"
import styled from "styled-components"

import InstagramIcon from "../images/icons/instagram.svg"
import { colors } from "../styles"

const Container = styled.footer`
  padding: 16px 16px 16px 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: ${colors.pink};
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
`

const Copyright = styled.p`
  font-size: 1.2rem;
  letter-spacing: 0.2rem;
  text-transform: uppercase;
  color: ${colors.black};
`

const SocialIcon = styled.a`
  width: 32px;
  height: 32px;
  padding: 8px;
  border-radius: 50%;
  transition: background-color 80ms;

  @media (hover: hover) {
    &:hover {
      background-color: #fff;

      svg {
        fill: ${colors.pink};
      }
    }
  }
`

const Instagram = styled(InstagramIcon)`
  width: 100%;
  height: 100%;
  fill: ${colors.black};
`

export default function Footer() {
  return (
    <Container>
      <Copyright>© {new Date().getFullYear()} Maintain Fitness</Copyright>

      <SocialIcon
        href="https://instagram.com/beccastevensfit"
        aria-label="Instagram"
        target="_blank"
        rel="noopener"
      >
        <Instagram />
      </SocialIcon>
    </Container>
  )
}
