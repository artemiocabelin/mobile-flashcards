import * as helpers from '../utils/helpers'

export const CREATE_DECK = 'CREATE_DECK'
export const FETCH_DECK_LIST = 'FETCH_DECK_LIST'

export function createDeck(title) {
    const newDeck = helpers.saveDeckTitle(title)
    return {
        type: CREATE_DECK,
        payload: newDeck
    }
}


export function fetchDeckList() {
    const deckList = helpers.getDecks()
    return {
        type: FETCH_DECK_LIST,
        payload: deckList
    }
}
