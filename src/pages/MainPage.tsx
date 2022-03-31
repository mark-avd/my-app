import React from 'react'
import Icon from '../components/atoms/Icon'
import SentencePreview from '../components/molecules/SentencePreview'
import MainTemplate from '../components/templates/MainTemplate'
import DragDrop from '../components/organisms/DragDrop'

const MainPage: React.FC = () => {
    return (
        <MainTemplate
            loadingIcon={<Icon type={'loading'} />}
            dragDrop={<DragDrop />}
            sentencePreview={<SentencePreview />}
        />
    )
}

export default MainPage
