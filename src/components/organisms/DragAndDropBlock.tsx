import React, { useEffect, useRef, useState } from 'react'
import { styled } from 'linaria/react'
import Text from '../atoms/Text'
import Word from '../atoms/Word'
import Button from '../atoms/Button'
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

const ButtonContainer = styled.div`
    padding: 0 6px;
    width: 100%;
    margin-top: -32px;
    transition: margin-top 0.5s ease;

    &[data-status='show'] {
        margin-top: 12px;
    }
`

const VerificationStatus = styled.div`
    display: flex;
    font-weight: 600;
    justify-content: center;
    height: 30px;
    margin-top: 12px;

    &[data-color='red'] {
        p {
            color: #f31616;
        }
    }

    &[data-color='green'] {
        p {
            color: #17d217;
        }
    }
`

const ButtonWrapper = styled.div`
    height: 120px;
`

const DragAndDropBlock: React.FC<SentenceIndexT> = ({ sentenceIndex }) => {
    const [isWrong, setWrong] = useState<boolean>(false)
    const [isCorrect, setCorrect] = useState<boolean>(false)

    const [clouds, setClouds] = useState<CloudInterface[]>()
    const [isDragging, setDragging] = useState<boolean>(false)

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

    const styleDraggingItem = (draggingItem: DragItemT) => {
        const currentItem = dragItem.current
        if (currentItem?.groupIndex === draggingItem.groupIndex && currentItem.itemIndex === draggingItem.itemIndex) {
            return 'true'
        }
        return 'false'
    }

    return (
        <>
            {clouds?.map((group: CloudInterface, groupIndex: number) => (
                <Cloud
                    onDragEnter={
                        isDragging && !group.words?.length
                            ? (event: React.DragEvent) =>
                                  dragEnterHandler(event, {
                                      groupIndex,
                                      itemIndex: 0,
                                  })
                            : undefined
                    }
                    key={group.id}
                >
                    {group.words?.map((item: OrderedArrayItemT, itemIndex: number) => (
                        <WordContainer
                            onDragStart={(event: React.DragEvent) =>
                                dragStartHandler(event, {
                                    groupIndex,
                                    itemIndex,
                                })
                            }
                            onDragEnter={
                                isDragging
                                    ? (event: React.DragEvent) =>
                                          dragEnterHandler(event, {
                                              groupIndex,
                                              itemIndex,
                                          })
                                    : undefined
                            }
                            key={item.text + item.order}
                            data-dragging={isDragging ? styleDraggingItem({ groupIndex, itemIndex }) : 'false'}
                            draggable
                        >
                            <Word text={item.text} />
                        </WordContainer>
                    ))}
                </Cloud>
            ))}

            <ButtonWrapper>
                <VerificationStatus data-color={(isWrong && 'red') || (isCorrect && 'green')}>
                    {isWrong && <Text text={'Something is wrong!'} />}
                    {isCorrect && <Text text={'Correct!'} />}
                </VerificationStatus>
                <ButtonContainer data-status={(isWrong || isCorrect) && 'show'}>
                    <Button onClick={checkSentence} />
                </ButtonContainer>
            </ButtonWrapper>
        </>
    )
}

export default DragAndDropBlock
