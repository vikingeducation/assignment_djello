import {
	BOARD_CREATING,
	BOARD_CREATE_SUCCESS,
	BOARD_CREATE_ERROR,
	BOARD_UPDATING,
	BOARD_UPDATE_SUCCESS,
	BOARD_UPDATE_ERROR,
	BOARD_DELETING,
	BOARD_DELETE_SUCCESS,
	BOARD_DELETE_ERROR,
	BOARD_SET_CURRENT,
	BOARD_SET,
} from './constants';

export const boardCreate = function boardCreate(client, board) {
	return {
		type: BOARD_CREATING,
		client,
		board,
	}
}

export const boardCreateSuccess = function boardCreateSuccess(board) {
	return {
		type: BOARD_CREATE_SUCCESS,
		board
	}
}

export const boardCreateError = function boardCreateError(error) {
	return {
		type: BOARD_CREATE_ERROR,
		error
	}
}

export const boardUpdate = function boardUpdate(client, board) {
	return {
		type: BOARD_UPDATING,
		client,
		board
	}
}

export const boardUpdateSuccess = function boardUpdateSuccess(board) {
	return {
		type: BOARD_UPDATE_SUCCESS,
		board
	}
}

export const boardUpdateError = function boardUpdateError(error) {
	return {
		type: BOARD_UPDATE_ERROR,
		error
	}
}

export const boardDelete = function boardDelete(client, board) {
	return {
		type: BOARD_DELETING,
		client,
		board,
	}
}

export const boardDeleteSuccess = function boardDeleteSuccess(board) {
	return {
		type: BOARD_DELETE_SUCCESS,
		board
	}
}

export const boardDeleteError = function boardDeleteError(error) {
	return {
		type: BOARD_DELETE_ERROR,
		error
	}
}

export const boardSet = function boardSet(boards) {
	return {
		type: BOARD_SET,
		boards
	}
}

export const boardSetCurrent= function boardSetCurrent(board) {
	return {
		type: BOARD_SET_CURRENT,
		board
	}
}