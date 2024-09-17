import React, { Component } from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Row, Col } from 'reactstrap'
import { SortableElement } from 'react-sortable-hoc'
import EditInPlace from './EditInPlace'
import MemberList from './MemberList'
import SelectInPlace from './SelectInPlace'
import Activity from './Activity'
import Loader from './Loader'


class ListCard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      modal: false,
    }

    this.toggle = this.toggle.bind(this)
    this.markDone = this.markDone.bind(this)
  }

  toggle() {
    this.setState({
      modal: !this.state.modal
    }, () => {
      if (this.state.modal) {
        this.props.loadCard()
      }
    })
  }

  markDone() {
    this.setState({
      modal: !this.state.modal
    }, () => {
      this.props.deleteCard()
    })
  }




  render() {

    const { card, list_id, board, isFetching, lists, users } = this.props
    const { list_ids } = board
    const { title, member_ids, description, activities, id } = card
    let memberList = ''


    if (member_ids) {
      memberList = member_ids.map(member_id => {
        return (
          <MemberList name={users[member_id]['name']} id={member_id} key={`Card-${card.id}-Member-${member_id}`} onRemove={this.props.removeMember} />
        )
      })

    }
    let memberNames = member_ids.map(id => {
      return users[id]['name']
    })

    let listOptions = []
    if (list_ids) {

      listOptions = list_ids.map(id => {

        return (
          <option key={`List-Options-${id}`} value={id} disabled={list_id === id}>{lists[id]['title']}</option>)
      })
    }

    let memberOptions = []
    if (users) {
      for (let userID in users) {
        if (member_ids.indexOf(parseInt(userID)) < 0) {
          memberOptions.push(<option key={`Member-Option-${userID}`} value={userID}>{users[userID].name}</option>)
        }
      }
    }

    return (
      <div>

        <a className="cardlist" onClick={this.toggle}><b>{title}</b><br />
        <span className="small">{memberNames.join(', ')}</span></a>
        <Modal isOpen={this.state.modal} toggle={this.toggle} className="card-modal" key={`ListCardModal-${this.props.id}`}>
          <ModalHeader toggle={this.toggle}>
          <EditInPlace name="title" text={title} placeholder="Card title..." key={`ListCardEditTitle-${this.props.id}`} onSubmit={this.props.editCard} />
          </ModalHeader>
          {
            isFetching ? <Loader isFetching={isFetching} /> : 
          (<ModalBody>
          <Row className="mb-3">
          <Col>
          <a href="#" onClick={this.markDone} className="float-right"> Mark as completed</a>
          <span>List: </span>
          <SelectInPlace onSubmit={this.props.changeList} name="list_id" buttonLabel={lists[list_id]['title']} key={`ChangeCardList-${id}`}>
          {listOptions}
          </SelectInPlace>

         </Col>
          </Row>
           <Row>
           	<Col>
           		<EditInPlace name="description" text={description} tag="p" placeholder="Add a description..."  key={`ListCardEditDescription-${id}`} onSubmit={this.props.editCard} />
           	</Col>
           </Row>
                     <hr />
           <Row>
           	<Col>
           		<h5>Members</h5>
           		{memberList}
           		<SelectInPlace onSubmit={this.props.addMember} name="user_id" buttonLabel="Add Member">
           		{memberOptions}
           		</SelectInPlace>
           	</Col>
           </Row>
           <hr />
           <Row>
           	<Col>
           		<h5>Activity</h5>
           	{ activities ?
           		<Activity activities={activities} users={users} /> : ''
           	}
           	</Col>
           </Row>
          </ModalBody>
          )
          } 
        </Modal>
      </div>
    )
  }
}


export default ListCard