import React, { Component } from 'react'
import { connect } from 'react-redux'
import ListCard from '../components/ListCard'
import { loadCard, updateCard, removeCardMember, addCardMember } from '../actions/cardActions'
import serialize from 'form-serialize'

const mapStateToProps = (state, props) => {

  return {
    card: state.board.cards[props.id], // title
    details: state.card.cards[props.id] || {},
    users: state.board.current.board_members,
    isFetching: state.card.isFetching,
    list: state.board.lists[props.list_id],
    id: props.id
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    loadCard: () => {
      dispatch(loadCard(ownProps.id))
    },
    editCard: (form) => {
      const data = serialize(form, { hash: true })
      dispatch(updateCard(data, ownProps.id))
    },
    markDone: (e) => {
      e.preventDefault()
      dispatch(updateCard({ done: true }, ownProps.id))
    },
    markIncomplete: (e) => {
      e.preventDefault()
      dispatch(updateCard({ done: false }, ownProps.id))
    },
    changeList: (e) => {
      e.preventDefault()
    },
    removeMember: (member_id) => {
      console.log('removeMember', member_id)
      dispatch(removeCardMember(ownProps.id, member_id))
    },
    addMember: (form) => {
      const data = serialize(form, { hash: true })
      if (data) {
        dispatch(addCardMember(ownProps.id, data))
      }
    }
  }
}



export default connect(mapStateToProps, mapDispatchToProps)(ListCard)