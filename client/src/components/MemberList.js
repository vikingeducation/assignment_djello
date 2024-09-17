import React from 'react'
import { Row, Col } from 'reactstrap'
import PropTypes from 'prop-types'

const MemberList = ({ name, id, onRemove }) => {

  const onClick = (e) => {
    e.preventDefault()
    onRemove(id)
  }

  return (
    <Row>
    <Col xs={12} sm={8}>
       {name}
    </Col>
    <Col xs={12} sm={4}>
       <a href="#" onClick={onClick}>Remove Member</a>
    </Col>
  </Row>)
}

export default MemberList

MemberList.proptypes = {
  name: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired
}