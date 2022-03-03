import React from 'react'
import { styled } from 'linaria/react'
import { observer } from 'mobx-react-lite'
import Icon from '../components/atoms/Icon'
import SentencePreview from '../components/molecules/SentencePreview'

const DragDrop = React.lazy(() => import('../components/organisms/DragDrop'))

const Container = styled.div`
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

const IconContainer = styled.div`
    margin: 0 auto;
`

const MainPage: React.FC = () => {
    return (
        <Container>
            <Heading>Translate this sentence</Heading>
            <TranslatedSentenceContainer>
                <SentencePreview />
            </TranslatedSentenceContainer>
            <React.Suspense
                fallback={
                    <IconContainer>
                        <Icon type={'loading'} />
                    </IconContainer>
                }
            >
                <DragDrop />
            </React.Suspense>
        </Container>
    )
}

export default observer(MainPage)
