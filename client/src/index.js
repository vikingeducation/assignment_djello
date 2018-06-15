import React from 'react';
import ReactDOM from 'react-dom';
import { applyMiddleware, createStore, compose } from 'redux' 
import { Provider } from 'react-redux' 
import createSagaMiddleware from 'redux-saga'

// CSS
import 'bootstrap/dist/css/bootstrap.css';

// Import all of our components
import App from './App'  

// Import the index reducer and sagas
import IndexReducer from './index-reducer'  
import IndexSagas from './index-sagas'

// Setup the middleware to watch between the Reducers and the Actions
const sagaMiddleware = createSagaMiddleware()

/*eslint-disable */
const composeSetup = process.env.NODE_ENV !== 'production' && typeof window === 'object' &&  
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : compose
/*eslint-enable */

const store = createStore(  
  IndexReducer,
  composeSetup(applyMiddleware(sagaMiddleware)), // allows redux devtools to watch sagas
)

// Begin our Index Saga
sagaMiddleware.run(IndexSagas)

// Setup the top level router component for our React Router
ReactDOM.render(  
  <Provider store={store}>
    <App store={store} />
  </Provider>,
  document.getElementById('root'),
)
