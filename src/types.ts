type Languages = 'ru' | 'en'

export interface TextProps {
    text: string
}

export type ItemT = {
    text: string
    id: number
}

export type SentenceObject = {
    [key in Languages]: string
}

export interface SentenceAllResponse {
    data: {
        sentenceAll: SentenceObject[]
    }
}

// export type DragDropItemT = {
//     index: number
//     order: number
//     type: string
// }

// export type GroupT = {
//     id: 'startGroup' | 'targetGroup'
//     words: OrderedArrayItemT[] | []
// }

// export type DragItemT = {
//     groupIndex: number
//     itemIndex: number | undefined
// }
