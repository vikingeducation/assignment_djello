import { setChangedCard } from "./lists";
export const GET_CURRENT_CARD_REQUEST = "GET_CURRENT_CARD_REQUEST";
export const GET_CURRENT_CARD_SUCCESS = "GET_CURRENT_CARD_SUCCESS";
export const GET_CURRENT_CARD_FAILURE = "GET_CURRENT_CARD_FAILURE";

export function getCurrentCardRequest() {
  return {
    type: GET_CURRENT_CARD_REQUEST
  };
}

export function getCurrentCardSuccess(data) {
  return {
    type: GET_CURRENT_CARD_SUCCESS,
    data
  };
}

export function getCurrentCardFailure(error) {
  return {
    type: GET_CURRENT_CARD_FAILURE,
    error
  };
}

export function getCurrentCard(token, cardId) {
  let config = {
    method: "GET",
    headers: { Authorization: "Bearer " + token }
  };

  return dispatch => {
    dispatch(getCurrentCardRequest());

    fetch(`api/v1/cards/${cardId}`, config)
      .then(response => {
        if (!response.ok) {
          throw new Error(`${response.status}: ${response.statusText}`);
        }

        return response.json();
      })
      .then(json => {
        dispatch(getCurrentCardSuccess(json.data));
      })
      .catch(error => {
        dispatch(getCurrentCardFailure(error));
      });
  };
}

export function addMemberToCurrentCard(token, cardId, newMemberId) {
  let config = {
    method: "POST",
    headers: { Authorization: "Bearer " + token }
  };

  return dispatch => {
    dispatch(getCurrentCardRequest());

    fetch(`api/v1/cards/${cardId}/users/${newMemberId}`, config)
      .then(response => {
        if (!response.ok) {
          throw new Error(`${response.status}: ${response.statusText}`);
        }

        return response.json();
      })
      .then(json => {
        dispatch(getCurrentCardSuccess(json.data));
        dispatch(setChangedCard(json.data));
      })
      .catch(error => {
        dispatch(getCurrentCardFailure(error));
      });
  };
}

export function removeMemberFromCurrentCard(token, cardId, memberId) {
  let config = {
    method: "DELETE",
    headers: { Authorization: "Bearer " + token }
  };

  return dispatch => {
    dispatch(getCurrentCardRequest());

    fetch(`api/v1/cards/${cardId}/users/${memberId}`, config)
      .then(response => {
        if (!response.ok) {
          throw new Error(`${response.status}: ${response.statusText}`);
        }

        return response.json();
      })
      .then(json => {
        dispatch(getCurrentCardSuccess(json.data));
        dispatch(setChangedCard(json.data));
      })
      .catch(error => {
        dispatch(getCurrentCardFailure(error));
      });
  };
}
