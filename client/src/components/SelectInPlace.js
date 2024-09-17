import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  Form,
  FormGroup,
  Button,
  Input,
  FormText,
  FormFeedback
} from 'reactstrap'


class SelectInPlace extends Component {

  constructor(props) {
    super(props)
    this.state = {
      isEditing: false,
    }
    this.onClick = this.onClick.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
    this.onCancel = this.onCancel.bind(this)
  }

  onClick(e) {
    e.preventDefault()
    this.setState({ isEditing: true })
  }

  onSubmit(e) {
    e.preventDefault()
    this.setState({ isEditing: false }, this.props.onSubmit(e.target))

  }

  onCancel(e) {
    e.preventDefault()
    this.setState({ isEditing: false })
  }



  render() {


    const { options, filter, children, buttonLabel } = this.props
    let optionList = []

    if (options) {
      optionList = options.map(option => {
        if (filter.indexOf(option.id) < 0) {
          return (<option value={option.id} key={`AddMember-${option.id}`}>{option.name}</option>)
        }
      })
    }

    if (this.state.isEditing) {
      return (
        <Form onSubmit={this.onSubmit}>
    <FormGroup className="mt-2 mb-2">
      <Input type="select" name={this.props.name} className="mb-2">
      {children}
      </Input>
      <Button color="primary" size="sm">Add</Button>{' '}
      <a href="#" onClick={this.onCancel} className="text-muted">Cancel</a>
    </FormGroup>
  </Form>

      )
    }

    return (children.length > 0 ? <a href="#" onClick={this.onClick}>{buttonLabel}</a> : null)
  }
}

export default SelectInPlace

SelectInPlace.propTypes = {
  onSubmit: PropTypes.func.isRequired,
}

SelectInPlace.defaultProps = {
  children: []
}