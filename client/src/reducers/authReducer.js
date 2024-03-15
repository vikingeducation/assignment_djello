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
        token: action.data,
        isFetching: false,
      }
    case Actions.LOGIN_FAILURE:
      return {
        ...state,
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
    case Actions.LOGOUT_USER:
      return {
        ...state,
        token: null,
      }
    case Actions.CREATE_USER_SUCCESS:
      return {
        ...state,
        token: action.data.token,
        isLoggedIn: true
      }
    default:
      return state
  }
}
export default authentication