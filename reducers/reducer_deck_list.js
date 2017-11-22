import { FETCH_DECK_LIST, CREATE_DECK } from '../actions'

export default function decks (state = {}, action) {
    switch (action.type) {

        case CREATE_DECK :
            return {
                ...state,
                ...action.payload
            }
        case FETCH_DECK_LIST :
            return {
                ...action.payload
            }

        default :
            return state
    }
}
