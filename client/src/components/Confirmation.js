import React, { Component } from 'react'
import { Button, Modal, ModalBody, ModalFooter } from 'reactstrap'
import PropTypes from 'prop-types'

export default class Confirmation extends Component {
  constructor(props) {
    super(props)
    this.state = {
      modal: false
    }
    this.toggle = this.toggle.bind(this)
    this.confirmAction = this.confirmAction.bind(this)
  }

  toggle(e) {
    e.preventDefault()
    this.setState({
      modal: !this.state.modal
    })
  }

  confirmAction(e) {
    e.preventDefault()
    this.setState({
      modal: !this.state.modal
    }, this.props.confirmationAction())
  }

  render() {
    return (
      <div className={this.props.className}>
        <a href="#" onClick={this.toggle} className="text-muted">{this.props.buttonLabel}</a>
        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalBody>
            {this.props.children}
          </ModalBody>
          <ModalFooter>
            <Button color="danger" onClick={this.confirmAction}>{this.props.confirmationLabel}</Button>{' '}
            <Button color="secondary" onClick={this.toggle}>Cancel</Button>
          </ModalFooter>
        </Modal>
      </div>
    )
  }
}

Confirmation.propTypes = {
  buttonLabel: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element
  ]).isRequired,
  confirmationAction: PropTypes.func.isRequired,
  confirmationLabel: PropTypes.string.isRequired,
  className: PropTypes.string,
}