import { START_QUIZ_SESSION, GET_NEXT_QUESTION, FINISH_SESSION } from '../actions/actions_card'

export default function quizSession (state = {}, action) {
    switch (action.type) {

        case START_QUIZ_SESSION :
            return {
                ...action.payload
            }

        case GET_NEXT_QUESTION :
            return {
                ...state,
                ['state'] : action.payload
            }

        case FINISH_SESSION :
            return {
                ...state,
                ['state'] : action.payload
            }

        default :
            return state
    }
}