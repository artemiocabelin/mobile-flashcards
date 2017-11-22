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

export function getDeck() {

}

export function saveDeckTitle(title) {
    const deckValue = {
        title,
        questions: []
    }
    AsyncStorage.setItem(title, JSON.stringify(deckValue))

    return { [title] : deckValue }
}

export function addCardToDeck() {

}