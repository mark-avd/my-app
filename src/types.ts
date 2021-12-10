export type TextT = {
    text: string
}

export type SentenceIndexT = {
    sentenceIndex: number
}

export type OrderedArrayItemT = {
    text: string
    order: number
}

export interface CloudInterface {
    id: number
    words: OrderedArrayItemT[] | undefined
}

export type DragItemT = {
    groupIndex: number
    itemIndex: number
}
