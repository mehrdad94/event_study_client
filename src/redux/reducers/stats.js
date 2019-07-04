import {
    SET_STATS
} from '../ActionTypes'

export default function stats (state = {}, action) {
    if (action.type === SET_STATS) {
        return {
            ...state,
            [action.payload.stockKey]: action.payload.stats
        }
    } else {
        return state
    }
}
