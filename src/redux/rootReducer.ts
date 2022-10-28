import { combineReducers } from 'redux'
import authReducer from './reducers/authSlice'
import eventsReducer from './reducers/eventsSlice'

const reducers = {
  auth: authReducer,
  events: eventsReducer,
}

const rootReducer = combineReducers(reducers)

export default rootReducer
