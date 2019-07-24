import application from './application'
import {HIDE_SETTING, SHOW_SETTING} from '../ActionTypes'

describe('application reducer', function () {
  let initialState

  beforeEach(() => {
    initialState = {
      showSetting: false
    }
  })
  it('should handle initial state', function () {
    const initialState = undefined
    const action = {}

    const result = {
      showSetting: false
    }

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
  });
})