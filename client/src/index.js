import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import './stylesheets/index.scss'
import LoginContainer from './containers/LoginContainer'
import AuthContainer from './containers/AuthContainer'
import index from './reducers/index'


const store = createStore(index, applyMiddleware(thunk));


ReactDOM.render(
  <Provider store={store}>
  <AuthContainer />
   </Provider>, document.getElementById('root')
)