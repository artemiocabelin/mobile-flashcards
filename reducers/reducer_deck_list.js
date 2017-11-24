import { FETCH_DECK_LIST, CREATE_DECK, ADD_CARD_TO_DECK } from '../actions/actions_deck'

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

        case ADD_CARD_TO_DECK :
            return {
                ...state,
                [action.payload.title] : action.payload
            }

        default :
            return state
    }
}
