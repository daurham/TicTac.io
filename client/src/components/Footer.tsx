import React from 'react'
import styled from 'styled-components'
import Test from './Test'

type Props = {}

const Footer = (props: Props) => {
  return (
    <>
    <FooterContainer>
      Footer
    </FooterContainer>
    <FooterContainer>
      <Test />
    </FooterContainer>
    </>
  )
}

export default Footer

const FooterContainer = styled.div`
display: flex;
justify-content: center;
`;