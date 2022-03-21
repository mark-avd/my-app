import { ItemT } from '../types'

export const sortById = (wordA: ItemT, wordB: ItemT): number => {
    if (wordA.id > wordB.id) {
        return 1
    }
    if (wordA.id < wordB.id) {
        return -1
    }
    return 0
}
