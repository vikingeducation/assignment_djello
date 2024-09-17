import React, { Component } from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input } from 'reactstrap'
import serialize from 'form-serialize'
import { validateListCreator } from '../helpers/validateListCreator'
import ValidationErrorMessage from './ValidationErrorMessage'

const isValid = (value) => {
  return value ? false : null
}

export default class ListCreator extends Component {
  constructor(props) {
    super(props)
    this.state = {
      modal: false,
      feedback: {}
    }
    this.toggle = this.toggle.bind(this)
    this.create = this.create.bind(this)
    this.escape = this.escape.bind(this)
  }

  toggle() {
    this.setState({
      modal: !this.state.modal
    })
  }

  create(e) {
    e.preventDefault()
    const form = e.target
    const data = serialize(form, { hash: true })
    const formErrors = validateListCreator(data)
    if (formErrors) {
      this.setState({ feedback: (formErrors || {}) })
    } else {
      this.setState({
          modal: !this.state.modal,
          feedback: (formErrors || {})
        },
        this.props.create(data, this.props.board_id))
    }
  }

  escape(e) {
    if (e.keyCode === 27) {
      this.setState({ modal: false })
    }
  }

  componentDidMount() {
    document.addEventListener('keyup', this.escape)
  }

  componentWillUnmount() {
    document.removeEventListener('keyup', this.escape)
  }


  render() {

    const { feedback } = this.state
    return (
      <div className={this.props.className}>
  	<Button onClick={this.toggle} color="primary" size="sm">Add List</Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle}>
            <Form onSubmit={this.create}>
        <ModalHeader toggle={this.toggle}>Create New List</ModalHeader>
          <ModalBody>
             <FormGroup>
          <Label for="title">Title<span className="text-danger">*</span></Label>
          <Input type="title" name="title" valid={isValid(feedback['title'])} />
    <ValidationErrorMessage message={feedback['title']} />
        </FormGroup>
        <FormGroup>
         <Label for="description">Description</Label>
          <Input type="textarea" name="description" />
        </FormGroup>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" size="sm">Add List</Button>{' '}
            <Button color="secondary" onClick={this.toggle} size="sm">Cancel</Button>
          </ModalFooter>
            </Form>
        </Modal>
      </div>
    )
  }
}