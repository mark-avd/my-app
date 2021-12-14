import React from 'react'
import { styled } from 'linaria/react'
import Text from '../atoms/Text'
import Button from '../atoms/Button'

const ButtonContainer = styled.div`
    padding: 0 6px;
    width: 100%;
    margin-top: -32px;
    transition: margin-top 0.5s ease;

    &[data-status='show'] {
        margin-top: 12px;
    }
`

const VerificationStatus = styled.div`
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

interface CheckSentenceControls {
    isWrong: boolean
    isCorrect: boolean
    checkSentence: () => void
}

const CheckSentenceControls: React.FC<CheckSentenceControls> = ({ isWrong, isCorrect, checkSentence }) => {
    return (
        <ButtonWrapper>
            <VerificationStatus data-color={(isWrong && 'red') || (isCorrect && 'green')}>
                {isWrong && <Text text={'Something is wrong!'} />}
                {isCorrect && <Text text={'Correct!'} />}
            </VerificationStatus>
            <ButtonContainer data-status={(isWrong || isCorrect) && 'show'}>
                <Button onClick={checkSentence} />
            </ButtonContainer>
        </ButtonWrapper>
    )
}

export default CheckSentenceControls
