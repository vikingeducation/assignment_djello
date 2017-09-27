import { getOneList } from "./list";
export const START_REQUEST = "REQUESTING ACITON FROM SERVER";
// export const DELETE_REQUEST_SUCCESS = "SUCCESSFUL REQUEST";
// export const GET_CARDS_SUCCESS = "GOT ALL THE CARDS";
// export const GET_CARD_SUCCESS = "GOT A CARD";
export const CREATE_CARD_SUCCESS = "CARD SUCCESSFULLY CREATED";
export const CARD_FAILURE = "FAILURE WITH CARDS";

const startRequest = () => {
  return {
    type: START_REQUEST,
    data: null
  };
};
const createCardSuccess = card => {
  return {
    type: CREATE_CARD_SUCCESS,
    data: card
  };
};
const cardFailure = error => {
  return {
    type: CARD_FAILURE,
    data: error
  };
};

export const createCard = listId => async dispatch => {
  dispatch(startRequest());
  let card;
  let serverResponse;
  try {
    const data = JSON.stringify({ listId });
    let headers = new Headers();
    headers.append("Content-type", "application/json");
    serverResponse = await fetch("/cards", {
      headers,
      method: "POST",
      body: data
    });
  } catch (e) {
    console.log("error from creating");
    console.error(e);
    dispatch(cardFailure(e));
  }
  try {
    if (serverResponse.status == 200) {
      card = await serverResponse.json();
      //trying the RESTFUL api style now
      //update the list
      const success = await dispatch(getOneList(listId));
      dispatch(createCardSuccess(card));
    } else {
      //TODO: SET ERROR LATER
      console.log("error from server");
      const e = new Error("server rejected adding a board");
      console.error(e);
      dispatch(cardFailure(e));
    }
  } catch (e) {
    console.log("error from response parsing");
    console.error(e);
    dispatch(cardFailure(e));
  }
  return card;
};
