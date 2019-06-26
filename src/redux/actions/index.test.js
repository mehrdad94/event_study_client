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
    SET_STATS
} from '../ActionTypes'

import {
    setTOT1,
    setT1E,
    setET2,
    setT2T3,
    setDateField,
    setOperationField,
    setPrices,
    createEvent,
    updateEvent,
    deleteEvent,
    createStock,
    updateStock,
    deleteStock,
    setStats
} from './index'

it('should create an action to set TOT1', function () {
    const value = 1

    const result = {
        type: SET_TOT1,
        value,
    }

    expect(setTOT1(value)).toEqual(result)
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
    const dateField = 1

    const result = {
        type: SET_DATE_FIELD,
        dateField
    }

    expect(setDateField(dateField)).toEqual(result)
})

it('should create an action to set operationField', function () {
    const operationField = 1

    const result = {
        type: SET_OPERATION_FIELD,
        operationField
    }

    expect(setOperationField(operationField)).toEqual(result)
})

it('should create an action to set prices', function () {
    const prices = [{ key: 'value' }]

    const result = {
        type: SET_PRICES,
        prices
    }

    expect(setPrices(prices)).toEqual(result)
})

it('should create an action to create an event', function () {
    const event = {
        name: 'something'
    }

    const result = {
        type: CREATE_EVENT,
        event
    }

    expect(createEvent(event)).toEqual(result)
})

it('should create an action to edit an event', function () {
    const event = {
        key: 'event key',
        payload: {
            name: 'another name'
        }
    }

    const result = {
        type: UPDATE_EVENT,
        event
    }

    expect(updateEvent(event)).toEqual(result)
})

it('should create an action to delete an event', function () {
    const key = 'event key to delete'

    const result = {
        type: DELETE_EVENT,
        key
    }

    expect(deleteEvent(key)).toEqual(result)
})


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

it('should create an action to set statistical', function () {
    const stats = {
        dataSets: {
            abnormalReturn: [1, 2]
        }
    }

    const result = {
        type: SET_STATS,
        stats
    }

    expect(setStats(stats)).toEqual(result)
})

