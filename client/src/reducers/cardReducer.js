import * as Actions from '../actions/actionTypes'

const initialState = {
  error: {},
  isFetching: false,
  cards: {}
}

export default function cards(state = initialState, action) {
  const data = action.data
  switch (action.type) {
    case Actions.GET_BOARD_SUCCESS:
      return {
        ...state,
        cards: data.cards
      }
    case Actions.CREATE_CARD_FAILURE:
    case Actions.GET_CARD_FAILURE:
    case Actions.UPDATE_CARD_FAILURE:
    case Actions.DELETE_CARD_FAILURE:
      return {
        ...state,
        error: data,
        isFetching: false
      }

    case Actions.CREATE_CARD_REQUEST:
    case Actions.GET_CARD_REQUEST:
    case Actions.UPDATE_CARD_REQUEST:
      return {
        ...state,
        isFetching: true,
      }
    case Actions.CREATE_CARD_SUCCESS:
    case Actions.GET_CARD_SUCCESS:
    case Actions.UPDATE_CARD_SUCCESS:
      return {
        ...state,
        error: null,
        isFetching: false,
        cards: {
          ...state.cards,
          [data.id]: data
        }
      }
    case Actions.DELETE_CARD_SUCCESS:
      let cards_copy = {...state.cards }
      delete cards_copy[data.id]
      return {
        ...state,
        cards: cards_copy
      }
    case Actions.DELETE_CARD_MEMBER_SUCCESS:
      return {
        ...state,
        error: null,
        isFetching: false,
        cards: {
          ...state.cards,
          [data.card_id]: {
            ...state.cards[data.card_id],
            member_ids: state.cards[data.card_id]['member_ids'].filter(member =>
              member !== data.member_id)
          }
        },
      }
    case Actions.ADD_CARD_MEMBER_SUCCESS:
      return {
        ...state,
        error: null,
        isFetching: false,
        cards: {
          ...state.cards,
          [data.card_id]: {
            ...state.cards[data.card_id],
            member_ids: [...state.cards[data.card_id]['member_ids'], data.member_id]
          }
        },
      }
    default:
      return state
  }
}