import React from 'react'
import { AsyncStorage } from 'react-native'

export function getDecks() {

}

export function getDeck() {

}

export function saveDeckTitle(title) {
    const deckKey = title
    const deckValue = {
        title,
        questions: []
    }

    console.log(deckKey)
    console.log(deckValue)
    // AsyncStorage.setItem(deckKey, deckValue)
}

export function addCardToDeck() {

}