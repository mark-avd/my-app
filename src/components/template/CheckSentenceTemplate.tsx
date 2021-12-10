import React from 'react'
import { styled } from 'linaria/react'
import SentenceToTranslateBlock from '../molecules/SentenceToTranslateBlock'
import DragAndDropBlock from '../organisms/DragAndDropBlock'

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

const CheckSentenceTemplate: React.FC = () => {
    const sentenceIndex = Math.floor(Math.random() * 2)
    return (
        <CheckSentenceBlockContainer>
            <Heading>Translate this sentence</Heading>
            <TranslatedSentenceContainer>
                <SentenceToTranslateBlock sentenceIndex={sentenceIndex} />
            </TranslatedSentenceContainer>
            <DragAndDropBlock sentenceIndex={sentenceIndex} />
        </CheckSentenceBlockContainer>
    )
}

export default CheckSentenceTemplate
