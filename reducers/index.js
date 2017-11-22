import { combineReducers } from 'redux';
import DeckListReducer from './reducer_deck_list';
import QuizCardReducer from './reducer_card_quiz';

const rootReducer = combineReducers({
    decks: DeckListReducer,
    quiz: QuizCardReducer,
});

export default rootReducer;