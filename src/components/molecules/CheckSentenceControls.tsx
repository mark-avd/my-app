import React, { useState } from 'react'
import { styled } from 'linaria/react'
import { observer } from 'mobx-react-lite'
import Text from '../atoms/Text'
import Button from '../atoms/Button'
import { store } from '../../stores/store'

type StyleProps = {
    showStatus: boolean
    isCorrect: boolean
}

const CheckSentenceControlsContainer = styled.div`
    height: 120px;
    margin-top: 16px;
`

const ButtonContainer = styled.div<Pick<StyleProps, 'showStatus'>>`
    margin: ${(props) => (props.showStatus ? '10px' : '-40px')} auto;
    transition: margin 500ms ease;
    width: 90%;
`

const VerificationStatusContainer = styled.div<Pick<StyleProps, 'isCorrect'>>`
    display: flex;
    color: transparent;
    font-weight: 600;
    justify-content: center;

    p {
        color: ${(props) => (props.isCorrect ? '#17d217' : '#f31616')};
    }
`

const CheckSentenceControls: React.FC = () => {
    const [isCorrect, setCorrect] = useState<boolean>(false)
    const [showStatus, setShowStatus] = useState<boolean>(false)

    const checkSentence = () => {
        store.setSentenceToCheck()
        if (store.sentenceToCheck !== store.currentSentence.en) {
            setCorrect(false)
        }
        if (store.sentenceToCheck === store.currentSentence.en) {
            const utterThis = new SpeechSynthesisUtterance(store.sentenceToCheck)
            utterThis.lang = 'en-US'
            setCorrect(true)
            setTimeout(() => store.renderNewSentence(), 3000)
            if (!speechSynthesis.speaking) {
                speechSynthesis.speak(utterThis)
            }
        }
        setShowStatus(true)
        setTimeout(() => setShowStatus(false), 1500)
    }

    return (
        <CheckSentenceControlsContainer>
            <VerificationStatusContainer isCorrect={isCorrect}>
                {isCorrect ? <Text text={'Correct!'} /> : <Text text={'Something is wrong!'} />}
            </VerificationStatusContainer>
            <ButtonContainer showStatus={showStatus}>
                <Button onClick={checkSentence} />
            </ButtonContainer>
        </CheckSentenceControlsContainer>
    )
}

export default observer(CheckSentenceControls)
