import { combineReducers } from 'redux'

import events from './events'
import setting from './setting'
import analysis from './analysis'
import stocks from './stocks'
import application from './application'

export default combineReducers({
    events,
    setting,
    analysis,
    stocks,
    application
})
