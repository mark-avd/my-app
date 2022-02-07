export type TextT = {
    text: string
}

export type OrderedArrayItemT = {
    text: string
    order: number
}

export interface CloudInterface {
    id: string
    words: OrderedArrayItemT[] | undefined
}

export type DragItemT = {
    groupIndex: number
    itemIndex: number | undefined
}

enum Languages {
    russian = 'ru',
    english = 'en',
}

export type SentenceObject = {
    [key in Languages]: string
}

export interface SentenceAllResponse {
    data: {
        sentenceAll: SentenceObject[]
    }
}
