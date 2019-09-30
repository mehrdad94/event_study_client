import application from './application'
import {
  HIDE_SETTING,
  SHOW_SETTING,
  SHOW_STOCK_LIST,
  HIDE_STOCK_LIST,
  SET_ACTIVE_MAIN_FRAME,
  SET_IS_FIRST_TIME_VISIT
} from '../ActionTypes'

describe('application reducer', function () {
  let initialState

  beforeEach(() => {
    initialState = {}
  })

  it('should handle initial state', function () {
    const initialState = {}
    const action = {}

    const result = {}

    expect(application(initialState, action)).toEqual(result)
  })

  it('should show setting', function () {
    const action = {
      type: SHOW_SETTING
    }

    const result = {
      showSetting: true
    }

    expect(application(initialState, action)).toEqual(result)
  })

  it('should hide setting', function () {
    const action = {
      type: HIDE_SETTING
    }
    const result = {
      showSetting: false
    }
    expect(application(initialState, action)).toEqual(result)
  })

  it('should show stock list', function () {
    const action = {
      type: SHOW_STOCK_LIST
    }
    const result = {
      stockListStatus: true
    }
    expect(application(initialState, action)).toEqual(result)
  })

  it('should hide stock list', function () {
    const action = {
      type: HIDE_STOCK_LIST
    }
    const result = {
      stockListStatus: false
    }
    expect(application(initialState, action)).toEqual(result)
  })

  it('should set active main frame', function () {
    const frame = 'ANALYSIS'
    const action = {
      type: SET_ACTIVE_MAIN_FRAME,
      frame
    }
    const result = {
      activeMainFrame: frame
    }
    expect(application(initialState, action)).toEqual(result)
  })

  it('should set is first time visit', function () {
    const value = false

    const action = {
      type: SET_IS_FIRST_TIME_VISIT,
      value
    }

    const result = {
      isFirstTimeVisit: value
    }

    expect(application(initialState, action)).toEqual(result)
  })
})