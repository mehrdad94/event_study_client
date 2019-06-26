import prices from './prices'

import {
    SET_PRICES
} from '../ActionTypes'

it('should set prices information', function () {
    const initialState = {}
    const data = [{ key: '1', name: 'name' }]
    const action = { type: SET_PRICES, prices: data }

    expect(prices(initialState, action)).toEqual(data)
})
