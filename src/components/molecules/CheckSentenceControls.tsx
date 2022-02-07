import React, { useState } from 'react'
import { styled } from 'linaria/react'
import { observer } from 'mobx-react-lite'
import Text from '../atoms/Text'
import Button from '../atoms/Button'
import { store } from '../../stores/store'

const ButtonContainer = styled.div`
    padding: 0 6px;
    width: 100%;
    margin-top: -32px;
    transition: margin-top 0.5s ease;

    &[data-status='show'] {
        margin-top: 12px;
    }
`

const VerificationStatusContainer = styled.div`
    display: flex;
    font-weight: 600;
    justify-content: center;
    height: 30px;
    margin-top: 12px;

    &[data-color='red'] {
        p {
            color: #f31616;
        }
    }

    &[data-color='green'] {
        p {
            color: #17d217;
        }
    }
`

const ButtonWrapper = styled.div`
    height: 120px;
`

type CheckSentenceControls = {
    setCurrentSentence: () => void
}

const CheckSentenceControls: React.FC<CheckSentenceControls> = ({ setCurrentSentence }) => {
    const [isWrong, setWrong] = useState<boolean>(false)
    const [isCorrect, setCorrect] = useState<boolean>(false)

    const checkSentence = () => {
        setCurrentSentence()
        if (store.currentSentence) {
            if (store.sentenceToCheck !== store.currentSentence.en) {
                setWrong(true)
                setTimeout(() => setWrong(false), 3000)
            }
            if (store.sentenceToCheck === store.currentSentence.en) {
                const utterThis = new SpeechSynthesisUtterance(store.sentenceToCheck)
                utterThis.lang = 'en-US'
                setCorrect(true)
                setTimeout(() => setCorrect(false), 3000)
                if (!speechSynthesis.speaking) {
                    speechSynthesis.speak(utterThis)
                }
            }
        }
    }

    return (
        <ButtonWrapper>
            <VerificationStatusContainer data-color={(isWrong && 'red') || (isCorrect && 'green')}>
                {isWrong && <Text text={'Something is wrong!'} />}
                {isCorrect && <Text text={'Correct!'} />}
            </VerificationStatusContainer>
            <ButtonContainer data-status={(isWrong || isCorrect) && 'show'}>
                <Button onClick={checkSentence} />
            </ButtonContainer>
        </ButtonWrapper>
    )
}

export default observer(CheckSentenceControls)
