import * as Actions from '../actions/actionTypes'
import { baseURL, setOptions, arrayToObjectByID, setError } from '../helpers/actionHelpers'

export function createCardRequest() {
  return { type: Actions.CREATE_CARD_REQUEST }
}

export function createCardFailure(data) {
  return { data, type: Actions.CREATE_CARD_FAILURE }
}

export function createCardSuccess(data) {
  return { data, type: Actions.CREATE_CARD_SUCCESS }
}

export function getCardRequest() {
  return { type: Actions.GET_CARD_REQUEST }
}

export function getCardFailure(data) {
  return { data, type: Actions.GET_CARD_FAILURE }
}

export function getCardSuccess(data) {
  return { data, type: Actions.GET_CARD_SUCCESS }
}

export function updateCardRequest() {
  return { type: Actions.UPDATE_CARD_REQUEST }
}

export function updateCardFailure(data) {
  return { data, type: Actions.UPDATE_CARD_FAILURE }
}

export function updateCardSuccess(data) {
  return { data, type: Actions.UPDATE_CARD_SUCCESS }
}

export function deleteCardMemberSuccess(data) {
  return { data, type: Actions.DELETE_CARD_MEMBER_SUCCESS }
}

export function addCardMemberSuccess(data) {
  return { data, type: Actions.ADD_CARD_MEMBER_SUCCESS }
}
export function deleteCardSuccess(data) {
  return { data, type: Actions.DELETE_CARD_SUCCESS }
}
export function deleteCardFailure(data) {
  return { data, type: Actions.DELETE_CARD_FAILURE }
}
export function updateCardListSuccess(data) {
  return { data, type: Actions.UPDATE_CARD_LIST_SUCCESS }
}


export function createCard(data, list_id) {
  return (dispatch, getState) => {

    const options = setOptions(getState(), 'POST', { card: data })

    dispatch(createCardRequest())

    return fetch(`${baseURL}/lists/${list_id}/cards`, options)
      .then(response => {
        if (!response.ok) {
          throw setError(response)
        }
        return response.json()
      }).then(json => {
        dispatch(createCardSuccess(json))
      }).catch(error => {
        dispatch(createCardFailure(error))
      })
  }
}

export function removeCardMember(card_id, user_id) {
  return (dispatch, getState) => {
    const options = setOptions(getState(), 'DELETE')

    return fetch(`${baseURL}/cards/${card_id}/memberships/${user_id}`, options)
      .then(response => {
        if (!response.ok) {
          throw setError(response)
        }
      })
      .then(() => {
        dispatch(deleteCardMemberSuccess({
          card_id: card_id,
          member_id: user_id
        }))
      })
      .catch(error => {
        dispatch(updateCardFailure(error))
      })
  }
}

export function addCardMember(card_id, data) {
  return (dispatch, getState) => {
    const options = setOptions(getState(), 'POST', data)

    dispatch(updateCardRequest())

    return fetch(`${baseURL}/cards/${card_id}/memberships`, options)
      .then(response => {
        if (!response.ok) {
          throw setError(response)
        }
        return response.json()
      }).then(json => {
        dispatch(addCardMemberSuccess(json))
      }).catch(error => {
        dispatch(updateCardFailure(error))
      })
  }
}

export function updateCard(data, card_id) {
  return (dispatch, getState) => {
    const options = setOptions(getState(), 'PUT', { card: data })
    dispatch(updateCardRequest())

    return fetch(`${baseURL}/cards/${card_id}`, options)
      .then(response => {
        if (!response.ok) {
          throw setError(response)
        }
        return response.json()
      }).then(json => {
        const massaged = arrayToObjectByID([json])
        dispatch(updateCardSuccess(massaged))
      }).catch(error => {
        dispatch(updateCardFailure(error))
      })
  }
}

export function updateCardList(data, card_id, old_list_id) {
  return (dispatch, getState) => {
    const options = setOptions(getState(), 'PUT', { card: data })
    dispatch(updateCardRequest())

    return fetch(`${baseURL}/cards/${card_id}`, options)
      .then(response => {
        if (!response.ok) {
          throw setError(response)
        }
        return response.json()
      }).then(json => {
        const massaged = arrayToObjectByID([json])
        dispatch(updateCardListSuccess({
          card_id: card_id,
          new_list_id: parseInt(data.list_id),
          old_list_id: old_list_id
        }))
      }).catch(error => {
        dispatch(updateCardFailure(error))
      })
  }
}


export function loadCard(card_id) {
  return (dispatch, getState) => {
    const options = setOptions(getState(), 'GET')

    dispatch(getCardRequest())

    return fetch(`${baseURL}/cards/${card_id}`, options)
      .then(response => {
        if (!response.ok) {
          throw setError(response)
        }
        return response.json()
      }).then(json => {
        dispatch(getCardSuccess(json))
      }).catch(error => {
        dispatch(getCardFailure(error))
      })
  }
}

export function deleteCard(list_id, card_id) {
  return (dispatch, getState) => {
    const options = setOptions(getState(), 'DELETE')
    dispatch(updateCardRequest())

    return fetch(`${baseURL}/lists/${list_id}/cards/${card_id}`, options)
      .then(response => {
        if (!response.ok) {
          throw setError(response)
        }

      }).then(() => {
        dispatch(deleteCardSuccess({ list_id: list_id, card_id: card_id }))
      }).catch(error => {
        dispatch(deleteCardFailure(error))
      })
  }


}