import * as Actions from './actionTypes'
import { setOptions, baseURL, arrayToObjectByID, setError } from '../helpers/actionHelpers'

export function updateListRequest() {
  return { type: Actions.UPDATE_LIST_REQUEST }
}

export function updateListFailure(data) {
  return { data, type: Actions.UPDATE_LIST_FAILURE }
}

export function updateListSuccess(data) {
  return { data, type: Actions.UPDATE_LIST_SUCCESS }
}

export function createListRequest() {
  return { type: Actions.CREATE_LIST_REQUEST }
}

export function createListFailure(data) {
  return { data, type: Actions.CREATE_LIST_FAILURE }
}

export function createListSuccess(data) {
  return { data, type: Actions.CREATE_LIST_SUCCESS }
}

export function deleteListRequest() {
  return { type: Actions.DELETE_LIST_REQUEST }
}

export function deleteListFailure(data) {
  return { data, type: Actions.DELETE_LIST_FAILURE }
}

export function deleteListSuccess(data) {
  return { data, type: Actions.DELETE_LIST_SUCCESS }
}

export function updateList(data, list_id) {
  return (dispatch, getState) => {
    const options = setOptions(getState(), 'PUT', { list: data })

    dispatch(updateListRequest())

    return fetch(`${baseURL}/lists/${list_id}`, options)
      .then(response => {
        if (!response.ok) {
          throw setError(response)
        }
        return response.json()
      })
      .then(json => {
        dispatch(updateListSuccess(json.lists))
      })
      .catch(error => {
        dispatch(updateListFailure(error))
      })
  }
}

export function createList(data, board_id) {
  return (dispatch, getState) => {
    const options = setOptions(getState(), 'POST', { list: data })

    return fetch(`${baseURL}/boards/${board_id}/lists`, options)
      .then(response => {
        if (!response.ok) {
          throw setError(response)
        }
        return response.json()
      })
      .then(json => {
        dispatch(createListSuccess(json.lists))
      })
      .catch(error => {
        dispatch(createListFailure(error))
      })
  }
}

export function deleteList(list_id) {
  return (dispatch, getState) => {
    const options = setOptions(getState(), 'DELETE')

    dispatch(deleteListRequest())

    return fetch(`${baseURL}/lists/${list_id}`, options)
      .then(response => {
        if (!response.ok) {
          throw setError(response)
        }
        return response
      })
      .then(json => {
        dispatch(deleteListSuccess(list_id))
      })
      .catch(error => {
        dispatch(deleteListFailure(error))
      })
  }
}