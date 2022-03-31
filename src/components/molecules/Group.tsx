import React, { useCallback } from 'react'
import { styled } from 'linaria/react'
import { useDrop } from 'react-dnd'
import update from 'immutability-helper'
import { store } from '../../stores/store'
import { DragItem } from '../../types'

interface CloudProps {
    type: 'start' | 'target'
}

const GroupContainer = styled.div`
    align-content: flex-start;
    border-top: 1px solid #030303;
    display: flex;
    flex-wrap: wrap;
    min-height: 110px;
    padding: 6px;
`

const Group: React.FC<CloudProps> = ({ type, children }) => {
    const moveWordToTargetGroup = useCallback((dragIndex: number) => {
        store.setTargetWords(
            update(store.targetWords, {
                $push: [store.startWords[dragIndex]],
            })
        )
        store.setStartWords(
            update(store.startWords, {
                $splice: [[dragIndex, 1]],
            })
        )
    }, [])

    const moveWordToStartGroup = useCallback((dragIndex: number) => {
        store.setStartWords(
            update(store.startWords, {
                $push: [store.targetWords[dragIndex]],
            })
        )
        store.setTargetWords(
            update(store.targetWords, {
                $splice: [[dragIndex, 1]],
            })
        )
    }, [])

    const [, drop] = useDrop<DragItem, void>({
        accept: 'word',
        drop: (item) => {
            const dragIndex = item.index
            if (type === 'target' && item.group === 'start') {
                moveWordToTargetGroup(dragIndex)
            }
            if (type === 'start' && item.group === 'target') {
                moveWordToStartGroup(dragIndex)
                setTimeout(() => store.sortStartWords(), 500)
            }
        },
    })
    return <GroupContainer ref={drop}>{children}</GroupContainer>
}

export default Group
