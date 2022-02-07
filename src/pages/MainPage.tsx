import React from 'react'
import { styled } from 'linaria/react'
import { observer } from 'mobx-react-lite'
import Icon from '../components/atoms/Icon'
import SentenceToTranslateBlock from '../components/molecules/SentencePreview'

const DragAndDropBlock = React.lazy(() => import('../components/organisms/DragAndDropBlock'))

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
                <SentenceToTranslateBlock />
            </TranslatedSentenceContainer>
            <React.Suspense
                fallback={
                    <IconContainer>
                        <Icon type={'loading'} />
                    </IconContainer>
                }
            >
                <DragAndDropBlock />
            </React.Suspense>
        </Container>
    )
}

export default observer(MainPage)
