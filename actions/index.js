import * as helpers from '../utils/helpers'

export const CREATE_DECK = 'CREATE_DECK'
export const FETCH_DECK_LIST = 'FETCH_DECK_LIST'
export const ADD_CARD_TO_DECK = 'ADD_CARD_TO_DECK'
export const START_QUIZ_SESSION = 'START_QUIZ_SESSION'
export const GET_NEXT_QUESTION = 'GET_NEXT_QUESTION'
export const FINISH_SESSION = 'FINISH_SESSION'

export function createDeck(title, callback) {
    const newDeck = helpers.saveDeckTitle(title)
        .then(data => {
            callback
            return data
        })
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

export function addCardToDeck(deckId, card) {
    const deck = helpers.addCardToDeck(deckId, card)

    return {
        type: ADD_CARD_TO_DECK,
        payload: deck
    }
}

export function startQuizSession(deckId) {
    const quizSession = helpers.startQuizSession(deckId)
    
    return {
        type: START_QUIZ_SESSION,
        payload: quizSession
    }
}

export function getNextQuestion(newStats) {
    return {
        type: GET_NEXT_QUESTION,
        payload: newStats
    }
}

export function finishQuizSession(state) {
    const finishedState = helpers.setFinishedState(state)
    
    return {
        type: FINISH_SESSION,
        payload: finishedState
    }
}

