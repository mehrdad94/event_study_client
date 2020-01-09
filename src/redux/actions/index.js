import {
    SET_ADJUSTMENT_RULE,
    SET_T0T1,
    SET_T1E,
    SET_ET2,
    SET_T2T3,
    RESET_SETTING_DEFAULTS,
    SET_DATE_COLUMN,
    SET_OPERATION_COLUMN,
    SET_ALPHAVANTAGE_TOKEN,
    CREATE_EVENT,
    UPDATE_EVENT,
    DELETE_EVENT,
    SELECT_EVENT,
    DESELECT_EVENT,
    CREATE_STOCK,
    UPDATE_STOCK,
    DELETE_STOCK,
    SELECT_STOCK,
    CREATE_ANALYSIS,
    UPDATE_ANALYSIS,
    DELETE_ANALYSIS,
    SHOW_SETTING,
    HIDE_SETTING,
    SHOW_STOCK_LIST,
    HIDE_STOCK_LIST,
    SET_ACTIVE_MAIN_FRAME,
    SET_DEFAULT_EVENT_DATE_FORMAT,
    SET_IS_FIRST_TIME_VISIT
} from '../ActionTypes'

export const setAdjustmentRule = value => {
    return {
        type: SET_ADJUSTMENT_RULE,
        value
    }
}

export const resetSettingDefaults = () => {
    return {
        type: RESET_SETTING_DEFAULTS
    }
}

export const setT0T1 = value => {
    return {
        type: SET_T0T1,
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
export const setDateColumn = dateColumn => {
    return {
        type: SET_DATE_COLUMN,
        dateColumn
    }
}
export const setOperationColumn = operationColumn => {
    return {
        type: SET_OPERATION_COLUMN,
        operationColumn
    }
}
export const setAlphavantageToken = token => {
    return {
        type: SET_ALPHAVANTAGE_TOKEN,
        token
    }
}
export const createEvent = (event, stockKey) => {
    return {
        type: CREATE_EVENT,
        payload: {
            event,
            stockKey
        }
    }
}
export const updateEvent = (event, stockKey) => {
    return {
        type: UPDATE_EVENT,
        payload: {
            event,
            stockKey
        }
    }
}
export const deleteEvent = (key, stockKey) => {
    return {
        type: DELETE_EVENT,
        payload: {
            key,
            stockKey
        }
    }
}
export const selectEvent = (event, stockKey) => {
    return {
        type: SELECT_EVENT,
        payload:{
            event,
            stockKey
        }
    }
}
export const deselectEvent = (event, stockKey) => {
    return {
        type: DESELECT_EVENT,
        payload:{
            event,
            stockKey
        }
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
export const createAnalysis = (analysis, stockKey, eventKey) => {
    return {
        type: CREATE_ANALYSIS,
        payload: {
            analysis,
            stockKey,
            eventKey
        }
    }
}
export const updateAnalysis = (analysis, stockKey, eventKey) => {
    return {
        type: UPDATE_ANALYSIS,
        payload: {
            analysis,
            stockKey,
            eventKey
        }
    }
}
export const deleteAnalysis = (eventKey, stockKey) => {
    return {
        type: DELETE_ANALYSIS,
        payload: {
            eventKey,
            stockKey
        }
    }
}
export const showSetting = () => {
    return {
        type: SHOW_SETTING
    }
}
export const hideSetting = () => {
    return {
        type: HIDE_SETTING
    }
}
export const showStockList = () => {
    return {
        type: SHOW_STOCK_LIST
    }
}
export const hideStockList = () => {
    return {
        type: HIDE_STOCK_LIST
    }
}
export const setActiveMainFrame = frame => {
    return {
        type: SET_ACTIVE_MAIN_FRAME,
        frame
    }
}
export const setDefaultEventDateFormat = value => {
    return {
        type: SET_DEFAULT_EVENT_DATE_FORMAT,
        value
    }
}
export const setIsFirstTimeVisit = value => {
    return {
        type: SET_IS_FIRST_TIME_VISIT,
        value
    }
}
