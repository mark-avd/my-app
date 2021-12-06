import { OrderedArrayItemT } from '../types'

export const shuffleArray = (array: string[]): string[] => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1))
        ;[array[i], array[j]] = [array[j], array[i]]
    }
    return array
}

export const makeOrderedArray = (wordsArray: string[]): OrderedArrayItemT[] => {
    const orderedArray: OrderedArrayItemT[] = []
    wordsArray.map((word, index) => {
        orderedArray.push({text: word, id: index, order: index})
    })
    return orderedArray
}

export const sortWords = (wordA: OrderedArrayItemT, wordB: OrderedArrayItemT) => {
    if (wordA.order > wordB.order) {
        return 1
    }
    if (wordA.order < wordB.order) {
        return -1
    }
}
