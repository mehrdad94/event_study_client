import events from './events'

import {
    CREATE_EVENT,
    UPDATE_EVENT,
    DELETE_EVENT,
    SELECT_EVENT,
    DESELECT_EVENT
} from '../ActionTypes'

describe('events reducer', function () {
    let initialState

    beforeEach(() => {
        initialState = {
            events: {},
            activeEvents: {}
        }
    })

    it('should handle initial state', () => {
        const initialState = undefined
        const action = {
            payload: {}
        }

        const result = {
            events: {},
            activeEvents: {}
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
            activeEvents: {
                [stockKey]: {
                    [event.key]: event
                }
            }
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
            activeEvents: {}
        }

        expect(events(initialState, action)).toEqual(result)
    })

    it('should delete an event', function () {
        const event = { key: '1', name: 'name' }
        const stockKey = '1234'

        initialState['events'] = {
            [stockKey]: [event]
        }

        initialState['activeEvents'] = {
            [stockKey]: {
                [event.key]: event
            }
        }

        const action = { type: DELETE_EVENT, payload: { key: event.key, stockKey } }

        const result = {
            events: {
                [stockKey]: []
            },
            activeEvents: {
                [stockKey]: {}
            }
        }

        expect(events(initialState, action)).toEqual(result)
    })

    it('should select two events', function () {
        const stockKey = '1234'
        const event = { key: '1', name: 'name' }
        const event2 = { key: '2', name: 'another name' }

        const action = {
            type: SELECT_EVENT,
            payload: {
                event,
                stockKey
            }
        }
        const action2 = {
            type: SELECT_EVENT,
            payload: {
                event: event2,
                stockKey
            }
        }

        const result = {
            events: {},
            activeEvents: {
                [stockKey]: {
                    [event.key]: event,
                    [event2.key]: event2
                }
            }
        }

        const firstState = events(initialState, action)

        expect(events(firstState, action2)).toEqual(result)
    });

    it('should deselect an event', function () {
        const stockKey = '1234'
        const event = { key: '1', name: 'name' }

        initialState['activeEvents'] = {
            [stockKey]: {
                [event.key]: event
            }
        }

        const action = {
            type: DESELECT_EVENT,
            payload: {
                event,
                stockKey
            }
        }

        const result = {
            events: {},
            activeEvents: {
                [stockKey]: {}
            }
        }

        expect(events(initialState, action)).toEqual(result)
    });
});
