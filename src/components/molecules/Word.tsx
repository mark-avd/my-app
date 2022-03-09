import React, { useCallback, useRef } from 'react'
import { styled } from 'linaria/react'
import { useDrag, useDrop } from 'react-dnd'
import Text from '../atoms/Text'
import update from 'immutability-helper'
import { store } from '../../stores/store'
import type { Identifier, XYCoord } from 'dnd-core'
import { DragItem, ItemT } from '../../types'

type Props = {
    isDragging: boolean
}

const WordContainer = styled.div<Props>`
    background: #fff;
    border: 1px solid #949494;
    border-radius: 12px;
    cursor: grab;
    margin: 5px;
    user-select: none;

    opacity: ${(props) => (props.isDragging ? 0.5 : 1)};
`

interface WordProps {
    id: number
    text: string
    index: number
    group?: 'start' | 'target'
}

const Word: React.FC<WordProps> = ({ id, text, index, group }) => {
    const ref = useRef<HTMLDivElement>(null)

    const moveWord = useCallback((dragIndex: number, hoverIndex: number) => {
        store.setTargetWords(
            update(store.targetWords, {
                $splice: [
                    [dragIndex, 1],
                    [hoverIndex, 0, store.targetWords[dragIndex] as ItemT],
                ],
            })
        )
    }, [])

    const [{ handlerId }, drop] = useDrop<DragItem, void, { handlerId: Identifier | null }>({
        accept: 'word',
        collect: (monitor) => {
            return {
                handlerId: monitor.getHandlerId(),
            }
        },
        hover: (item: DragItem, monitor) => {
            if (group === 'target' && item.group === 'target') {
                if (!ref.current) {
                    return
                }
                const dragIndex = item.index
                const hoverIndex = index

                if (dragIndex === hoverIndex) {
                    return
                }

                const hoverBoundingRect = ref.current?.getBoundingClientRect()
                const hoverMiddleX = (hoverBoundingRect.right - hoverBoundingRect.left) / 2
                const clientOffset = monitor.getClientOffset()
                const hoverClientX = (clientOffset as XYCoord).x - hoverBoundingRect.left

                if (dragIndex < hoverIndex && hoverClientX < hoverMiddleX) {
                    return
                }

                if (dragIndex > hoverIndex && hoverClientX > hoverMiddleX) {
                    return
                }

                moveWord(dragIndex, hoverIndex)
                item.index = hoverIndex
            }
        },
    })

    const [{ isDragging }, drag] = useDrag({
        type: 'word',
        item: () => {
            return { id, index, group }
        },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    })

    drag(drop(ref))
    return (
        <WordContainer ref={ref} isDragging={isDragging} data-handler-id={handlerId}>
            <Text text={text} />
        </WordContainer>
    )
}

export default Word
