import events from './events'

import {
    CREATE_EVENT,
    UPDATE_EVENT,
    DELETE_EVENT,
    SELECT_EVENT
} from '../ActionTypes'

describe('events reducer', function () {
    let initialState

    beforeEach(() => {
        initialState = {
            events: {},
            activeEvent: {}
        }
    })

    it('should handle initial state', () => {
        const initialState = undefined
        const action = {}

        const result = {
            events: {},
            activeEvent: {}
        }

        expect(events(initialState, action)).toEqual(result)
    })

    it('should add an event', function () {
        const stockKey = '1234'

        const event = { key: '1', name: 'name' }
        const action = { type: CREATE_EVENT, payload: { event, stockKey } }

        const result = {
            events: {
                [stockKey]: [event]
            },
            activeEvent: event
        }

        expect(events(initialState, action)).toEqual(result)
    })

    it('should update an event', function () {
        const oldEvent = { key: '1', name: 'name' }
        const newEvent = { key: '1', name: 'new name' }
        const stockKey = '1234'

        initialState['events'] = {
            [stockKey]: [oldEvent]
        }

        const action = { type: UPDATE_EVENT, payload: { event: newEvent, stockKey }}

        const result = {
            events: {
                [stockKey]: [newEvent]
            },
            activeEvent: {}
        }

        expect(events(initialState, action)).toEqual(result)
    })

    it('should delete an event', function () {
        const event = { key: '1', name: 'name' }
        const stockKey = '1234'

        initialState['events'] = {
            [stockKey]: [event]
        }

        initialState['activeEvent'] = event

        const action = { type: DELETE_EVENT, payload: { key: event.key, stockKey } }

        const result = {
            events: {
                [stockKey]: []
            },
            activeEvent: {}
        }

        expect(events(initialState, action)).toEqual(result)
    })

    it('should select an event', function () {
        const event = { key: '1', name: 'name' }

        const action = { type: SELECT_EVENT, event }

        const result = {
            events: {},
            activeEvent: event
        }

        expect(events(initialState, action)).toEqual(result)
    });
});
