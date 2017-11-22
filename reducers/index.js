import { combineReducers } from 'redux';
import DeckListReducer from './reducer_deck_list';

const rootReducer = combineReducers({
    decks: DeckListReducer,
});

export default rootReducer;