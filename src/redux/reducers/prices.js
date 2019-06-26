import {
    SET_PRICES
} from '../ActionTypes'

export default function prices (state = [], action) {
    if (action.type === SET_PRICES) {
        return [
            ...action.prices
        ]
    } else {
        return state
    }
}