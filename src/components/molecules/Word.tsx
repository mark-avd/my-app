import React, { useRef } from 'react'
import { styled } from 'linaria/react'
import { useDrag, useDrop } from 'react-dnd'
import Text from '../atoms/Text'
import type { Identifier, XYCoord } from 'dnd-core'

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
    moveWord: (dragIndex: number, hoverIndex: number) => void
}

interface DragItem {
    id: number
    type: string
    index: number
}

const Word: React.FC<WordProps> = ({ id, text, index, moveWord }) => {
    const ref = useRef<HTMLDivElement>(null)
    const [{ handlerId }, drop] = useDrop<DragItem, void, { handlerId: Identifier | null }>({
        accept: 'word',
        collect: (monitor) => {
            return {
                handlerId: monitor.getHandlerId(),
            }
        },
        hover: (item: DragItem, monitor) => {
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
        },
    })

    const [{ isDragging }, drag] = useDrag({
        type: 'word',
        item: () => {
            return { id, index }
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
