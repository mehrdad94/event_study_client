import update from 'immutability-helper'

import {
    CREATE_EVENT,
    UPDATE_EVENT,
    DELETE_EVENT,
    SELECT_EVENT,
    DESELECT_EVENT, DELETE_STOCK
} from '../ActionTypes'

const initialState = {
    events: {},
    activeEvents: {}
}

export default function events (state = initialState, action) {
    switch (action.type) {
        case CREATE_EVENT: {
            if (!state.events[action.payload.stockKey]) state.events[action.payload.stockKey] = []
            if (!state.activeEvents[action.payload.stockKey]) state.activeEvents[action.payload.stockKey] = {}

            return {
                ...state,
                events: update(state.events, {[action.payload.stockKey]: { $push: [action.payload.event] }}),
                activeEvents: update(state.activeEvents, {[action.payload.stockKey]: { [action.payload.event.key]: {$set: action.payload.event.key } }})
            }
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
        case DELETE_EVENT: {
            const eventIndex = state.events[action.payload.stockKey].findIndex(event => event.key === action.payload.key)

            const events = update(state.events, { [action.payload.stockKey]: { $splice: [[eventIndex, 1]] } })
            const activeEvents = update(state.activeEvents, { [action.payload.stockKey ]: { $unset: [action.payload.key] }})

            return {
                ...state,
                events,
                activeEvents
            }
        }
        case SELECT_EVENT: {
            if (!state.activeEvents[action.payload.stockKey]) state.activeEvents[action.payload.stockKey] = {}
            const activeEvents = update(state.activeEvents, { [action.payload.stockKey ]: { [action.payload.event.key]: { $set: action.payload.event.key } } })
            return {
                ...state,
                activeEvents
            }
        }
        case DESELECT_EVENT: {
            const activeEvents = update(state.activeEvents, { [action.payload.stockKey ]: { $unset: [action.payload.event.key] } })
            return {
                ...state,
                activeEvents
            }
        }
        case DELETE_STOCK: {
            const events = update(state.events, { $unset: [action.key] })
            const activeEvents = update(state.activeEvents, { $unset: [action.key] })

            return {
                ...state,
                events,
                activeEvents
            }
        }
        default:
            return state
    }
}
