import {
  SHOW_SETTING,
  HIDE_SETTING,
  SHOW_STOCK_LIST,
  HIDE_STOCK_LIST,
  SET_ACTIVE_MAIN_FRAME
} from '../ActionTypes'

const EVENT_LIST = 'EVENT_LIST'
const ANALYSIS = 'ANALYSIS'

const initialState = {
  showSetting: false,
  stockListStatus: true,
  activeMainFrame: EVENT_LIST
}

const mainFrames = [EVENT_LIST, ANALYSIS]

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
    case SHOW_STOCK_LIST:
      return {
        ...state,
        stockListStatus: true
      }
    case HIDE_STOCK_LIST:
      return {
        ...state,
        stockListStatus: false
      }
    case SET_ACTIVE_MAIN_FRAME: {
      const isValidFrame = ~mainFrames.indexOf(action.frame)

      if (isValidFrame) {
        return {
          ...state,
          activeMainFrame: action.frame
        }
      } else return state
    }
    default:
      return state
  }
}
