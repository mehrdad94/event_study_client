import stats from './stats'

import {
    SET_STATS
} from '../ActionTypes'

it('should set stats information', function () {
    const initialState = {}
    const data = { key: '1', name: 'name' }
    const action = { type: SET_STATS, stats: data }

    expect(stats(initialState, action)).toEqual(data)
})
