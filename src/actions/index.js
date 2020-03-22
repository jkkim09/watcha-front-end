import * as type from './ActonType';

export function setValue(value) {
    return {
        type: type.SET_VALUE,
        value: value
    }
}

export function gameState(value) {
    return {
        type: type.GAME_STATE,
        value: value
    }
}

export function setScore(value) {
    return {
        type: type.SCORE,
        value: value
    }
}