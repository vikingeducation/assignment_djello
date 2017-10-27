import { getOneList, updateCardSuccess } from "./list";
export const START_REQUEST = "REQUESTING ACITON FROM SERVER";
export const CREATE_CARD_SUCCESS = "CARD SUCCESSFULLY CREATED";
export const DUMP_CARD_STORE =
  "SUCCESSFULLY DUMPED ALL CARD RELATED REDUX MEMORY";
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

export const dumpCardStore = () => {
  return {
    type: DUMP_CARD_STORE,
    data: null
  };
};

const cardFailure = error => {
  return {
    type: CARD_FAILURE,
    data: error
  };
};

export const createCard = (listId, title) => async dispatch => {
  dispatch(startRequest());
  let card;
  let serverResponse;
  try {
    const data = JSON.stringify({ listId, title });
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
export const getCard = cardId => async dispatch => {
  dispatch(startRequest());
  try {
    ////
  } catch (e) {
    ////
  }
};
export const updateCard = (cardId, updatedFields, listId) => async dispatch => {
  dispatch(startRequest());
  let newCard;
  let serverResponse;
  try {
    const data = JSON.stringify({ card: updatedFields });
    let headers = new Headers();
    headers.append("Content-type", "application/json");
    serverResponse = await fetch(`/cards/${cardId}`, {
      headers,
      method: "PUT",
      body: data
    });
  } catch (e) {
    console.log("error from editing");
    console.error(e);
    dispatch(cardFailure(e));
  }
  try {
    if (serverResponse.status == 200) {
      newCard = await serverResponse.json();
      dispatch(updateCardSuccess(newCard, listId));
    } else {
      //TODO: SET ERROR LATER
      console.log("error from server");
      const e = new Error("server rejected updating a card");
      console.error(e);
      dispatch(cardFailure(e));
    }
  } catch (e) {
    console.log("error from response parsing");
    console.error(e);
    dispatch(cardFailure(e));
  }
  return newCard;
};
