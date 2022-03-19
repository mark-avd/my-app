import React, { useCallback } from 'react'
import { styled } from 'linaria/react'
import { useDrop } from 'react-dnd'
import update from 'immutability-helper'
import { sortById } from '../../services/sortById'
import { store } from '../../stores/store'
import { DragItem } from '../../types'

interface CloudProps {
    group: 'start' | 'target'
}

const CloudContainer = styled.div`
    align-content: flex-start;
    border-top: 1px solid #030303;
    display: flex;
    flex-wrap: wrap;
    min-height: 100px;
    padding-top: 6px;
`

const Cloud: React.FC<CloudProps> = ({ group, children }) => {
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
            if (group === 'target' && item.group === 'start') {
                moveWordToTargetGroup(dragIndex)
            }
            if (group === 'start' && item.group === 'target') {
                moveWordToStartGroup(dragIndex)
                setTimeout(() => store.setStartWords([...store.startWords].sort(sortById)), 500)
            }
        },
    })
    return <CloudContainer ref={drop}>{children}</CloudContainer>
}

export default Cloud
