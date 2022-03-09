import { ItemT } from '../types'

export const shuffleArray = (array: string[]): string[] => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1))
        ;[array[i], array[j]] = [array[j], array[i]]
    }
    return array
}

export const makeArrayWithIds = (wordsArray: string[]): ItemT[] => {
    const arrayWithIds: ItemT[] = []
    wordsArray.map((word, index) => {
        arrayWithIds.push({ id: index, text: word })
    })
    return arrayWithIds
}

export const sortByOrder = (wordA: ItemT, wordB: ItemT): number => {
    if (wordA.id > wordB.id) {
        return 1
    }
    if (wordA.id < wordB.id) {
        return -1
    }
    return 0
}
