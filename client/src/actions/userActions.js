import * as Actions from './actionTypes'
import { baseURL, setError, setOptions } from '../helpers/actionHelpers'

export function getUserRequest() {
  return {
    type: Actions.GET_USER_REQUEST
  }
}

export function getUserSuccess(data) {
  return {
    type: Actions.GET_USER_SUCCESS,
    data
  }
}

export function getUserFailure(data) {
  return {
    type: Actions.GET_USER_FAILURE,
    data
  }
}

export function createUserRequest() {
  return {
    type: Actions.CREATE_USER_REQUEST
  }
}

export function createUserSuccess(data) {
  return {
    type: Actions.CREATE_USER_SUCCESS,
    data
  }
}

export function createUserFailure(data) {
  return {
    type: Actions.CREATE_USER_FAILURE,
    data
  }
}

export function getUser() {

  return (dispatch, getState) => {

    const token = getState().auth.token

    const options = {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      method: 'GET'
    }

    return fetch(`${baseURL}/users`, options)
      .then(response => {
        if (!response.ok) {
          throw response
        }
        return response.json()
      }).then(json => {
        dispatch(getUserSuccess(json))
      }).catch(error => {
        dispatch(getUserFailure(error))
      })
      // grab token from state
  }

}


export function signup(data) {
  return (dispatch, getState) => {
    const options = setOptions(getState(), 'POST', { user: data })

    dispatch(createUserRequest())

    return fetch(`${baseURL}/users`, options)
      .then(response => {
        if (!response.ok) {
          throw setError(response)
        }
        return response.json()
      }).then(json => {
        dispatch(createUserSuccess(json))
      }).catch(error => {
        console.log('error', error)
        dispatch(createUserFailure(error))
      })

  }
}