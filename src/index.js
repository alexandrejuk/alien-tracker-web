import React from 'react'
import { PersistGate } from 'redux-persist/integration/react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'

import './index.css'
import Root from './pages/Root'
import registerServiceWorker from './registerServiceWorker'
import getState from './state'

const {
  persistor,
  store,
} = getState()

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <Root />
    </PersistGate>
  </Provider>,
  document.getElementById('root'))

registerServiceWorker()
