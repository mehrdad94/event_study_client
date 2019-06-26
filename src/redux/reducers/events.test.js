import events from './events'

import {
    CREATE_EVENT,
    UPDATE_EVENT,
    DELETE_EVENT
} from '../ActionTypes'

it('should handle initial state', () => {
    const initialState = undefined
    const action = {}
    const result = []

    expect(events(initialState, action)).toEqual(result)
})

it('should add a event', function () {
    const initialState = []
    const event = { key: '1', name: 'name' }
    const action = { type: CREATE_EVENT, event }
    const result = [event]

    expect(events(initialState, action)).toEqual(result)
})

it('should update a event', function () {
    const oldEvent = { key: '1', name: 'name' }
    const newEvent = { key: '1', name: 'new name' }
    const initialState = [oldEvent]
    const action = { type: UPDATE_EVENT, event: { key: '1', payload: newEvent } }
    const result = [newEvent]

    expect(events(initialState, action)).toEqual(result)
})

it('should delete a event', function () {
    const event = { key: '1', name: 'name' }
    const initialState = [event]
    const action = { type: DELETE_EVENT, key: event.key }
    const result = []

    expect(events(initialState, action)).toEqual(result)
})
