import {
    SET_STATS
} from '../ActionTypes'

export default function stats (state = {}, action) {
    if (action.type === SET_STATS) {
        return {
            ...action.stats
        }
    } else {
        return state
    }
}