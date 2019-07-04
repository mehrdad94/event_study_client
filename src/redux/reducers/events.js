import {
    CREATE_EVENT,
    UPDATE_EVENT,
    DELETE_EVENT
} from '../ActionTypes'

export default function events (state = {}, action) {
    switch (action.type) {
        case CREATE_EVENT:
            return {
                ...state,
                [action.payload.stockKey]: [action.payload.event, ...(state[action.payload.stockKey] || [])],
            }
        case UPDATE_EVENT:
            return {
                ...state,
                [action.payload.stockKey]: state[action.payload.stockKey].map(event => {
                    if (event.key !== action.payload.event.key) return event
                    else return {
                        ...event,
                        ...action.payload.event
                    }
                })
            }
        case DELETE_EVENT:
            return {
                ...state,
                [action.payload.stockKey]: state[action.payload.stockKey].filter(event => event.key !== action.payload.key)
            }
        default:
            return state
    }
}
