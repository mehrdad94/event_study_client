import {
    CREATE_EVENT,
    UPDATE_EVENT,
    DELETE_EVENT
} from '../ActionTypes'

export default function events (state = [], action) {
    switch (action.type) {
        case CREATE_EVENT:
            return [
                action.event,
                ...state
            ]
        case UPDATE_EVENT:
            return state.map(event => {
                if (event.key !== action.event.key) return event
                else return {
                    ...event,
                    ...action.event.payload
                }
            })
        case DELETE_EVENT:
            return state.filter(event => event.key !== action.key)
        default:
            return state
    }
}
