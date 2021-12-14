import React, { useEffect, useRef, useState } from 'react'
import { styled } from 'linaria/react'
import Word from '../atoms/Word'
import CheckSentenceControls from '../molecules/CheckSentenceControls'
import { CloudInterface, DragItemT, OrderedArrayItemT, SentenceIndexT } from '../../types'
import { makeOrderedArray, shuffleArray } from '../../utils/utils'
import { mockSentences } from '../../utils/mock'

const Cloud = styled.div`
    align-content: flex-start;
    align-items: flex-start;
    border-top: 1px solid #030303;
    display: flex;
    flex-wrap: wrap;
    min-height: 100px;
    padding-top: 6px;
`

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

const DragAndDropBlock: React.FC<SentenceIndexT> = ({ sentenceIndex }) => {
    const [isWrong, setWrong] = useState<boolean>(false)
    const [isCorrect, setCorrect] = useState<boolean>(false)
    const [isDragging, setDragging] = useState<boolean>(false)

    const [clouds, setClouds] = useState<CloudInterface[]>()

    const dragItem = useRef<DragItemT | null>(null)
    const dragNode = useRef<EventTarget | null>(null)

    useEffect(() => {
        const wordsArray: string[] = mockSentences[sentenceIndex].eng.split(' ')
        setClouds([
            { id: 0, words: [] },
            { id: 1, words: makeOrderedArray(shuffleArray(wordsArray)) },
        ])
    }, [sentenceIndex])

    const dragStartHandler = (event: React.DragEvent, targetItem: DragItemT) => {
        setWrong(false)
        setCorrect(false)
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

    const checkSentence = () => {
        if (clouds && clouds[0].words) {
            const sentence: string | undefined = clouds[0].words.map((word) => word.text).join(' ')
            if (sentence !== mockSentences[sentenceIndex].eng) {
                setWrong(true)
            }
            if (sentence === mockSentences[sentenceIndex].eng) {
                const utterThis = new SpeechSynthesisUtterance(sentence)
                utterThis.lang = 'en-US'
                setCorrect(true)
                if (!speechSynthesis.speaking) {
                    speechSynthesis.speak(utterThis)
                }
            }
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
                    {group.words?.map((item: OrderedArrayItemT, itemIndex: number) => (
                        <WordContainer
                            onDragStart={(event: React.DragEvent) =>
                                dragStartHandler(event, { groupIndex, itemIndex, })
                            }
                            onDragEnter={isDragging ? (event: React.DragEvent) =>
                                dragEnterHandler(event, { groupIndex, itemIndex, }) : undefined
                            }
                            onDrop={dropHandler}
                            key={item.text + item.order}
                            data-dragging={isDragging ? styleDraggingItem({ groupIndex, itemIndex }) : 'false'}
                            draggable
                        >
                            <Word text={item.text} />
                        </WordContainer>
                    ))}
                </Cloud>
            ))}
            <CheckSentenceControls isWrong={isWrong} isCorrect={isCorrect} checkSentence={checkSentence} />
        </>
    )
}

export default DragAndDropBlock
