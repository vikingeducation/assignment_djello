import React, { Component } from 'react'
import Board from '../components/Board'
import { connect } from 'react-redux'
import { loadBoard, updateBoard, deleteBoard, createBoard } from '../actions/boardActions'
import { createList } from '../actions/listActions'
import serialize from 'form-serialize'

const mapStateToProps = (state) => {
  return {
    board: state.board,
    list_ids: state.board.list_ids || [],
    errors: state.board.errors
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    loadBoard: () => {
      dispatch(loadBoard())
    },
    updateBoard: (form, board_id) => {
      const data = serialize(form, { hash: true })
      dispatch(updateBoard(data, board_id))
      form.reset()
    },
    deleteBoard: (id) => {
      dispatch(deleteBoard(id)).then(() => {
        dispatch(loadBoard())
      })
    },
    createBoard: (data) => {
      dispatch(createBoard(data))
    },
    selectBoard: (board_id) => {
      dispatch(loadBoard(board_id))
    },
    createList: (data, board_id) => {
      dispatch(createList(data, board_id))
    }
  }
}

class BoardContainer extends Component {

  componentDidMount() {
    this.props.loadBoard()
  }



  render() {
    return (<Board {...this.props} />)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BoardContainer)