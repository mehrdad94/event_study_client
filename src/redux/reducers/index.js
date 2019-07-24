import { combineReducers } from 'redux'

import events from './events'
import setting from './setting'
import stats from './stats'
import stocks from './stocks'
import application from './application'

export default combineReducers({
    events,
    setting,
    stats,
    stocks,
    application
})
