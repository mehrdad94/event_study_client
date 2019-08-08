import {
    CREATE_ANALYSIS,
    UPDATE_ANALYSIS,
    DELETE_ANALYSIS
} from '../ActionTypes'
import update from "immutability-helper";

const initialState = {
  analysis: {}
}

export default function analysis (state = initialState, action) {
    switch (action.type) {
      case CREATE_ANALYSIS:
        return {
          ...state,
          analysis: {
            ...state.analysis,
            [action.payload.stockKey]: {
              ...state.analysis[action.payload.stockKey],
              [action.payload.eventKey]: action.payload.analysis
            }
          }
        }
      case UPDATE_ANALYSIS:
        return {
          ...state,
          analysis: {
            ...state.analysis,
            [action.payload.stockKey]: {
              ...state.analysis[action.payload.stockKey],
              [action.payload.eventKey]: {
                ...state.analysis[action.payload.stockKey][action.payload.eventKey],
                ...action.payload.analysis
              }
            }
          }
        }
      case DELETE_ANALYSIS: {
        const analysis = update(state.analysis[action.payload.stockKey], { $unset: [action.payload.eventKey] })

        return {
          ...state,
          analysis: {
            ...state.analysis,
            [action.payload.stockKey]: analysis
          }
        }
      }
      default:
        return state
    }
}
