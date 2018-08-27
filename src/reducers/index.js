import { combineReducers } from 'redux'
import Account from './accountReducer'
import Transfer from './transferReducer'
export default combineReducers({
  Account,
  Transfer
})