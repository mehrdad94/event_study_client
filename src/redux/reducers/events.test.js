import events from './events'

import {
    CREATE_EVENT,
    UPDATE_EVENT,
    DELETE_EVENT
} from '../ActionTypes'

it('should handle initial state', () => {
    const initialState = undefined
    const action = {}
    const result = {}

    expect(events(initialState, action)).toEqual(result)
})

it('should add an event', function () {
    const initialState = {}
    const stockKey = '1234'
    const event = { key: '1', name: 'name' }
    const action = { type: CREATE_EVENT, payload: { event, stockKey } }
    const result = {
        [stockKey]: [event]
    }

    expect(events(initialState, action)).toEqual(result)
})

it('should update an event', function () {
    const oldEvent = { key: '1', name: 'name' }
    const newEvent = { key: '1', name: 'new name' }
    const stockKey = '1234'
    const initialState = {
        [stockKey]: [oldEvent]
    }
    const action = { type: UPDATE_EVENT, payload: { event: newEvent, stockKey }}
    const result = {
        [stockKey]: [newEvent]
    }

    expect(events(initialState, action)).toEqual(result)
})

it('should delete a event', function () {
    const event = { key: '1', name: 'name' }
    const stockKey = '1234'
    const initialState = {
        [stockKey]: [event]
    }
    const action = { type: DELETE_EVENT, payload: { key: event.key, stockKey } }
    const result = {
        [stockKey]: []
    }

    expect(events(initialState, action)).toEqual(result)
})
