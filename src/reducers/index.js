import * as type from '../actions/ActonType';
import { combineReducers } from 'redux';

const initSetValue = {
    game_number: 1,
    game_number_set: 1,
    time_number: 5,
    game_state: false
}

const initScore = {
    score: []
}

const setValue = (state = initSetValue, action) => {
    switch(action.type) {
        case type.SET_VALUE:
            return {
                game_number: action.value.game_number,
                game_number_set: action.value.game_number_set,
                time_number: action.value.time_number,
                game_state: state.game_state
            }
        case type.GAME_STATE:
            return {
                game_number: state.game_number,
                game_number_set: state.game_number_set,
                time_number: state.time_number,
                game_state: action.value.game_state
            }
        default:
            return state
    }
}

const setScore = (state = initScore, action) => {
    switch(action.type) {
        case type.SCORE:
            return {
                score: action.value
            }
        default:
            return state
        }
}

const appRedux = combineReducers({
    setValue,
    setScore
});

export default appRedux;