import { createStore, applyMiddleware, compose } from 'redux'
import rootReducer from '../reducers'
// import thunk from 'redux-thunk'
import thunkMiddleware from 'redux-thunk'

export default function configureStore(initialState) {
    const store = createStore(
      rootReducer,
      initialState,
      // 触发 redux-devtools
      // window.devToolsExtension ? window.devToolsExtension() : undefined
      compose(
        applyMiddleware(thunkMiddleware),
        window.devToolsExtension ? window.devToolsExtension() : undefined
      )
    )
    return store
}
