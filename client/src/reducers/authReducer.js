import * as Actions from '../actions/actionTypes'

const initialState = {
  isLoggedIn: false,
  token: null,
  error: null,
  feedback: {}
}

function authentication(state = initialState, action) {
  switch (action.type) {
    case Actions.LOGIN_SUCCESS:
      return {
        ...state,
        isLoggedIn: true,
        token: action.data,
        isFetching: false,
      }
    case Actions.LOGIN_FAILURE:
      return {
        ...state,
        isLoggedIn: false,
        token: null,
        error: action.data,
        isFetching: false,
      }
    case Actions.LOGIN_REQUEST:
      return {
        ...state,
        error: null,
        isFetching: true
      }
    case Actions.LOGIN_FORM_ERRORS:
      return {
        ...state,
        formFeedback: action.data
      }
    default:
      return state
  }
}
export default authentication