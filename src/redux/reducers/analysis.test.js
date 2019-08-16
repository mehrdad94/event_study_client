import analysis from './analysis'

import {
    CREATE_ANALYSIS,
    UPDATE_ANALYSIS,
    DELETE_ANALYSIS,
    DELETE_STOCK,
    DELETE_EVENT
} from '../ActionTypes'

describe('should test anylsis reducer', function () {
    it('should set analysis information', function () {
        const initialState = {
            analysis: {}
        }

        const analyseData = { key: '1', name: 'name' }
        const stockKey = '1234'
        const eventKey = '123'

        const action = { type: CREATE_ANALYSIS, payload: { analysis: analyseData, stockKey, eventKey } }

        const result = {
            analysis: {
                [stockKey]: {
                    [eventKey]: analyseData
                }
            }
        }

        expect(analysis(initialState, action)).toEqual(result)
    })

    it('should update an analysis', function () {
        const analyseData = { key: '1', name: 'name' }
        const stockKey = '1234'
        const eventKey = '123'

        const initialState = {
            analysis: {
                [stockKey]: {
                    [eventKey]: { name: '' }
                }
            }
        }

        const action = { type: UPDATE_ANALYSIS, payload: { analysis: analyseData, stockKey, eventKey } }

        const result = {
            analysis: {
                [stockKey]: {
                    [eventKey]: analyseData
                }
            }
        }

        expect(analysis(initialState, action)).toEqual(result)
    })

    it('should delete an analysis', function () {
        const stockKey = '1234'
        const eventKey = '123'

        const initialState = {
            analysis: {
                [stockKey]: {
                    [eventKey]: { name: '' }
                }
            }
        }

        const action = { type: DELETE_ANALYSIS, payload: { stockKey, eventKey } }

        const result = {
            analysis: {
                [stockKey]: {}
            }
        }
        expect(analysis(initialState, action)).toEqual(result)
    })

    it('should delete whole stock children', function () {
        const key = '1234'

        const initialState = {
            analysis: {
                [key]: {}
            }
        }

        const result = {
            analysis: {}
        }

        const action = { type: DELETE_STOCK, key }

        expect(analysis(initialState, action)).toEqual(result)
    })

    it('should delete an analysis related to an event', function () {
        const eventKey = '12'
        const stockKey = '1234'

        const initialState = {
            analysis: {
                [stockKey]: {
                    [eventKey]: {
                    }
                }
            }
        }

        const result = {
            analysis: {
                [stockKey]: {}
            }
        }

        const action = { type: DELETE_EVENT, payload: { key: eventKey, stockKey } }

        expect(analysis(initialState, action)).toEqual(result)
    })
})
