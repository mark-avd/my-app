import React, { useState } from 'react'
import { styled } from 'linaria/react'
import { observer } from 'mobx-react-lite'
import Text from '../atoms/Text'
import Button from '../atoms/Button'
import { store } from '../../stores/store'

type Props = {
    showStatus: boolean
    isCorrect: boolean
}

const ButtonContainer = styled.div<Pick<Props, 'showStatus'>>`
    padding: 0 6px;
    width: 100%;
    margin-top: ${(props) => (props.showStatus ? '12px' : '-32px')};
    transition: margin-top 0.5s ease;
`

const VerificationStatusContainer = styled.div<Pick<Props, 'isCorrect'>>`
    display: flex;
    font-weight: 600;
    justify-content: center;
    height: 30px;
    margin-top: 12px;

    p {
        color: ${(props) => (props.isCorrect ? '#17d217' : '#f31616')};
    }
`

const ButtonWrapper = styled.div`
    height: 120px;
`

const CheckSentenceControls: React.FC = () => {
    const [isCorrect, setCorrect] = useState<boolean>(false)
    const [showStatus, setShowStatus] = useState<boolean>(false)

    const checkSentence = () => {
        store.setSentenceToCheck()
        if (store.currentSentence) {
            if (store.sentenceToCheck !== store.currentSentence.en) {
                setCorrect(false)
            }
            if (store.sentenceToCheck === store.currentSentence.en) {
                const utterThis = new SpeechSynthesisUtterance(store.sentenceToCheck)
                utterThis.lang = 'en-US'
                setCorrect(true)
                if (!speechSynthesis.speaking) {
                    speechSynthesis.speak(utterThis)
                }
            }
            setShowStatus(true)
            setTimeout(() => setShowStatus(false), 3000)
        }
    }

    return (
        <ButtonWrapper>
            <VerificationStatusContainer isCorrect={isCorrect}>
                {isCorrect ? <Text text={'Correct!'} /> : <Text text={'Something is wrong!'} />}
            </VerificationStatusContainer>
            <ButtonContainer showStatus={showStatus}>
                <Button onClick={checkSentence} />
            </ButtonContainer>
        </ButtonWrapper>
    )
}

export default observer(CheckSentenceControls)
