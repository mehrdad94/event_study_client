import { combineReducers } from 'redux'

import events from './events'
import prices from './prices'
import setting from './setting'
import stats from './stats'
import stocks from './stocks'

export default combineReducers({
    events,
    prices,
    setting,
    stats,
    stocks
})
