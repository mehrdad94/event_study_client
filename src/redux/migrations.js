import isNil from 'ramda/src/isNil'

export default {
  0: state => {
    if (isNil(state.application.isFirstTimeVisit)) {
      return {
        ...state,
        application: {
          ...state.application,
          isFirstTimeVisit: true
        }
      }
    } else return state
  }
}
