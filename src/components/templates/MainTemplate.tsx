import React from 'react'
import { styled } from 'linaria/react'

const MainTemplateContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin: 0 auto;
    height: 100vh;

    @media screen and (max-width: 650px) {
        height: 85vh;
        width: 90vw;
    }
    @media screen and (min-width: 650px) {
        width: 70vw;
    }
    @media screen and (min-width: 800px) {
        width: 60vw;
    }
    @media screen and (min-width: 1000px) {
        width: 40vw;
    }
    @media screen and (min-width: 1500px) {
        width: 32vw;
    }
`

const Heading = styled.h1`
    font-weight: 500;
    margin: 0 0 24px 24px;
`

const TranslatedSentenceContainer = styled.div`
    margin-bottom: 24px;
`

const IconContainer = styled.div`
    margin: 0 auto;
`

interface MainTemplateProps {
    loadingIcon: React.ReactElement
    dragDrop: React.ReactElement
    sentencePreview: React.ReactElement
}

const MainTemplate: React.FC<MainTemplateProps> = ({ loadingIcon, dragDrop, sentencePreview }) => {
    return (
        <MainTemplateContainer>
            <Heading>Translate this sentence</Heading>
            <TranslatedSentenceContainer>{sentencePreview}</TranslatedSentenceContainer>
            <React.Suspense fallback={<IconContainer>{loadingIcon}</IconContainer>}>{dragDrop}</React.Suspense>
        </MainTemplateContainer>
    )
}

export default MainTemplate
