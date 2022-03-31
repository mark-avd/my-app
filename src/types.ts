import React from 'react'

type Languages = 'ru' | 'en'

export interface TextProps {
    text: string
}

export type ItemT = {
    id: number
    text: string
}

export type DragItem = {
    id: number
    index: number
    group?: 'start' | 'target'
}

export type SentenceObject = {
    [key in Languages]: string
}

export type DOMRectsObject = {
    [key: string]: DOMRect
}

export interface SentenceAllResponse {
    data: {
        sentenceAll: SentenceObject[]
    }
}

export interface AnimateWordsChild extends React.ReactElement {
    ref?: React.RefObject<HTMLDivElement>
}
