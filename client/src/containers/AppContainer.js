import React, { Component } from 'react'
import { connect } from 'react-redux'
import App from '../components/App'
import { getUser } from '../actions/userActions'
import { logoutUser } from '../actions/authActions'


const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getUser: () => {
      dispatch(getUser())
    },

    logout: () => {
      dispatch(logoutUser())
    }
  }
}

class AppContainer extends Component {
  componentDidMount() {
    this.props.getUser()
  }

  render() {

    return (
      <App {...this.props} />
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AppContainer)