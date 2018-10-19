import axios from 'axios'

import constants from '../constants/authentication'
import config from '../../config.js'
import { history } from '../router/historyRouter'

export function postWatchList(newItem){
  return function(dispatch){
    return dispatch({
      type: constants.POST_WATCHLIST,
      newItem
    })
  }
}

export function deleteWatchList(id){
  return function(dispatch){
    return dispatch({
      type: constants.DELETE_WATCHLIST,
      id
    })
  }
}

// 在React端传入一个Obj 代表 user就行了
// 需要有 obj.email, obj.password, obj.name
export function signUp(user){
  return function(dispatch) {
    // console.log("signUp Action data is" + JSON.stringify(user))
    const signupUrl = config.hostUrl + '/signup'

    axios.post(signupUrl, user)
    .then(response => {
      console.log(response.data.token)
      localStorage.setItem('token', response.data.token)
      dispatch(reducerLoggedIn())
      // dispatch(getUserInfo(response.data.token))
      dispatch(getUserInfoRedirectToHome(response.data.token))
    })
    .catch(result => {
      const errorMessage = result.response.data.message
      dispatch(reducerSignError(errorMessage))
    })
  }
}

// 在React端传入一个Obj 代表 user就行了
// 此时只有 obj.email, obj.password
export function signIn(user){
  return function(dispatch) {
    console.log("signIn Action data is" + JSON.stringify(user))
    const signinUrl = config.hostUrl + '/signin'

    axios.post(signinUrl, user)
    .then(response => {
      console.log(response.data)
      localStorage.setItem('token', response.data.token) // 这里确认是SUCCESS
      dispatch(reducerLoggedIn()) // 这里确认是SUCCESS
      // dispatch(getUserInfo(response.data.token)) // 这里确认是SUCCESS
      dispatch(getUserInfoRedirectToTest(response.data.token))
      // dispatch(gerUserInfoRedirectToHome(response.data.token)) // 确认这里是 ERROR
    })
    .catch(result => {
      console.log(result.response.data)
      const errorMessage = result.response.data.message
      dispatch(reducerSignError(errorMessage))
    })
  }
}

export function getUserInfo(token=null){
  return function(dispatch){
    if(token && token.length > 0){
      const URL = config.hostUrl + '/token'
      axios.get(URL, {headers: { authorization: token }})
      .then(response => {
        return dispatch(reducerSyncUserData(response.data))
      })
      .catch(response => {
        console.log('getUserInfo action error')
      })
    } else {
      return dispatch(reducerSyncUserData(null))
    }
  }
}

export function getUserInfoRedirectToTest(token=null){
  return function(dispatch){
    if(token && token.length > 0){
      const URL = config.hostUrl + '/token'
      axios.get(URL, {headers: { authorization: token }})
      .then(response => {
        history.push('/#/signup')
        return dispatch(reducerSyncUserData(response.data))
      })
      // .then(result => {
      //   history.push('/signup')
      // })
      .catch(response => {
        console.log('getUserInfoRedirectToHome action error')
      })
    } else {
      return dispatch(reducerSyncUserData(null))
    }
  }
}

export function getUserInfoRedirectToHome(token=null){
  return function(dispatch){
    if(token && token.length > 0){
      const URL = config.hostUrl + '/token'
      axios.get(URL, {headers: { authorization: token }})
      .then(response => {
        return dispatch(reducerSyncUserData(response.data))
      })
      .then(result => {
        return history.push('/')
      })
      .catch(response => {
        console.log('getUserInfoRedirectToHome action error')
      })
    } else {
      return dispatch(reducerSyncUserData(null))
    }
  }
}

export function reducerSyncUserData(data=null){
  return function(dispatch){
    return dispatch({
      type: constants.GET_USER_INFO,
      user: data
    })
  }
}

export function reducerLoggedIn(){
  return function(dispatch){
    return dispatch({
      type: constants.LOGGED_IN
    })
  }
}

export function reducerSignoutUser(){
  return function(dispatch){
    return dispatch({
      type: constants.SIGN_OUT
    })
  }
}
export function reducerSignError(errorMessage){
  return function(dispatch){
    return dispatch({
      type: constants.SIGN_ERROR,
      errorMessage
    })
  }
}
