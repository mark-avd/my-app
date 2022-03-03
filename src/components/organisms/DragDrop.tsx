import React, { useCallback, useEffect, useState } from 'react'
import { observer } from 'mobx-react-lite'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import update from 'immutability-helper'
import Word from '../molecules/Word'
import Cloud from '../molecules/Cloud'
import CheckSentenceControls from '../molecules/CheckSentenceControls'
import { ItemT } from '../../types'
import { store } from '../../stores/store'

const DragAndDrop: React.FC = () => {
    const [words, setWords] = useState<ItemT[]>([])

    useEffect(() => {
        if (store.currentSentence) {
            if (store.orderedArray) {
                setWords(store.orderedArray)
            }
        }
    }, [store.currentSentence])

    const moveWord = useCallback((dragIndex: number, hoverIndex: number) => {
        setWords((prevWords: ItemT[]) =>
            update(prevWords, {
                $splice: [
                    [dragIndex, 1],
                    [hoverIndex, 0, prevWords[dragIndex] as ItemT],
                ],
            })
        )
    }, [])

    const renderWord = useCallback(
        (word: ItemT, index: number) => {
            return <Word key={word.text + word.id} id={word.id} text={word.text} index={index} moveWord={moveWord} />
        },
        [moveWord]
    )

    const setSentenceToCheck = () => {
        if (words) {
            const sentence: string | undefined = words.map((word) => word.text).join(' ')
            store.setSentenceToCheck(sentence)
        }
    }

    return (
        <>
            <DndProvider backend={HTML5Backend}>
                <Cloud />
                <Cloud>{words?.map((word: ItemT, index: number) => renderWord(word, index))}</Cloud>
            </DndProvider>
            <CheckSentenceControls setSentenceToCheck={setSentenceToCheck} />
        </>
    )
}

export default observer(DragAndDrop)
