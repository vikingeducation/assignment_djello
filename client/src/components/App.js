import React from 'react'
import Navigation from './Navigation'
import BoardContainer from '../containers/BoardContainer'
import PropTypes from 'prop-types'

const App = (props) => {
  if (props.user.isFetching) {
    return (<div>Loading...</div>)
  }
  return (
    <div>
    	<Navigation {...props} />
    	<BoardContainer />
    </div>)
}

App.propTypes = {
  user: PropTypes.object,
  logout: PropTypes.func
}

export default App