import { makeAutoObservable, runInAction } from 'mobx'
import { makeArrayWithIds, shuffleArray } from '../services/utils'
import { fetchGraphQL } from '../services/api'
import { ItemT, SentenceObject } from '../types'

class Store {
    sentences: SentenceObject[] = []
    currentSentence: SentenceObject = { ru: '', en: '' }
    sentenceToCheck: string | undefined
    words: ItemT[] = []
    targetWords: ItemT[] = []

    responseStatus: 'pending' | 'done' | 'error' | null = null
    error: unknown

    constructor() {
        makeAutoObservable(this)
        runInAction(() => this.fetchSentences().then(() => this.setCurrenSentence())).then(() => this.setStartWords())
    }

    setCurrenSentence() {
        const randomSentenceIndex = Math.floor(Math.random() * this.sentences.length)
        this.currentSentence = this.sentences[randomSentenceIndex]
    }

    setTargetWords(wordsArray: ItemT[]) {
        this.targetWords = wordsArray
    }

    setWords(wordsArray: ItemT[]) {
        this.words = wordsArray
    }

    setStartWords() {
        const words = this.currentSentence.en.split(' ')
        const wordsArray = makeArrayWithIds(shuffleArray(words))
        this.setWords(wordsArray)
    }

    setSentenceToCheck() {
        this.sentenceToCheck = store.targetWords.map((word) => word.text).join(' ')
    }

    setSentences(sentences: SentenceObject[]) {
        this.sentences = sentences
    }

    async fetchSentences() {
        this.responseStatus = 'pending'

        try {
            const response = await fetchGraphQL()
            runInAction(() => {
                this.sentences = response.data.sentenceAll
                this.responseStatus = 'done'
            })
        } catch (error: unknown) {
            runInAction(() => {
                this.error = error
                this.responseStatus = 'error'
            })
        }
    }
}

export const store = new Store()
