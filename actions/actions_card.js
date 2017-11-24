import * as helpers from '../utils/helpers'

export const START_QUIZ_SESSION = 'START_QUIZ_SESSION'
export const GET_NEXT_QUESTION = 'GET_NEXT_QUESTION'
export const FINISH_SESSION = 'FINISH_SESSION'

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