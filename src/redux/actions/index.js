import {
    SET_TOT1,
    SET_T1E,
    SET_ET2,
    SET_T2T3,
    SET_DATE_FIELD,
    SET_OPERATION_FIELD,
    SET_PRICES,
    CREATE_EVENT,
    UPDATE_EVENT,
    DELETE_EVENT,
    CREATE_STOCK,
    UPDATE_STOCK,
    DELETE_STOCK,
    SELECT_STOCK,
    SET_STATS
} from '../ActionTypes'

export const setTOT1 = value => {
    return {
        type: SET_TOT1,
        value
    }
}
export const setT1E = value => {
    return {
        type: SET_T1E,
        value
    }
}
export const setET2 = value => {
    return {
        type: SET_ET2,
        value
    }
}
export const setT2T3 = value => {
    return {
        type: SET_T2T3,
        value
    }
}
export const setDateField = dateField => {
    return {
        type: SET_DATE_FIELD,
        dateField
    }
}
export const setOperationField = operationField => {
    return {
        type: SET_OPERATION_FIELD,
        operationField
    }
}
export const setPrices = prices => {
    return {
        type: SET_PRICES,
        prices
    }
}
export const createEvent = event => {
    return {
        type: CREATE_EVENT,
        event
    }
}
export const updateEvent = event => {
    return {
        type: UPDATE_EVENT,
        event
    }
}
export const deleteEvent = key => {
    return {
        type: DELETE_EVENT,
        key
    }
}
export const createStock = stock => {
    return {
        type: CREATE_STOCK,
        stock
    }
}
export const updateStock = stock => {
    return {
        type: UPDATE_STOCK,
        stock
    }
}
export const deleteStock = key => {
    return {
        type: DELETE_STOCK,
        key
    }
}
export const selectStock = stock => {
    return {
        type: SELECT_STOCK,
        stock
    }
}
export const setStats = stats => {
    return {
        type: SET_STATS,
        stats
    }
}
