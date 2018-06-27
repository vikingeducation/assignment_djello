import React, { Component } from 'react'
import { connect } from 'react-redux'
import { reduxForm, Field } from 'redux-form'
import List from './List';
import { listDelete, listUpdate } from './actions'
import Messages from '../notifications/Messages'  
import Errors from '../notifications/Errors'


class ListContainer extends Component {

	state = {
		list: this.props.list,
		showTitle: false,
		showDescription: false,
	}

	componentWillReceiveProps(nextProps) {
  	if (nextProps.list !== this.state.list) {
   		this.setState({ list: nextProps.list,
    		showTitle: false,
			showDescription: false, });
  		}
	}

	handleUpdate = (e) => {
		e.preventDefault();
		this.props.listUpdate(this.props.client, this.state.list);
	}

	handleDelete = (e) => {
		e.preventDefault();
		this.props.listDelete(this.props.client, this.state.list);
	}

	handleChange = (e) => {
		this.setState({
			list: {
				...this.state.list,
				[e.target.name]: e.target.value
			}
		})
	}

	handleEditTitle = (e) => {
		this.setState({
			showTitle: !this.state.showTitle
		})
	}

	handleEditDescription= (e) => {
		this.setState({
			showDescription: !this.state.showDescription
		})
	}

	render() {

		
		const { showTitle, showDescription, list } = this.state;

		if(list) {
			return <List 
						list={list}
						handleDelete={this.handleDelete} 
						handleEditTitle={this.handleEditTitle} 
						handleEditDescription={this.handleEditDescription}
						handleUpdate={this.handleUpdate}
						handleChange={this.handleChange}
						showTitle={showTitle}
						showDescription={showDescription}
					/>  
		} else {
			return <p>No List Found!</p>
		}
	}
}

const getList = (state, ownProps) => {
	return state.list.lists.byId[ownProps.listId];
}

const mapStateToProps = (state, ownProps) => ({
	list: getList(state, ownProps),
	client: state.client
})

const connected = connect(mapStateToProps, { listDelete, listUpdate })(ListContainer);

export default connected;
