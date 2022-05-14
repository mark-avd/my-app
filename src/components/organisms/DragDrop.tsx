import React, { createRef, useCallback } from 'react'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { TouchBackend } from 'react-dnd-touch-backend'
import { observer } from 'mobx-react-lite'
import Word from '../molecules/Word'
import Group from '../molecules/Group'
import CheckSentenceControls from '../molecules/CheckSentenceControls'
import AnimateWords from '../AnimateWords'
import LoadingDummy from '../molecules/LoadingDummy'
import { isTouchDevice } from '../../utils/isTouchDevice'
import { store } from '../../stores/store'
import { ItemT } from '../../types'

const DragAndDrop: React.FC = () => {
    const isTouchScreen = isTouchDevice() ? TouchBackend : HTML5Backend
    const renderWord = useCallback((word: ItemT, index: number, group?: 'start' | 'target') => {
        return (
            <Word
                key={word.id + word.text}
                id={word.id}
                text={word.text}
                index={index}
                group={group}
                ref={createRef<HTMLDivElement>()}
            />
        )
    }, [])

    return (
        <>
            <DndProvider backend={isTouchScreen}>
                <Group type={'target'}>
                    {store.targetWords?.map((word: ItemT, index: number) =>
                        renderWord(word, index, 'target')
                    )}
                </Group>
                <Group type={'start'}>
                    {store.loading ? (
                        <LoadingDummy />
                    ) : (
                        <AnimateWords>
                            {store.startWords?.map((word: ItemT, index: number) =>
                                renderWord(word, index, 'start')
                            )}
                        </AnimateWords>
                    )}
                </Group>
            </DndProvider>
            <CheckSentenceControls />
        </>
    )
}

export default observer(DragAndDrop)
