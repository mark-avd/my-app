import React from 'react'
import SentencePreview from '../components/molecules/SentencePreview'
import MainTemplate from '../components/templates/MainTemplate'
import DragDrop from '../components/organisms/DragDrop'

const MainPage: React.FC = () => {
    return (
        <MainTemplate
            dragDrop={<DragDrop />}
            sentencePreview={<SentencePreview />}
        />
    )
}

export default MainPage
