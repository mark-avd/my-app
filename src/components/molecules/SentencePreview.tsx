import React from 'react'
import { styled } from 'linaria/react'
import { observer } from 'mobx-react-lite'
import Icon from '../atoms/Icon'
import Bubble from '../atoms/Bubble'
import { store } from '../../stores/store'

const SentencePreviewContainer = styled.div`
    display: flex;
    margin-top: 16px;
    padding: 0 12px;
`

const IconContainer = styled.div`
    width: 40%;

    img {
        padding-top: 12px;
        border-radius: 14px;
        width: 90%;
    }
`

const BubbleContainer = styled.div`
    margin: 0 0 12px 12px;
    width: 60%;
`

const SentencePreview: React.FC = () => {
    return (
        <SentencePreviewContainer>
            <IconContainer>
                <Icon type={'person'} />
            </IconContainer>
            <BubbleContainer>
                <Bubble text={store.currentSentence?.ru} />
            </BubbleContainer>
        </SentencePreviewContainer>
    )
}

export default observer(SentencePreview)
