import { SHOW_SETTING, HIDE_SETTING } from '../ActionTypes'

const initialState = {
  showSetting: false
}

export default function application (state = initialState, action) {
  switch (action.type) {
    case SHOW_SETTING:
      return {
        ...state,
        showSetting: true
      }
    case HIDE_SETTING:
      return {
        ...state,
        showSetting: false
      }
    default:
      return state
  }
}
