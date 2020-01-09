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

import {
    dateColumn,
    operationColumn,
    alphavantageToken,
    adjustmentRule,
    T0T1,
    T1E,
    ET2,
    T2T3,
    defaultEventDateFormat
} from '../../configs/constants'

const initialState = {
    dateColumn,
    operationColumn,
    alphavantageToken,
    adjustmentRule,
    T0T1,
    T1E,
    ET2,
    T2T3,
    defaultEventDateFormat
}

export default function setting (state = initialState, action) {
    switch (action.type) {
        case SET_DATE_COLUMN:
            return {
                ...state,
                dateColumn: action.dateColumn
            }
        case SET_OPERATION_COLUMN:
            return {
                ...state,
                operationColumn: action.operationColumn
            }
        case SET_ALPHAVANTAGE_TOKEN:
            return {
                ...state,
                alphavantageToken: action.token
            }
        case SET_ADJUSTMENT_RULE:
            return {
                ...state,
                adjustmentRule: action.value
            }
        case SET_T0T1:
            return {
                ...state,
                T0T1: action.value
            }
        case SET_T1E:
            return {
                ...state,
                T1E: action.value
            }
        case SET_ET2:
            return {
                ...state,
                ET2: action.value
            }
        case SET_T2T3:
            return {
                ...state,
                T2T3: action.value
            }
        case SET_DEFAULT_EVENT_DATE_FORMAT:
            return {
                ...state,
                defaultEventDateFormat: action.value
            }
        case RESET_SETTING_DEFAULTS:
            return {
                ...initialState
            }
        default:
            return state
    }
}