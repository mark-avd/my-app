import React from 'react'
import styled from 'styled-components'
import { TextProps } from '../../types'

const TextContainer = styled.p`
    padding: 6px 8px;
`

const Text: React.FC<TextProps> = ({ text }) => {
    return <TextContainer>{text}</TextContainer>
}

export default Text
