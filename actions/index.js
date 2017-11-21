// import * as helpers from '../utils/helpers'

export const RECEIVE_ENTRIES = 'RECEIVE_ENTRIES'
export const ADD_ENTRY = 'ADD_ENTRY'

export const CREATE_DECK = 'CREATE_DECK'

export function receiveEntries (entries) {
    return {
        type: RECEIVE_ENTRIES,
        entries
    }
}
export function addEntry (entry) {
    return {
        type: ADD_ENTRY,
        entry
    }
}
// export function createDeck(title) {
//     helpers.saveDeckTitle
    
//     return {
//         type: CREATE_DECK,
//         entry
//     }
// }
