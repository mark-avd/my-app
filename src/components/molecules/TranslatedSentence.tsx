import React from 'react'
import Icon from '../atoms/Icon'
import { SentenceIndexT } from '../../types'
import { styled } from 'linaria/react'
import SentenceBubble from './SentenceBubble'

const IconContainer = styled.div`
    width: 40%;

    img {
        width: 100%;
    }
`

const BubbleContainer = styled.div`
  width: 56%;
`

const FlexContainer = styled.div`
  display: flex;
  margin-top: 16px;
`

const TranslatedSentence: React.FC<SentenceIndexT> = ({ sentenceIndex }) => {
    return (
        <FlexContainer>
            <IconContainer>
                <Icon type={'person'} />
            </IconContainer>
            <BubbleContainer>
                <SentenceBubble sentenceIndex={sentenceIndex} />
            </BubbleContainer>
        </FlexContainer>
    )
}

export default TranslatedSentence
