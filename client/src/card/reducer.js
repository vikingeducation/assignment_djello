const {
	CARD_CREATING,
	CARD_CREATE_SUCCESS,
	CARD_CREATE_ERROR,
	CARD_UPDATING,
	CARD_UPDATE_SUCCESS,
	CARD_UPDATE_ERROR,
	CARD_DELETING,
	CARD_DELETE_SUCCESS,
	CARD_DELETE_ERROR,
	CARD_SET_CURRENT,
	CARD_SET,
	LIST_CARD_DELETE_SUCCESS,
} = require('./constants');


const initialState = {
	cards: {
		byId: {},
		allIds: [],
	},
	requesting: false,
	successful: false,
	messages: [],
	errors: [],
}


function removeItemArray(array, obj) {
	return array.filter(item => {
		return item !== obj._id;
	})
}

function removeItemObject(obj, toRemove) {
	const key = toRemove._id
	const { [key]: del, ...restOfItems } = obj

	return restOfItems
}

function findIds(obj, id) {

	const idsToRemove = [];

	for(var item in obj) {
		if(obj[item].listId == id) {
			idsToRemove.push(obj[item]._id)
		}
	}

	return idsToRemove;

}

function removeCardsByListId(obj, list) {

	return Object.keys(obj).reduce((acc, key) => {
		if(obj[key].listId !== list._id) {
			return {...acc, [key]: obj[key]}
		}
		return acc;
	}, {})
}

function removeCardIdsByListId(obj, list) {

	return Object.keys(obj).reduce((acc, key) => {
		if(obj[key].listId !== list._id) {
			return [ ...acc, obj[key]._id ]
		}
		return acc;
	}, [])
}

const reducer = function(state = initialState, action) {
	switch(action.type) {
		case CARD_SET_CURRENT: 
			return {
				...state,
				current: action.cardId,
			}
		
		case CARD_SET: 
			return {
				cards: {
					byId: action.cards.byId,
					allIds: action.cards.allIds,
				},
				requesting: false,
				successful: true,
				messages: [],
				errors: [],
			}

		case CARD_CREATING: 
			return {
				...state,
				requesting: true,
				successful: false,
				messages: [{
					body: `Card ${ action.card.title } being created...`,
					time: new Date(),
				}],
				errors: [],
			}

		case CARD_CREATE_SUCCESS:
			return {
				cards: {
					byId: {
						...state.cards.byId,
						[action.card._id]: action.card,
					},
					allIds: [
						...state.cards.allIds,
						action.card._id
					]
				},
				requesting: false,
				successful: true,
				messages: [{
					body: `Board: ${ action.card.title } created!`,
					time: new Date(),
				}],
				errors: [],
			}

		case CARD_CREATE_ERROR:
			return {
				...state,
				requesting: false,
				successful: false,
				errors: state.errors.concat([{
					body: action.error.toString(),
					time: new Date(),
				}])
			}

		case CARD_UPDATING:
			return {
				...state,
				requesting: true,
				successful: false,
				messages: [{
					body: `Card ${ action.card._id } being updated...`,
					time: new Date(),
				}],
				errors: [],
			}

		case CARD_UPDATE_SUCCESS:
			return {
				...state,
				cards: {
					...state.cards,
					byId: {
						...state.cards.byId,
						[action.card._id]: action.card
					}
				},
				requesting: false,
				successful: true,
				messages: [{
					body: `Card: ${ action.card._id } updated!`,
					time: new Date(),
				}],
				errors: [],
			}

		case CARD_UPDATE_ERROR:
			return {
				...state,
				requesting: false,
				successful: false,
				messsages: [],
				errors: state.errors.concat([{
					body: action.error.toString(),
					time: new Date(),
				}])
			}

		case CARD_UPDATING:
			return {
				...state,
				requesting: true,
				successful: false,
				messages: [{
					body: `Card ${ action.card.title } being deleted...`,
					time: new Date(),
				}],
				errors: [],
			}

		case CARD_DELETE_SUCCESS:
			return {
				...state,
				cards: {
					allIds: removeItemArray(state.cards.allIds, action.card),
					byId: removeItemObject(state.cards.byId, action.card)
				},
				requesting: false,
				successful: true,
				messages: [{
					body: `List: ${ action.card.title } deleted!`,
					time: new Date(),
				}],
			}

		case CARD_DELETE_ERROR:
			return {
				...state,
				requesting: false,
				successful: false,
				messages: [],
				errors: state.errors.concat([{
					body: action.error.toString(),
					time: new Date(),
				}])
			}

		case LIST_CARD_DELETE_SUCCESS:
			return {
				...state,
				cards: {
					byId: removeCardsByListId(state.cards.byId, action.list),
					allIds: removeCardIdsByListId(state.cards.byId, action.list),
				}
			}

		default:
			return state;

	}
}

export default reducer;