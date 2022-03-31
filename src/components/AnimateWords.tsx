import React, { useEffect, useLayoutEffect, useState } from 'react'
import usePrevious from '../hooks/usePrevious'
import calculateBoundingBoxes from '../utils/calculateBoundingBoxes'
import { AnimateWordsChild, DOMRectsObject } from '../types'

interface AnimateWordsProps {
    children: AnimateWordsChild[]
}

const AnimateWords: React.FC<AnimateWordsProps> = ({ children }) => {
    const prevChildren = usePrevious(children)
    const [boundingBox, setBoundingBox] = useState<DOMRectsObject>({})
    const [prevBoundingBox, setPrevBoundingBox] = useState<DOMRectsObject>({})

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

        React.Children.map(children, (child: AnimateWordsChild) => {
            if (hasPrevBoundingBox && child.key) {
                const domNode: HTMLDivElement | null | undefined = child.ref?.current
                const firstBox = prevBoundingBox[child.key]
                const lastBox = boundingBox[child.key]

                if (firstBox && lastBox) {
                    const changeInX = firstBox.left - lastBox.left
                    const changeInY = firstBox.bottom - lastBox.bottom

                    if (changeInX !== 0 || changeInY !== 0) {
                        requestAnimationFrame(() => {
                            if (domNode) {
                                domNode.style.transform = `translate3d(${changeInX}px, ${changeInY}px, 0)`
                                domNode.style.transition = 'transform 0ms'

                                requestAnimationFrame(() => {
                                    domNode.style.transform = 'translate3d(0, 0, 0)'
                                    domNode.style.transition = 'transform 250ms'
                                })
                            }
                        })
                    }
                }
            }
        })
    }, [boundingBox, prevBoundingBox, children])
    return <>{children}</>
}

export default AnimateWords
