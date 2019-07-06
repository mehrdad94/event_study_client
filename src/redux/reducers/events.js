import {
    CREATE_EVENT,
    UPDATE_EVENT,
    DELETE_EVENT,
    SELECT_EVENT
} from '../ActionTypes'

import { isObjectEmpty } from '../../lib/helper'

const initialState = {
    events: {},
    activeEvent: {}
}

export default function events (state = initialState, action) {
    switch (action.type) {
        case CREATE_EVENT:
            return {
                ...state,
                events: {
                    ...state.events,
                    [action.payload.stockKey]: [action.payload.event, ...(state.events[action.payload.stockKey] || [])],
                },
                activeEvent: isObjectEmpty(state.activeEvent) ? action.payload.event : state.activeEvent
            }
        case UPDATE_EVENT:
            return {
                ...state,
                events: {
                    ...state.events,
                    [action.payload.stockKey]: state.events[action.payload.stockKey].map(event => {
                        if (event.key !== action.payload.event.key) return event
                        else return {
                            ...event,
                            ...action.payload.event
                        }
                    })
                }
            }
        case DELETE_EVENT:
            return {
                ...state,
                events: {
                    ...state.events,
                    [action.payload.stockKey]: state.events[action.payload.stockKey].filter(event => event.key !== action.payload.key)
                },
                activeEvent: state.activeEvent.key === action.payload.key ? {} : state.activeEvent
            }
        case SELECT_EVENT:
            return {
                ...state,
                activeEvent: action.event
            }
        default:
            return state
    }
}
