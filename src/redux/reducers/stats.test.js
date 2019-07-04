import stats from './stats'

import {
    SET_STATS
} from '../ActionTypes'

it('should set stats information', function () {
    const initialState = {}

    const statsData = { key: '1', name: 'name' }
    const activeStockKey = '1234'

    const action = { type: SET_STATS, payload: { stats: statsData, stockKey: activeStockKey } }

    const result = {
        [activeStockKey]: statsData
    }

    expect(stats(initialState, action)).toEqual(result)
})
