import { makeAutoObservable, runInAction } from 'mobx'
import { makeOrderedArray, shuffleArray } from '../services/utils'
import { fetchGraphQL } from '../services/api'
import { SentenceObject } from '../types'

class Store {
    sentences: SentenceObject[] = []
    currentSentence: SentenceObject | undefined
    sentenceToCheck: string | undefined

    responseStatus: string | undefined
    error: any

    constructor() {
        makeAutoObservable(this)
        runInAction(() => this.fetchSentences().then(() => this.setCurrenSentence())).then()
    }

    get orderedArray() {
        if (this.currentSentence) {
            const wordsArray = this.currentSentence.en.split(' ')
            return makeOrderedArray(shuffleArray(wordsArray))
        }
    }

    setCurrenSentence() {
        const randomSentenceIndex = Math.floor(Math.random() * this.sentences.length)
        this.currentSentence = this.sentences[randomSentenceIndex]
    }

    setSentences(sentences: SentenceObject[]) {
        this.sentences = sentences
    }

    setSentenceToCheck(sentence: string) {
        this.sentenceToCheck = sentence
    }

    async fetchSentences() {
        this.responseStatus = 'pending'

        try {
            const response = await fetchGraphQL()
            runInAction(() => {
                this.sentences = response.data.sentenceAll
                this.responseStatus = 'done'
            })
        } catch (error: any) {
            runInAction(() => {
                this.error = error
                this.responseStatus = 'error'
            })
        }
    }
}

export const store = new Store()
