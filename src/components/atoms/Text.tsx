import React from 'react'
import { styled } from 'linaria/react'
import { TextT } from '../../types'

const TextContainer = styled.p`
    padding: 6px 8px;
`

const Text: React.FC<TextT> = ({ text }) => {
    return <TextContainer>{text}</TextContainer>
}

export default Text
