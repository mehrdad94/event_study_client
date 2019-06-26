import stocks from './stocks'

import {
    CREATE_STOCK,
    UPDATE_STOCK,
    DELETE_STOCK
} from '../ActionTypes'

it('should handle initial state', () => {
    const initialState = undefined
    const action = {}
    const result = []

    expect(stocks(initialState, action)).toEqual(result)
})

it('should add a stock', function () {
    const initialState = []
    const stock = { key: '1', name: 'name' }
    const action = { type: CREATE_STOCK, stock }
    const result = [stock]

    expect(stocks(initialState, action)).toEqual(result)
})

it('should update a stock', function () {
    const oldStock = { key: '1', name: 'name' }
    const newStock = { key: '1', name: 'new name' }
    const initialState = [oldStock]
    const action = { type: UPDATE_STOCK, stock: { key: '1', payload: newStock } }
    const result = [newStock]

    expect(stocks(initialState, action)).toEqual(result)
})

it('should delete a stock', function () {
    const stock = { key: '1', name: 'name' }
    const initialState = [stock]
    const action = { type: DELETE_STOCK, key: stock.key }
    const result = []

    expect(stocks(initialState, action)).toEqual(result)
})