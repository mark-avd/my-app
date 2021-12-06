import React from 'react'
import { styled } from 'linaria/react'
import TranslatedSentence from '../molecules/TranslatedSentence'
import DragAndDropArea from './DragAndDropArea'

const BlockContainer = styled.div`
    width: 50vw;
    margin: 120px auto;
`

const Heading = styled.h2``

const CheckSentenceBlock: React.FC = () => {
    const sentenceIndex = 1
    return (
        <BlockContainer>
            <Heading>Translate this sentence</Heading>
            <TranslatedSentence sentenceIndex={sentenceIndex} />
            <DragAndDropArea sentenceIndex={sentenceIndex} />
        </BlockContainer>
    )
}

export default CheckSentenceBlock
