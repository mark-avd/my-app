import React from 'react'
import { styled } from 'linaria/react'
import Text from './Text'
import { TextT } from '../../types'

const TextContainer = styled.div`
    background: transparent;
    border: 1px solid #949494;
    border-radius: 12px;
    cursor: grab;
`

const Word: React.FC<TextT> = ({ text }) => {
    return (
        <TextContainer>
            <Text text={text} />
        </TextContainer>
    )
}

export default Word
