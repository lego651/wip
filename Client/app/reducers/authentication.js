import constants from '../constants/authentication'

var initialState = {
  error: '',
  logged: false,
  user: null
}

const removeById = (array, id) => {
  return array.filter((item) => item.id !== id)
}
export default(state = initialState, action) => {
  switch(action.type) {
    case constants.SIGN_UP:
      return {...state, user: action.user }
    case constants.GET_USER_INFO:
      return {...state, user: action.user }
    case constants.LOGGED_IN:
      return {...state, error: '', logged: true }
    case constants.SIGN_OUT:
      return {...state, error: '', logged: false, user: null }
    case constants.SIGN_ERROR:
      return {...state, error: action.errorMessage }
    case constants.POST_WATCHLIST:
      return {
        ...state,
        user: {
          ...state.user,
          watchList: [...state.user.watchList, action.newItem]
        }
      }
    case constants.DELETE_WATCHLIST:
      return {
        ...state,
        user: {
          ...state.user,
          watchList: removeById(state.user.watchList, action.id)
        }
      }
      // const currentList = [...state.user.watchList]
      // const indexToDelete = currentList.findIndex(
      //   function(item){
      //     item.id === action.id
      //   }
      // )
      // return {
      //   ...state,
      //   user: {
      //     ...state.user,
      //     watchList: [...currentList.slice(0, indexToDelete),
      //     ...currentList.slice(indexToDelete + 1)]
      //   }
      // }
    default:
      return state
  }
}
