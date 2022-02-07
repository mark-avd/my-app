import React, { useEffect, useRef, useState } from 'react'
import { styled } from 'linaria/react'
import { observer } from 'mobx-react-lite'
import Word from '../atoms/Word'
import Cloud from '../atoms/Cloud'
import CheckSentenceControls from '../molecules/CheckSentenceControls'
import { CloudInterface, DragItemT, OrderedArrayItemT } from '../../types'
import { store } from '../../stores/store'

const WordContainer = styled.div`
    border-radius: 12px;
    margin: 5px;

    &[data-dragging='true'] {
        background: #b2beb5;

        p {
            color: #b2beb5;
        }
    }
    &[data-dragging='false'] {
        background: #fff;
    }
`

const DragAndDropBlock: React.FC = () => {
    const [isDragging, setDragging] = useState<boolean>(false)
    const [clouds, setClouds] = useState<CloudInterface[]>([
        { id: 'endCloud', words: [] },
        { id: 'startCloud', words: [] },
    ])

    const dragItem = useRef<DragItemT | null>(null)
    const dragNode = useRef<EventTarget | null>(null)

    useEffect(() => {
        if (store.currentSentence) {
            setClouds([
                { id: 'endCloud', words: [] },
                { id: 'startCloud', words: store.orderedArray },
            ])
        }
    }, [store.currentSentence])

    const dragStartHandler = (event: React.DragEvent, targetItem: DragItemT) => {
        dragItem.current = targetItem
        dragNode.current = event.target
        dragNode.current?.addEventListener('dragend', dragEndHandler)
        setTimeout(() => {
            setDragging(true)
        }, 0)
    }

    const dragEnterHandler = (event: React.DragEvent, targetItem: DragItemT) => {
        event.preventDefault()
        const currentItem = dragItem.current
        if (currentItem) {
            if (event.target !== dragNode.current) {
                setClouds((prevClouds: CloudInterface[] | undefined) => {
                    const newClouds = JSON.parse(JSON.stringify(prevClouds))
                    newClouds[targetItem.groupIndex].words.splice(
                        targetItem.itemIndex,
                        0,
                        newClouds[currentItem.groupIndex].words.splice(currentItem.itemIndex, 1)[0]
                    )
                    dragItem.current = targetItem
                    return newClouds
                })
            }
        }
    }

    const dragEndHandler = () => {
        setDragging(false)
        dragNode.current?.removeEventListener('dragend', dragEndHandler)

    }
    const dropHandler = () => {
        dragItem.current = null
        dragNode.current = null
    }

    const setCurrentSentence = () => {
        if (clouds && clouds[0].words) {
            const sentence: string | undefined = clouds[0].words.map((word) => word.text).join(' ')
            store.setSentenceToCheck(sentence)
        }
    }

    const styleDraggingItem = (targetItem: DragItemT) => {
        const currentItem = dragItem.current
        if (currentItem?.groupIndex === targetItem.groupIndex && currentItem.itemIndex === targetItem.itemIndex) {
            return 'true'
        }
        return 'false'
    }

    return (
        <>
            {clouds?.map((group: CloudInterface, groupIndex: number) => (
                <Cloud
                    onDragEnter={
                        isDragging && !group.words?.length ? (event: React.DragEvent) =>
                            dragEnterHandler(event, { groupIndex, itemIndex: 0, })
                            :
                            undefined
                    }
                    key={group.id}
                >
                    {group.words?.map((word: OrderedArrayItemT, wordIndex: number) => (
                        <WordContainer
                            onDragStart={(event: React.DragEvent) =>
                                dragStartHandler(event, { groupIndex, itemIndex: wordIndex, })
                            }
                            onDragEnter={isDragging ? (event: React.DragEvent) =>
                                dragEnterHandler(event, { groupIndex, itemIndex: wordIndex, }) : undefined
                            }
                            onDrop={dropHandler}
                            key={word.text + word.order}
                            data-dragging={isDragging ? styleDraggingItem({ groupIndex, itemIndex: wordIndex }) : 'false'}
                            draggable
                        >
                            <Word text={word.text} />
                        </WordContainer>
                    ))}
                </Cloud>
            ))}
            <CheckSentenceControls setCurrentSentence={setCurrentSentence} />
        </>
    )
}

export default observer(DragAndDropBlock)
