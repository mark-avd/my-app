import { makeAutoObservable, runInAction } from 'mobx'
import { fetchGraphQL } from '../services/api'
import { makeArrayWithIds } from '../utils/makeArrayWithIds'
import { shuffleArray } from '../utils/shuffleArray'
import { sortById } from '../utils/sortById'
import { ItemT, SentenceObject } from '../types'

class Store {
    sentences: SentenceObject[] = []
    currentSentence: SentenceObject = { ru: '', en: '' }
    sentenceToCheck: string | undefined
    startWords: ItemT[] = []
    targetWords: ItemT[] = []

    responseStatus: 'pending' | 'done' | 'error' | null = null
    error: unknown

    constructor() {
        makeAutoObservable(this)
        runInAction(() => this.fetchSentences().then(() => this.setCurrenSentence())).then(() => this.makeStartWords())
    }

    setSentences(sentences: SentenceObject[]) {
        this.sentences = sentences
    }

    setCurrenSentence() {
        const randomSentenceIndex = Math.floor(Math.random() * this.sentences.length)
        this.currentSentence = this.sentences[randomSentenceIndex]
    }

    setTargetWords(wordsArray: ItemT[]) {
        this.targetWords = wordsArray
    }

    setStartWords(wordsArray: ItemT[]) {
        this.startWords = wordsArray
    }

    makeStartWords() {
        const words = this.currentSentence.en.split(' ')
        const wordsArray = makeArrayWithIds(shuffleArray(words))
        this.setStartWords(wordsArray)
    }

    sortStartWords() {
        this.setStartWords([...this.startWords].sort(sortById))
    }

    setSentenceToCheck() {
        this.sentenceToCheck = store.targetWords.map((word) => word.text).join(' ')
    }

    renderNewSentence() {
        this.setTargetWords([])
        this.setCurrenSentence()
        this.makeStartWords()
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
