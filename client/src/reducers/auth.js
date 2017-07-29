import * as Actions from "../actions/auth";
import decode from "jwt-decode";

export const user = (
  state = { isAuthenticated: false, error: null },
  action
) => {
  switch (action.type) {
    case Actions.LOGIN_SUCCESS:
      const decoded = decode(action.data);
      return {
        ...state,
        isAuthenticated: true,
        token: action.data,
        isFetching: false,
        email: decoded.email,
        id: decoded.id
      };
    case Actions.LOGIN_REQUEST:
      return {
        ...state,
        isFetching: true,
        error: null
      };
    case Actions.LOGIN_FAILURE:
      return {
        ...state,
        isFetching: false,
        isAuthenticated: false,
        error: true
      };
    case Actions.LOGOUT:
      return {
        isAuthenticated: false
      };
    default:
      return state;
  }
};
