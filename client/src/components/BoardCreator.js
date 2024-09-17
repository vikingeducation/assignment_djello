import React, { Component } from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input } from 'reactstrap'
import serialize from 'form-serialize'
import { validateBoardCreator } from '../helpers/validateBoardCreator'
import ValidationErrorMessage from './ValidationErrorMessage'

const isValid = (value) => {
  return value ? false : null
}

export default class BoardCreator extends Component {
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
    const formErrors = validateBoardCreator(data)
    if (formErrors) {
      this.setState({ feedback: (formErrors || {}) })
    } else {
      this.setState({
          modal: !this.state.modal,
          feedback: (formErrors || {})
        },
        this.props.create(data))
    }
  }

  escape(e) {
    if (e.keyCode == 27) {
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
    const createClass = this.props.button ? 'btn btn-primary' : 'text-primary'
    return (
      <div className={this.props.className}>
        <a href="#" onClick={this.toggle} className={createClass}>New Board</a>
        <Modal isOpen={this.state.modal} toggle={this.toggle}>
            <Form onSubmit={this.create}>
        <ModalHeader toggle={this.toggle}>Create New Board</ModalHeader>
          <ModalBody>
            {this.props.children}
             <FormGroup>
          <Label for="title">Title<span className="text-danger">*</span></Label>
          <Input type="textarea" name="title" valid={isValid(feedback['title'])} />
    <ValidationErrorMessage message={feedback['title']} />
        </FormGroup>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" size="sm">{this.props.actionLabel}</Button>{' '}
            <Button color="secondary" size="sm" onClick={this.toggle}>Cancel</Button>
          </ModalFooter>
            </Form>
        </Modal>
      </div>
    )
  }
}