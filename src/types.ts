export interface TextInterface {
    text: string
}

export type SentenceIndexT = {
    sentenceIndex: number
}

export type OrderedArrayItemT = {
    text: string
    id: number
    order: number
}

export interface CloudInterface {
    id: number
    words: OrderedArrayItemT[] | undefined
}


