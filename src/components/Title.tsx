import styled from "styled-components"

import { colors } from "../styles"

const Title = styled.h2`
  grid-area: title;
  align-self: start;
  text-transform: uppercase;
  text-align: center;
  letter-spacing: 0.4rem;
  font-size: 3.2rem;
  font-weight: 300;
  color: ${colors.black};
`

export default Title
