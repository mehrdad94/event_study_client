import stocks from './stocks'

import {
    CREATE_STOCK,
    UPDATE_STOCK,
    DELETE_STOCK,
    SELECT_STOCK
} from '../ActionTypes'

describe("Stocks reducer", function () {
    let initialState

    beforeEach(() => {
        initialState = {
            stockList: [],
            activeStock: {}
        }
    })

    it('should handle initial state', () => {
        const action = {}

        const result = {
            stockList: [],
            activeStock: {}
        }

        expect(stocks(undefined, action)).toEqual(result)
    })

    it('should add a stock', function () {
        const stock = { key: '1', name: 'name' }
        const action = { type: CREATE_STOCK, stock }

        const result = {
            stockList: [stock],
            activeStock: {}
        }

        expect(stocks(initialState, action)).toEqual(result)
    })

    it('should update a stock', function () {
        const oldStock = { key: '1', name: 'name' }
        const newStock = { key: '1', name: 'new name' }

        initialState.stockList.push(oldStock)

        const action = { type: UPDATE_STOCK, stock: newStock }

        const result = {
            stockList: [newStock],
            activeStock: {}
        }

        expect(stocks(initialState, action)).toEqual(result)
    })

    it('should delete a stock', function () {
        const stock = { key: '1', name: 'name' }

        initialState.stockList.push(stock)

        const action = { type: DELETE_STOCK, key: stock.key }

        const result = {
            stockList: [],
            activeStock: {}
        }

        expect(stocks(initialState, action)).toEqual(result)
    })

    it('should select an Item', function () {
        const stock = { key: '1', name: 'name' }

        initialState.stockList.push(stock)

        const action = { type: SELECT_STOCK, stock }

        const result = {
            stockList: [stock],
            activeStock: stock
        }

        expect(stocks(initialState, action)).toEqual(result)
    });
})
