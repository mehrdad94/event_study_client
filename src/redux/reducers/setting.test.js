import setting from './setting'
import {
    SET_DATE_FIELD,
    SET_OPERATION_FIELD,
    SET_TOT1,
    SET_T1E,
    SET_ET2,
    SET_T2T3
} from '../ActionTypes'


it('should set date field', function () {
    const initialState = {}

    const dateField = 'Date'

    const action = { type: SET_DATE_FIELD, dateField }

    expect(setting(initialState, action)).toEqual({ dateField })
})

it('should set operation field', function () {
    const initialState = {}

    const operationField = 'Close'

    const action = { type: SET_OPERATION_FIELD, operationField }

    expect(setting(initialState, action)).toEqual({ operationField })
})

it('should set TOT1', function () {
    const initialState = {}

    const TOT1 = 5

    const action = { type: SET_TOT1, TOT1 }

    expect(setting(initialState, action)).toEqual({ TOT1 })
})

it('should set T1E', function () {
    const initialState = {}

    const T1E = 5

    const action = { type: SET_T1E, T1E }

    expect(setting(initialState, action)).toEqual({ T1E })
})

it('should set ET2', function () {
    const initialState = {}

    const ET2 = 5

    const action = { type: SET_ET2, ET2 }

    expect(setting(initialState, action)).toEqual({ ET2 })
})

it('should set T2T3', function () {
    const initialState = {}

    const T2T3 = 5

    const action = { type: SET_T2T3, T2T3 }

    expect(setting(initialState, action)).toEqual({ T2T3 })
})
