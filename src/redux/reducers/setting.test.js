import setting from './setting'
import {
    SET_DATE_COLUMN,
    SET_OPERATION_COLUMN,
    SET_ALPHAVANTAGE_TOKEN,
    SET_ADJUSTMENT_RULE,
    SET_T0T1,
    SET_T1E,
    SET_ET2,
    SET_T2T3,
    SET_DEFAULT_EVENT_DATE_FORMAT,
    RESET_SETTING_DEFAULTS
} from '../ActionTypes'

describe('should test setting reducer', function () {
    it('should reset settings defaults', function () {
        const initialState = { alphavantageToken: 'something' }

        const action = { type: RESET_SETTING_DEFAULTS }

        expect(setting(initialState, action).alphavantageToken).toEqual('' )
    })

    it('should set date field', function () {
        const initialState = {}

        const dateColumn = 'Date'

        const action = { type: SET_DATE_COLUMN, dateColumn }

        expect(setting(initialState, action)).toEqual({ dateColumn })
    })

    it('should set operation field', function () {
        const initialState = {}

        const operationColumn = 'Close'

        const action = { type: SET_OPERATION_COLUMN, operationColumn }

        expect(setting(initialState, action)).toEqual({ operationColumn })
    })

    it('should set alphavantage token', function () {
        const initialState = {}

        const token = 'token'

        const action = { type: SET_ALPHAVANTAGE_TOKEN, token }

        expect(setting(initialState, action)).toEqual({
            alphavantageToken: token
        })
    })
    it('should set adjustmentRule', function () {
        const initialState = {}

        const adjustmentRule = 'SKIP'

        const action = { type: SET_ADJUSTMENT_RULE, value: adjustmentRule }

        expect(setting(initialState, action)).toEqual({ adjustmentRule })
    })

    it('should set T0T1', function () {
        const initialState = {}

        const T0T1 = 5

        const action = { type: SET_T0T1, value: T0T1 }

        expect(setting(initialState, action)).toEqual({ T0T1 })
    })

    it('should set T1E', function () {
        const initialState = {}

        const T1E = 5

        const action = { type: SET_T1E, value: T1E }

        expect(setting(initialState, action)).toEqual({ T1E })
    })

    it('should set ET2', function () {
        const initialState = {}

        const ET2 = 5

        const action = { type: SET_ET2, value: ET2 }

        expect(setting(initialState, action)).toEqual({ ET2 })
    })

    it('should set T2T3', function () {
        const initialState = {}

        const T2T3 = 5

        const action = { type: SET_T2T3, value: T2T3 }

        expect(setting(initialState, action)).toEqual({ T2T3 })
    })

    it('should set default event date format', function () {
        const initialState = {}

        const defaultEventDateFormat = 'yyyy-mm-dd'

        const action = { type: SET_DEFAULT_EVENT_DATE_FORMAT, value: defaultEventDateFormat }

        expect(setting(initialState, action)).toEqual({ defaultEventDateFormat })
    })
})
