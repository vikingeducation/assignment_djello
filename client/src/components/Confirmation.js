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
    this.escape = this.escape.bind(this)
  }

  toggle() {
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

  escape(e) {
    if (e.keyCode === 27) {
      this.setState({
        modal: false
      })
    }
  }

  componentDidMount() {
    document.addEventListener('keyup', this.escape)
  }

  componentWillUnmount() {
    document.removeEventListener('keyup', this.escape)
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
            <Button color="danger" onClick={this.confirmAction} size="sm">{this.props.confirmationLabel}</Button>{' '}
            <Button color="secondary" onClick={this.toggle} size="sm">Cancel</Button>
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