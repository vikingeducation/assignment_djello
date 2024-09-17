import React from 'react'
import { FormFeedback } from 'reactstrap'

const ValidationErrorMessage = ({ message }) => {
  if (!message) {
    return null
  }
  return (
    <FormFeedback>{message.join(', ')}</FormFeedback>
  )
}

export default ValidationErrorMessage