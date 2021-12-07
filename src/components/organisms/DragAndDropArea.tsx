import React, { useEffect, useState } from 'react'
import { styled } from 'linaria/react'
import Text from '../atoms/Text'
import Word from '../atoms/Word'
import Button from '../atoms/Button'
import { CloudInterface, OrderedArrayItemT, SentenceIndexT } from '../../types'
import { makeOrderedArray, shuffleArray, sortByOrder } from '../../utils/utils'
import { mockSentences } from '../../utils/mock'

const Cloud = styled.div`
  align-content: flex-start;
  align-items: flex-start;
  border-top: 1px solid #030303;
  display: flex;
  flex-wrap: wrap;
  min-height: 100px;
`

const ButtonContainer = styled.div`
  padding: 0 6px;
  width: 100%;
`

const VerificationStatus = styled.div`
  display: flex;
  justify-content: center;
`

const DragAndDropArea: React.FC<SentenceIndexT> = ({ sentenceIndex }) => {
    const [clouds, setClouds] = useState<CloudInterface[]>()
    const [currentWord, setCurrentWord] = useState<OrderedArrayItemT | undefined>()
    const [currentCloud, setCurrentCloud] = useState<CloudInterface | undefined>()
    const [isWrong, setWrong] = useState<boolean>(false)
    const [isCorrect, setCorrect] = useState<boolean>(false)

    useEffect(() => {
        const wordsArray: string[] = mockSentences[sentenceIndex].eng.split(' ')
        setClouds([
            { id: 0, words: [] },
            { id: 1, words: makeOrderedArray(shuffleArray(wordsArray)) },
        ])
    }, [sentenceIndex])

    const dragStartHandler = (event: React.DragEvent, cloud: CloudInterface, word: OrderedArrayItemT) => {
        setCurrentWord(word)
        setCurrentCloud(cloud)
        setWrong(false)
        setCorrect(false)
    }

    const dragEndHandler = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault()
    }

    const dragOverHandler = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault()
    }

    const dropHandler = (event: React.DragEvent<HTMLDivElement>, cloud: CloudInterface, word: OrderedArrayItemT) => {
        event.preventDefault()
        event.stopPropagation()
        if (currentWord && currentCloud?.words && word && cloud.words) {
            const currentIndex: number = currentCloud.words.indexOf(currentWord)
            currentCloud.words.splice(currentIndex, 1)
            const dropIndex: number = cloud.words.indexOf(word)
            cloud.words.splice(dropIndex + 1, 0, currentWord)
            setClouds(
                clouds?.map((c) => {
                    if (c.id === cloud.id) {
                        return cloud
                    }
                    if (c.id === currentCloud.id) {
                        return currentCloud
                    }
                    return c
                })
            )
        }
    }

    const dropCloudHandler = (event: React.DragEvent<HTMLDivElement>, cloud: CloudInterface) => {
        event.preventDefault()
        event.stopPropagation()
        if (currentWord && currentCloud?.words && cloud.words) {
            cloud.words?.push(currentWord)
            const currentIndex: number = currentCloud.words.indexOf(currentWord)
            currentCloud.words.splice(currentIndex, 1)
            setClouds(
                clouds?.map((c) => {
                    if (c.id === cloud.id) {
                        return cloud
                    }
                    if (c.id === currentCloud.id) {
                        return currentCloud
                    }
                    return c
                })
            )
        }
    }

    const checkSentence = () => {
        if (clouds && clouds[0].words) {
            const sentence: string | undefined = clouds[0].words.map((word) => word.text).join(' ')
            if (sentence !== mockSentences[sentenceIndex].eng) {
                setWrong(true)
            }
            if (sentence === mockSentences[sentenceIndex].eng) {
                const synth = window.speechSynthesis
                const utterThis = new SpeechSynthesisUtterance(sentence)
                utterThis.lang = 'en-US'
                synth.speak(utterThis)
                setCorrect(true)
            }
        }
    }

    return (
        <div>
            {clouds?.map((cloud: CloudInterface) => (
                <Cloud
                    onDragOver={(event: React.DragEvent<HTMLDivElement>) => dragOverHandler(event)}
                    onDrop={(event: React.DragEvent<HTMLDivElement>) => dropCloudHandler(event, cloud)}
                    key={cloud.id}
                >
                    {cloud.words?.map((word: OrderedArrayItemT) => {
                        cloud.id === 1 && cloud.words?.sort(sortByOrder)
                        return (
                            <div
                                onDragStart={(event: React.DragEvent) => dragStartHandler(event, cloud, word)}
                                onDragLeave={(event: React.DragEvent<HTMLDivElement>) => dragEndHandler(event)}
                                onDragEnd={(event: React.DragEvent<HTMLDivElement>) => dragEndHandler(event)}
                                onDragOver={(event: React.DragEvent<HTMLDivElement>) => dragOverHandler(event)}
                                onDrop={(event: React.DragEvent<HTMLDivElement>) => dropHandler(event, cloud, word)}
                                draggable={true}
                                key={word.text + word.order}
                            >
                                <Word text={word.text} />
                            </div>
                        )
                    })}
                </Cloud>
            ))}
            <VerificationStatus>
                {isWrong && <Text text={'Wrong'} />}
                {isCorrect && <Text text={'Correct'} />}
            </VerificationStatus>
            <ButtonContainer>
                <Button onClick={checkSentence} />
            </ButtonContainer>
        </div>
    )
}

export default DragAndDropArea
