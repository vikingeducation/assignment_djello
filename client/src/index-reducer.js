import { combineReducers } from 'redux'  
import { reducer as form } from 'redux-form'  
import client from './client/reducer'  
import signup from './signup/reducer'  
import login from './login/reducer'  
import board from './board/reducer' 
import data from './dashboard/reducer';

const IndexReducer = combineReducers({  
  signup,
  client,
  login,
  form,
  board,
  data
})

export default IndexReducer  