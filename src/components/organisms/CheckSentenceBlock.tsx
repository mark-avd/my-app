import React from 'react'
import { styled } from 'linaria/react'
import TranslatedSentence from '../molecules/TranslatedSentence'
import DragAndDropArea from './DragAndDropArea'

const CheckSentenceBlockContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 0 auto;
  height: 100vh;
  width: 32vw;
`

const Heading = styled.h1`
  font-weight: 500;
  margin-bottom: 24px;
`

const TranslatedSentenceContainer = styled.div`
  margin-bottom: 24px;
`

const CheckSentenceBlock: React.FC = () => {
    const sentenceIndex = Math.floor(Math.random() * 2)
    return (
        <CheckSentenceBlockContainer>
            <Heading>Translate this sentence</Heading>
            <TranslatedSentenceContainer>
                <TranslatedSentence sentenceIndex={sentenceIndex} />
            </TranslatedSentenceContainer>
            <DragAndDropArea sentenceIndex={sentenceIndex} />
        </CheckSentenceBlockContainer>
    )
}

export default CheckSentenceBlock
