import {
    SET_DATE_FIELD,
    SET_OPERATION_FIELD,
    SET_TOT1,
    SET_T1E,
    SET_ET2,
    SET_T2T3
} from '../ActionTypes'

const dateField = 'Date'
const operationField = 'Close'

const initialState = {
    dateField,
    operationField
}

export default function setting (state = initialState, action) {
    switch (action.type) {
        case SET_DATE_FIELD:
            return {
                ...state,
                dateField: action.dateField
            }
        case SET_OPERATION_FIELD:
            return {
                ...state,
                operationField: action.operationField
            }
        case SET_TOT1:
            return {
                ...state,
                TOT1: action.TOT1
            }
        case SET_T1E:
            return {
                ...state,
                T1E: action.T1E
            }
        case SET_ET2:
            return {
                ...state,
                ET2: action.ET2
            }
        case SET_T2T3:
            return {
                ...state,
                T2T3: action.T2T3
            }
        default:
            return state
    }
}