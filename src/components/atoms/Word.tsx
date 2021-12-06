import React from 'react'
import { styled } from 'linaria/react'
import { TextInterface } from '../../types'
import Text from './Text'



const WordContainer = styled.div`
    border: 1px solid #949494;
    border-radius: 12px;
    cursor: grab;
`

const Word: React.FC<TextInterface> = ({ text }) => {
    return (
        <WordContainer>
            <Text text={text} />
        </WordContainer>
    )
}

export default Word
