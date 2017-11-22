import React from 'react'
import { AsyncStorage } from 'react-native'

export function getDecks() {
    return AsyncStorage.getAllKeys().then(keys => {
        return AsyncStorage.multiGet(keys).then(decks => {
            let deckList = {}
            
            decks.map(deck => {
                let key = deck[0]
                let value = JSON.parse(deck[1])
                deckList[key] = value
            })
            return deckList
        })
    })
}

export function saveDeckTitle(title) {
    const deckValue = {
        title,
        questions: []
    }
    AsyncStorage.setItem(title, JSON.stringify(deckValue))

    return { [title] : deckValue }
}

export function addCardToDeck(deckId, card) {
    return AsyncStorage.getItem(deckId)
        .then(JSON.parse)
        .then(deck => {
            deck.questions.push(card)
            AsyncStorage.mergeItem(deckId, JSON.stringify(deck))
            return deck
        })
}

export function startQuizSession(deckId) {
    let initialQuizSettings = {
        state: {
            activeQuestionIndex: 0,
            correctAns: 0,
            incorrectAns: 0,
            finished: false,
            percentage: 0
        }
    }

    return AsyncStorage.getItem(deckId)
        .then(JSON.parse)
        .then(deck => {
            return Object.assign({}, deck, initialQuizSettings)
        })
}

export function getNewState(state, score, idx) {
    let newState = {...state}
    newState.activeQuestionIndex = idx
    if(score === 'correct') {
        newState.correctAns ++
    } else if (score === 'incorrect') {
        newState.incorrectAns ++
    }
    return newState
}

export function setFinishedState(state) {
    let newState = {...state}
    newState.finished = true
    newState.percentage = Math.floor((newState.correctAns / (newState.correctAns + newState.incorrectAns)) * 100)
    return newState
}