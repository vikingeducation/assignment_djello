import * as Actions from './actionTypes'
import { baseURL, setError } from '../helpers/actionHelpers'
import {
  arrayToObjectByID,
  setOptions
} from '../helpers/actionHelpers'

function massageBoardData(json) {
  let lists = arrayToObjectByID(json.lists)
  let cards = arrayToObjectByID(json.cards)
  let users = arrayToObjectByID(json.users)
  return {
    ...json,
    lists,
    cards,
    users
  }
}

export function getBoardRequest() {
  return { type: Actions.GET_BOARD_REQUEST }
}

export function getBoardFailure(data) {
  return { data, type: Actions.GET_BOARD_FAILURE }
}

export function getBoardSuccess(data) {
  return { data, type: Actions.GET_BOARD_SUCCESS }
}

export function updateBoardRequest() {
  return { type: Actions.UPDATE_BOARD_REQUEST }
}

export function updateBoardFailure(data) {
  return { data, type: Actions.UPDATE_BOARD_FAILURE }
}

export function updateBoardSuccess(data) {
  return { data, type: Actions.UPDATE_BOARD_SUCCESS }
}
export function deleteBoardRequest() {
  return { type: Actions.DELETE_BOARD_REQUEST }
}

export function deleteBoardFailure(data) {
  return { data, type: Actions.DELETE_BOARD_FAILURE }
}

export function deleteBoardSuccess(data) {
  return { data, type: Actions.DELETE_BOARD_SUCCESS }
}
export function createBoardRequest() {
  return { type: Actions.CREATE_BOARD_REQUEST }
}

export function createBoardFailure(data) {
  return { data, type: Actions.CREATE_BOARD_FAILURE }
}

export function createBoardSuccess(data) {
  return { data, type: Actions.CREATE_BOARD_SUCCESS }
}

export function loadBoard(board_id) {
  let fetchURL = board_id ? (baseURL + '/boards/' + board_id) : baseURL + '/main'

  return (dispatch, getState) => {
    const options = setOptions(getState(), 'GET')

    dispatch(getBoardRequest())

    return fetch(fetchURL, options)
      .then(response => {
        if (!response.ok) {
          throw setError(response)
        }
        return response.json()
      }).then(json => {
        const massaged = massageBoardData(json)
        dispatch(getBoardSuccess(massaged))
      }).catch(error => {
        dispatch(getBoardFailure(error))
      })
  }
}

export function updateBoard(data, board_id) {
  return (dispatch, getState) => {
    const token = getState().auth.token
    const options = setOptions(getState(), 'PUT', data)

    dispatch(updateBoardRequest())

    return fetch(`${baseURL}/boards/${board_id}`, options).then(response => {
      if (!response.ok) {
        throw setError(response)
      }
      return response.json()
    }).then(json => {
      const massaged = massageBoardData(json)
      dispatch(updateBoardSuccess(massaged))
    }).catch(error => {
      dispatch(updateBoardFailure(error))
    })
  }
}

export function deleteBoard(board_id) {
  return (dispatch, getState) => {

    const options = setOptions(getState(), 'DELETE')

    dispatch(deleteBoardRequest())

    return fetch(`${baseURL}/boards/${board_id}`, options)
      .then(response => {
        if (!response.ok) {
          throw setError(response)
        }
        return response
      }).then(json => {
        return dispatch(deleteBoardSuccess())
      }).catch(error => {
        return dispatch(deleteBoardFailure(error))
      })
  }
}

export function createBoard(data) {
  return (dispatch, getState) => {

    const options = setOptions(getState(), 'POST', { board: data })


    dispatch(createBoardRequest())

    return fetch(`${baseURL}/boards`, options)
      .then(response => {
        if (!response.ok) {
          throw setError(response)
        }
        return response.json()
      }).then(json => {
        dispatch(createBoardSuccess(json))
      }).catch(error => {
        dispatch(createBoardFailure(error))
      })
  }
}