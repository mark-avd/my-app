import { ItemT } from '../types'

export const makeArrayWithIds = (wordsArray: string[]): ItemT[] => {
    const arrayWithIds: ItemT[] = []
    wordsArray.map((word, index) => {
        arrayWithIds.push({ id: index, text: word })
    })
    return arrayWithIds
}
