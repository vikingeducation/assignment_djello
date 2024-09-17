import React, { Component } from 'react'
import { connect } from 'react-redux'
import Login from '../components/Login'
import serialize from 'form-serialize'
import { login, loginFormErrors } from '../actions/authActions'
import { signup } from '../actions/userActions'
import AppContainer from './AppContainer'
import Signup from '../components/Signup'


const mapStateToProps = (state) => {
  return {
    isLoggedIn: !!state.auth.token,
    feedback: state.auth.feedback,
    authError: state.auth.error,
    userError: state.user.error,
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    login: (form) => {
      dispatch(login(form))
    },
    signup: (form) => {
      dispatch(signup(form))
    }
  }
}

class AuthContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      login: true,
    }
    this.toggle = this.toggle.bind(this)
  }


  toggle() {
    this.setState({
      login: !this.state.login
    })
  }

  render() {
    const { isLoggedIn, userError, ...rest } = this.props
    const { login } = this.state

    if (isLoggedIn) {
      return (<div><AppContainer /></div>)
    }
    if (login) {
      return (<Login {...rest} toggle={this.toggle} />)
    } else {
      return (<Signup toggle={this.toggle} signup={this.props.signup} userError={userError} />)
    }

  }
}



export default connect(mapStateToProps, mapDispatchToProps)(AuthContainer)