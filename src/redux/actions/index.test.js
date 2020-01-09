import {
    SET_ADJUSTMENT_RULE,
    RESET_SETTING_DEFAULTS,
    SET_T0T1,
    SET_T1E,
    SET_ET2,
    SET_T2T3,
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

import {
    setAdjustmentRule,
    resetSettingDefaults,
    setT0T1,
    setT1E,
    setET2,
    setT2T3,
    setDateColumn,
    setOperationColumn,
    setAlphavantageToken,
    createEvent,
    updateEvent,
    deleteEvent,
    selectEvent,
    deselectEvent,
    createStock,
    updateStock,
    deleteStock,
    selectStock,
    createAnalysis,
    updateAnalysis,
    deleteAnalysis,
    showSetting,
    hideSetting,
    showStockList,
    hideStockList,
    setActiveMainFrame,
    setDefaultEventDateFormat,
    setIsFirstTimeVisit
} from './index'

describe('should test actions', function () {
    it('should create an action that reset setting defaults', function () {
        const result = {
            type: RESET_SETTING_DEFAULTS,
        }

        expect(resetSettingDefaults()).toEqual(result)
    })

    it('should create an action to set Adjustment rule', function () {
        const value = 'SKIP'

        const result = {
            type: SET_ADJUSTMENT_RULE,
            value,
        }

        expect(setAdjustmentRule(value)).toEqual(result)
    })

    it('should create an action to set T0T1', function () {
        const value = 1

        const result = {
            type: SET_T0T1,
            value,
        }

        expect(setT0T1(value)).toEqual(result)
    })

    it('should create an action to set T1E', function () {
        const value = 1

        const result = {
            type: SET_T1E,
            value
        }

        expect(setT1E(value)).toEqual(result)
    })

    it('should create an action to set ET2', function () {
        const value = 1

        const result = {
            type: SET_ET2,
            value
        }

        expect(setET2(value)).toEqual(result)
    })

    it('should create an action to set T2T3', function () {
        const value = 1

        const result = {
            type: SET_T2T3,
            value
        }

        expect(setT2T3(value)).toEqual(result)
    })

    it('should create an action to set dateField', function () {
        const dateColumn = 1

        const result = {
            type: SET_DATE_COLUMN,
            dateColumn
        }

        expect(setDateColumn(dateColumn)).toEqual(result)
    })

    it('should create an action to set operationField', function () {
        const operationColumn = 1

        const result = {
            type: SET_OPERATION_COLUMN,
            operationColumn
        }

        expect(setOperationColumn(operationColumn)).toEqual(result)
    })

    it('should set alphavantage token', function () {
        const token = 'token'

        const result = {
            type: SET_ALPHAVANTAGE_TOKEN,
            token
        }

        expect(setAlphavantageToken(token)).toEqual(result)
    })

    it('should create an action to create an event', function () {
        const event = {
            name: 'something'
        }
        const stockKey = '123'
        const result = {
            type: CREATE_EVENT,
            payload: {
                stockKey,
                event
            }
        }

        expect(createEvent(event, stockKey)).toEqual(result)
    })

    it('should create an action to edit an event', function () {
        const event = {
            key: 'event key',
            name: 'another name'
        }

        const stockKey = '123'
        const result = {
            type: UPDATE_EVENT,
            payload: {
                event,
                stockKey
            }
        }

        expect(updateEvent(event, stockKey)).toEqual(result)
    })

    it('should create an action to delete an event', function () {
        const key = 'event key to delete'
        const stockKey = '123'
        const result = {
            type: DELETE_EVENT,
            payload: {
                key,
                stockKey
            }
        }

        expect(deleteEvent(key, stockKey)).toEqual(result)
    })

    it('should select an Event', function () {
        const event = {
            key: 'event key',
            name: 'another name'
        }
        const stockKey = '1'
        const result = {
            type: SELECT_EVENT,
            payload: {
                event,
                stockKey
            }
        }

        expect(selectEvent(event, stockKey)).toEqual(result)
    });

    it('should deselect an Event', function () {
        const event = {
            key: 'event key',
            name: 'another name'
        }
        const stockKey = '1'
        const result = {
            type: DESELECT_EVENT,
            payload: {
                event,
                stockKey
            }
        }

        expect(deselectEvent(event, stockKey)).toEqual(result)
    });

    it('should create an action to create a stock', function () {
        const stock = {
            name: 'something'
        }

        const result = {
            type: CREATE_STOCK,
            stock
        }

        expect(createStock(stock)).toEqual(result)
    })

    it('should create an action to update a stock', function () {
        const stock = {
            key: 'stock key',
            payload: {
                name: 'another name'
            }
        }

        const result = {
            type: UPDATE_STOCK,
            stock
        }

        expect(updateStock(stock)).toEqual(result)
    })

    it('should create an action to delete a stock', function () {
        const key = 'stock key to delete'

        const result = {
            type: DELETE_STOCK,
            key
        }

        expect(deleteStock(key)).toEqual(result)
    })

    it('should select a stock', function () {
        const stock = {
            key: 'something',
            name: 'another'
        }

        const result = {
            type: SELECT_STOCK,
            stock
        }

        expect(selectStock(stock)).toEqual(result)
    })

    it('should create an action to set statistical', function () {
        const analysis = {
            dataSets: {
                abnormalReturn: [1, 2]
            }
        }

        const stockKey = '123'
        const eventKey = '234'

        const result = {
            type: CREATE_ANALYSIS,
            payload: {
                analysis,
                stockKey,
                eventKey
            }
        }

        expect(createAnalysis(analysis, stockKey, eventKey)).toEqual(result)
    })

    it('should update an analysis', function () {
        const analysis = {
            dataSets: {
                abnormalReturn: [1, 2, 1]
            }
        }

        const stockKey = '123'
        const eventKey = '234'

        const result = {
            type: UPDATE_ANALYSIS,
            payload: {
                analysis,
                stockKey,
                eventKey
            }
        }

        expect(updateAnalysis(analysis, stockKey, eventKey)).toEqual(result)
    })

    it('should delete an analysis', function () {
        const eventKey = 'event key to delete'
        const stockKey = '123'
        const result = {
            type: DELETE_ANALYSIS,
            payload: {
                eventKey,
                stockKey
            }
        }

        expect(deleteAnalysis(eventKey, stockKey)).toEqual(result)
    })

    it('should show setting', function () {
        expect(showSetting()).toEqual({
            type: SHOW_SETTING
        })
    })

    it('should hide setting', function () {
        expect(hideSetting()).toEqual({
            type: HIDE_SETTING
        })
    })

    it('should show stock list', function () {
        expect(showStockList()).toEqual({
            type: SHOW_STOCK_LIST
        })
    })

    it('should hide stock list', function () {
        expect(hideStockList()).toEqual({
            type: HIDE_STOCK_LIST
        })
    })

    it('should set active main frame', function () {
        const frame = 'EVENT_LIST'

        expect(setActiveMainFrame(frame)).toEqual({
            type: SET_ACTIVE_MAIN_FRAME,
            frame
        })
    })
    it('should generate action to set default event date format', function () {
        const value = 'yyyy-dd-mm'

        expect(setDefaultEventDateFormat(value)).toEqual({
            type: SET_DEFAULT_EVENT_DATE_FORMAT,
            value
        })
    })
    it('should set first time visit', function () {
        const value = false

        expect(setIsFirstTimeVisit(value)).toEqual({
            type: SET_IS_FIRST_TIME_VISIT,
            value
        })
    })
})
