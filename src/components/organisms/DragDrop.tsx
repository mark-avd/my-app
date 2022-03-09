import React, { useCallback } from 'react'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { observer } from 'mobx-react-lite'
import Word from '../molecules/Word'
import Cloud from '../molecules/Cloud'
import CheckSentenceControls from '../molecules/CheckSentenceControls'
import { store } from '../../stores/store'
import { ItemT } from '../../types'

const DragAndDrop: React.FC = () => {
    const renderWord = useCallback((word: ItemT, index: number, group?: 'start' | 'target') => {
        return <Word key={word.text + word.id} id={word.id} text={word.text} index={index} group={group} />
    }, [])

    return (
        <>
            <DndProvider backend={HTML5Backend}>
                <Cloud group={'target'}>
                    {store.targetWords?.map((word: ItemT, index: number) => renderWord(word, index, 'target'))}
                </Cloud>
                <Cloud group={'start'}>
                    {store.words?.map((word: ItemT, index: number) => renderWord(word, index, 'start'))}
                </Cloud>
            </DndProvider>
            <CheckSentenceControls />
        </>
    )
}

export default observer(DragAndDrop)
