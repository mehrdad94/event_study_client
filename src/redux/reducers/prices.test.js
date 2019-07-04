import prices from './prices'

import {
    SET_PRICES
} from '../ActionTypes'

it('should set prices information', function () {
    const initialState = {}
    const data = [{ key: '1', name: 'name' }]
    const stockKey = '1234'
    const action = { type: SET_PRICES, payload: { stockKey, prices: data } }

    const result = {
        [stockKey]: data
    }

    expect(prices(initialState, action)).toEqual(result)
})
