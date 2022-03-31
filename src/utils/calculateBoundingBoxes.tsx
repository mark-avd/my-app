import React from 'react'
import { DOMRectsObject, AnimateWordsChild } from '../types'

const calculateBoundingBoxes = (children: AnimateWordsChild[] ) => {
    const boundingBoxes: DOMRectsObject = {}
    React.Children.map(children, (child) => {
        const domNode: HTMLDivElement | null | undefined = child.ref?.current
        if (domNode && child.key) {
            boundingBoxes[child.key] = domNode.getBoundingClientRect()
        }
    })

    return boundingBoxes
}

export default calculateBoundingBoxes
