type Languages = 'ru' | 'en'

export interface TextProps {
    text: string
}

export type ItemT = {
    id: number
    text: string
}

export interface DragItem {
    id: number
    type: string
    index: number
    group?: 'start' | 'target'
}

export type SentenceObject = {
    [key in Languages]: string
}

export interface SentenceAllResponse {
    data: {
        sentenceAll: SentenceObject[]
    }
}
