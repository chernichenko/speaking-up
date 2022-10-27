import { combineReducers } from 'redux'
import authReducer from './reducers/authSlice'

const reducers = {
  auth: authReducer,
}

const rootReducer = combineReducers(reducers)

export default rootReducer
