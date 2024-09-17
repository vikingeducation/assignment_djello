import * as Actions from '../actions/actionTypes'

const initialState = {
  board_list: [],
  list_ids: [],
  error: {},
  isFetching: false,
}

export default function board(state = initialState, action) {
  const data = action.data
  switch (action.type) {
    case Actions.GET_BOARD_REQUEST:
    case Actions.UPDATE_BOARD_REQUEST:
    case Actions.DELETE_BOARD_REQUEST:
    case Actions.CREATE_BOARD_REQUEST:
      return {
        ...state,
        isFetching: true,
      }
    case Actions.GET_BOARD_SUCCESS:
    case Actions.CREATE_BOARD_SUCCESS:
      return {
        ...state,
        ...data.board,
        isFetching: false
      }
    case Actions.UPDATE_BOARD_SUCCESS:
      return {
        ...state,
        isFetching: false,
        ...data.board,
      }
    case Actions.GET_BOARD_FAILURE:
    case Actions.UPDATE_BOARD_FAILURE:
    case Actions.CREATE_BOARD_FAILURE:
    case Actions.UPDATE_LIST_FAILURE:
    case Actions.CREATE_LIST_FAILURE:
    case Actions.DELETE_LIST_FAILURE:
      return {
        ...state,
        error: data,
        isFetching: false
      }
    case Actions.DELETE_BOARD_SUCCESS:
      return {
        ...initialState
      }
    case Actions.UPDATE_LIST_SUCCESS:
    case Actions.CREATE_LIST_SUCCESS:
      const { id, ...rest } = data
      let updated_list_ids = state.list_ids.indexOf(id) < 0 ? [...state.list_ids, id] : [...state.list_ids]
      return {
        ...state,
        list_ids: updated_list_ids
      }
    case Actions.DELETE_LIST_SUCCESS:
      const list_ids = [...state.list_ids]
      list_ids.splice(list_ids.indexOf(data), 1)
      return {
        ...state,
        list_ids: list_ids,
      }
    default:
      return state
  }
}