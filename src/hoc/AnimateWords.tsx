import React, { useEffect, useLayoutEffect, useState } from 'react'
import usePrevious from '../hooks/usePrevious'
import calculateBoundingBoxes from '../services/calculateBoundingBoxes'
import { DOMRectsObject } from '../types'

interface AnimateWordsProps {
    ({ children }: { children: any }): React.ReactElement
}

const AnimateWords: AnimateWordsProps = ({ children }) => {
    const [boundingBox, setBoundingBox] = useState<DOMRectsObject>({})
    const [prevBoundingBox, setPrevBoundingBox] = useState<DOMRectsObject>({})
    const prevChildren = usePrevious(children)

    useLayoutEffect(() => {
        setBoundingBox(calculateBoundingBoxes(children))
    }, [children])

    useLayoutEffect(() => {
        if (prevChildren) {
            setPrevBoundingBox(calculateBoundingBoxes(prevChildren))
        }
    }, [prevChildren])

    useEffect(() => {
        const hasPrevBoundingBox = Object.keys(prevBoundingBox).length

        React.Children.map(children, (child) => {
            if (hasPrevBoundingBox) {
                const domNode: HTMLDivElement | null = child.ref.current
                const firstBox = prevBoundingBox[child.key]
                const lastBox = boundingBox[child.key]

                if (firstBox && lastBox) {
                    const changeInX = firstBox.left - lastBox.left
                    const changeInY = firstBox.bottom - lastBox.bottom

                    if (changeInX !== 0 || changeInY !== 0) {
                        requestAnimationFrame(() => {
                            if (domNode) {
                                domNode.style.transform = `translate(${changeInX}px, ${changeInY}px)`
                                domNode.style.transition = 'transform 0s'

                                requestAnimationFrame(() => {
                                    domNode.style.transform = ''
                                    domNode.style.transition = 'transform 500ms'
                                })
                            }
                        })
                    }
                }
            }
        })
    }, [boundingBox, prevBoundingBox, children])
    return children
}

export default AnimateWords
