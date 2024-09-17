import React from 'react'
import Login from '../components/Login'
import { connect } from 'react-redux'
import serialize from 'form-serialize'



const mapDispatchToProps = (dispatch) => {
  return {
    login: (e) => {
      e.preventDefault();
    }
  }
}

export default connect(null, mapDispatchToProps)(Login)