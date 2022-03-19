import React from 'react'
import { DOMRectsObject } from '../types'

interface Props {
    ref: React.RefObject<HTMLDivElement>
    key: string
    children: React.ReactNode
}

const calculateBoundingBoxes = (children: Props) => {
    const boundingBoxes: DOMRectsObject = {}
    React.Children.map(children, (child) => {
        const domNode = child.ref.current
        if (domNode) {
            boundingBoxes[child.key] = domNode.getBoundingClientRect()
        }
    })

    return boundingBoxes
}

export default calculateBoundingBoxes
