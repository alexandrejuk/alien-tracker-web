import { applyMiddleware, createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import rootReducer from './rootReducer'

const persistConfig = {
  key: 'root',
  whitelist: ['login'],
  storage,
}
const persistedReducer = persistReducer(persistConfig, rootReducer)


const configureStore = (preloadedState) => {
  const middlewares = []
  const middlewareEnhancer = applyMiddleware(...middlewares)

  const enhancers = [middlewareEnhancer]
  const composedEnhancers = composeWithDevTools(...enhancers)

  const store = createStore(persistedReducer, preloadedState, composedEnhancers)

  return store
}

export default () => {
  const store = configureStore()
  const persistor = persistStore(store)
  return { store, persistor }
}
