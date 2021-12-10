import React from 'react'
import { styled } from 'linaria/react'
import { TextT } from '../../types'

const BaseText = styled.p`
    padding: 6px 8px;
`

const Text: React.FC<TextT> = ({ text }) => {
    return <BaseText>{text}</BaseText>
}

export default Text
