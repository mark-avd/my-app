import React, { useEffect, useState } from 'react'
import { mockSentences } from '../../utils/mock'
import { CloudInterface, OrderedArrayItemT, SentenceIndexT } from '../../types'
import { styled } from 'linaria/react'
import { makeOrderedArray, shuffleArray } from '../../utils/utils'
import Word from '../atoms/Word'
import Button from '../atoms/Button'

const Cloud = styled.div`
  min-height: 100px;
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
`

const ButtonContainer = styled.div`
  width: 100%;
`

const DragAndDropArea: React.FC<SentenceIndexT> = ({ sentenceIndex }) => {
    const [clouds, setClouds] = useState<CloudInterface[]>()
    const [currentWord, setCurrentWord] = useState<OrderedArrayItemT | undefined>()
    const [currentCloud, setCurrentCloud] = useState<CloudInterface | undefined>()

    useEffect(() => {
        const wordsArray: string[] = mockSentences[sentenceIndex].eng.split(' ')
        setClouds([
            { id: 0, words: [] },
            { id: 1, words: makeOrderedArray(shuffleArray(wordsArray)) },
        ])
    }, [])

    function dragStartHandler(event: React.DragEvent, cloud: CloudInterface, word: OrderedArrayItemT) {
        setCurrentWord(word)
        setCurrentCloud(cloud)
    }

    function dragEndHandler(event: React.DragEvent<HTMLDivElement>) {
        //
    }

    function dragOverHandler(event: React.DragEvent<HTMLDivElement>) {
        event.preventDefault()
    }

    function dropHandler(event: React.DragEvent<HTMLDivElement>, cloud: CloudInterface, word: OrderedArrayItemT) {
        event.preventDefault()
        event.stopPropagation()
        if (currentWord && currentCloud?.words && word && cloud.words) {
            const currentIndex: number = currentCloud.words.indexOf(currentWord)
            currentCloud.words.splice(currentIndex, 1)
            const dropIndex: number = cloud.words.indexOf(word)
            cloud.words.splice(dropIndex + 1, 0, currentWord)
            setClouds(clouds?.map(c => {
                if (c.id === cloud.id) {
                    return cloud
                }
                if (c.id === currentCloud.id) {
                    return currentCloud
                }
                return c
            }))
        }
    }

    function dropCloudHandler(event: React.DragEvent<HTMLDivElement>, cloud: CloudInterface) {
        event.preventDefault()
        event.stopPropagation()
        if (currentWord && currentCloud?.words && cloud.words) {
            cloud.words?.push(currentWord)
            const currentIndex: number = currentCloud.words.indexOf(currentWord)
            currentCloud.words.splice(currentIndex, 1)
            setClouds(clouds?.map(c => {
                if (c.id === cloud.id) {
                    return cloud
                }
                if (c.id === currentCloud.id) {
                    return currentCloud
                }
                return c
            }))
        }
    }

    return (
        <div>
            {clouds?.map((cloud) => (
                <Cloud
                    onDragOver={(event) => dragOverHandler(event)}
                    onDrop={(event) => dropCloudHandler(event, cloud)}
                    key={cloud.id}
                >
                    {cloud.words?.map((word) => (
                        <div
                            onDragStart={(event: React.DragEvent) => dragStartHandler(event, cloud, word)}
                            onDragLeave={(event) => dragEndHandler(event)}
                            onDragEnd={(event) => dragEndHandler(event)}
                            onDragOver={(event) => dragOverHandler(event)}
                            onDrop={(event) => dropHandler(event, cloud, word)}
                            draggable={true}
                            key={word.text + word.id + word.order}
                        >
                            <Word text={word.text} />
                        </div>
                    ))}
                </Cloud>
            ))}
            <ButtonContainer>
                <Button />
            </ButtonContainer>
        </div>
    )
}

export default DragAndDropArea
