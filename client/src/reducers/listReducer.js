import * as Actions from '../actions/actionTypes'

const initialState = {
  error: {},
  lists: {}
}

export default function list(state = initialState, action) {
  const data = action.data
  switch (action.type) {
    case Actions.UPDATE_LIST_FAILURE:
    case Actions.CREATE_LIST_FAILURE:
    case Actions.DELETE_LIST_FAILURE:
      return {
        ...state,
        error: action.data
      }
    case Actions.GET_BOARD_SUCCESS:
      return {
        ...state,
        lists: data.lists
      }
    case Actions.CREATE_CARD_SUCCESS:
      return {
        ...state,
        lists: {
          ...state.lists,
          [data.list_id]: {
            ...state.lists[data.list_id],
            card_ids: [...state.lists[data.list_id]['card_ids'], data.id]
          }
        }
      }
    case Actions.DELETE_LIST_SUCCESS:
      let lists_copy = {...state.lists }
      delete lists_copy[data]
      return {
        ...state,
        lists: lists_copy
      }
    case Actions.UPDATE_CARD_LIST_SUCCESS:
      return {
        ...state,
        lists: {
          ...state.lists,
          [data.old_list_id]: {
            ...state.lists[data.old_list_id],
            card_ids: state.lists[data.old_list_id]['card_ids'].filter(id => id != data.card_id)
          },
          [data.new_list_id]: {
            ...state.lists[data.new_list_id],
            card_ids: [...state.lists[data.new_list_id]['card_ids'], data.card_id]
          }
        }
      }
    case Actions.DELETE_CARD_SUCCESS:
      return {
        ...state,
        lists: {
          ...state.lists,
          [data.list_id]: {
            ...state.lists[data.list_id],
            card_ids: state.lists[data.list_id]['card_ids'].filter(item => item !== data.card_id)
          }
        }
      }
    default:
      return state
  }
}