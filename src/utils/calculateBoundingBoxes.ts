import React from 'react'
import { DOMRectsObject } from '../types'

//TODO типизировать
const calculateBoundingBoxes = (children: any) => {
    const boundingBoxes: DOMRectsObject = {}
    React.Children.map(children, (child) => {
        const domNode = child.ref.current
        boundingBoxes[child.key] = domNode.getBoundingClientRect()
    })

    return boundingBoxes
}

export default calculateBoundingBoxes