import React from 'react'
import { styled } from 'linaria/react'
import Icon from '../atoms/Icon'
import SentenceBubble from './SentenceBubble'
import { SentenceIndexT } from '../../types'

const SentenceToTranslateContainer = styled.div`
  display: flex;
  margin-top: 16px;
`

const IconContainer = styled.div`
  width: 40%;

  img {
    border-radius: 14px;
    width: 100%;
  }
`

const BubbleContainer = styled.div`
  margin-left: 12px;
  width: 60%;
`

const SentenceToTranslateBlock: React.FC<SentenceIndexT> = ({ sentenceIndex }) => {
    return (
        <SentenceToTranslateContainer>
            <IconContainer>
                <Icon type={'person'} />
            </IconContainer>
            <BubbleContainer>
                <SentenceBubble sentenceIndex={sentenceIndex} />
            </BubbleContainer>
        </SentenceToTranslateContainer>
    )
}

export default SentenceToTranslateBlock
