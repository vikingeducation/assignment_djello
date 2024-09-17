import React, { Component } from 'react'
import {
  Button,
  Form,
  FormGroup,
  Input,
  FormText,
  FormFeedback
} from 'reactstrap'
import serialize from 'form-serialize'
import PropTypes from 'prop-types'

export default class CardCreator extends Component {
  constructor() {
    super()
    this.state = {
      editing: false,
      isValid: null
    }
    this.edit = this.edit.bind(this)
    this.save = this.save.bind(this)
  }

  edit(e) {
    e.preventDefault()
    this.setState({
      editing: !this.state.editing
    })
  }

  save(e) {
    e.preventDefault()
    const data = serialize(e.target, { hash: true })
    if (!data.title) {
      this.setState({
        isValid: false
      })
    } else {
      this.setState({
          isValid: null,
          editing: false
        },
        this.props.onSubmit(data)
      )
    }
  }


  render() {
    if (this.state.editing) {
      return (
        <Form onSubmit={this.save}>
        	 <FormGroup>
          <Input type="text" name="title" placeholder="Card title..." valid={this.state.isValid} />
          <FormFeedback>Can't be blank</FormFeedback>
        </FormGroup>
        <Button color="primary" size="sm">Save</Button>
        {' '}<a href="#" onClick={this.edit} className="text-muted">Cancel</a>
        </Form>)
    }
    return (
      <Button color="primary" onClick={this.edit} size="sm">Add a Card</Button>
    )
  }
}

CardCreator.propTypes = {
  onSubmit: PropTypes.func.isRequired
}