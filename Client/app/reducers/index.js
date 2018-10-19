import { combineReducers } from 'redux'

import userinfo from './userinfo'
import auth from './authentication'

export default combineReducers({
    userinfo,
    auth
})
