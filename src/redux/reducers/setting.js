import {
    SET_DATE_COLUMN,
    SET_OPERATION_COLUMN,
    SET_T0T1,
    SET_T1E,
    SET_ET2,
    SET_T2T3,
    SET_DEFAULT_EVENT_DATE_FORMAT
} from '../ActionTypes'

const dateColumn = 'Date'
const operationColumn = 'Close'
const T0T1 = 60
const T1E = 7
const ET2 = 3
const T2T3 = 10
const defaultEventDateFormat = 'yyyy-mm-dd'

const initialState = {
    dateColumn,
    operationColumn,
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
        default:
            return state
    }
}