import React, { Component } from 'react'
import { connect } from 'react-redux'
import List from '../components/List'
import serialize from 'form-serialize'
import { updateList, deleteList } from '../actions/listActions'
import { createCard, updateCard } from '../actions/cardActions'
import { arrayMove } from 'react-sortable-hoc'

function newCardPositions(card_ids) {
  let data = {}
  card_ids.map((item, index) => {
    data[item] = { id: item, position: index }
  })
  return data
}

const mapStateToProps = (state, props) => {
  return {
    list: state.list.lists[props.id],
    card_ids: state.list.lists[props.id]['card_ids'],
    error: state.list.error,
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    updateList: (form, id) => {
      const data = serialize(form, { hash: true })
      dispatch(updateList(data, ownProps.id))
    },
    deleteList: () => {
      dispatch(deleteList(ownProps.id))
    },
    createCard: (data) => {
      dispatch(createCard(data, ownProps.id))
    },
    updateCardPositions: (card_ids) => {
      dispatch(updateList({ cards_attributes: newCardPositions(card_ids) }, ownProps.id))
    }
  }
}

class ListContainer extends Component {

  constructor(props) {
    super(props)
    this.state = {
      card_ids: props.card_ids
    }
    this.onSortEnd = this.onSortEnd.bind(this)
  }

  onSortEnd({ oldIndex, newIndex }) {
    const new_positions = arrayMove(this.state.card_ids, oldIndex, newIndex)
    this.setState({
      card_ids: new_positions
    }, this.props.updateCardPositions(new_positions))
  }

  componentWillReceiveProps(nextP) {
    if (this.state.card_ids != nextP.card_ids) {
      this.setState({ card_ids: nextP.card_ids })
    }
  }

  render() {
    return (<List {...this.props} onSortEnd={this.onSortEnd} card_ids={this.state.card_ids} />)
  }
}



export default connect(mapStateToProps, mapDispatchToProps)(ListContainer)