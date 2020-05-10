import styled from "styled-components"
import { Link } from "gatsby"

import { colors } from "../styles"

const Button = styled(Link)`
  padding: 16px 32px;
  border: 1px solid ${colors.blue};
  border-radius: 2px;
  color: ${colors.blue};
  font-size: 1.4rem;
  letter-spacing: 0.3rem;
  text-transform: uppercase;
  transition: background-color 80ms, color 80ms;
  user-select: none;
  outline: none;

  @media (hover: hover) {
    &:hover {
      background-color: ${colors.blue};
      color: ${colors.white};
    }
  }
`

export default Button
