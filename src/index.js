import 'reset.css/reset.css'
import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import { BrowserRouter } from 'react-router-dom'
import App from 'components/App'
import StateProvider from 'components/State'
import State from 'state'
import persistState from 'state/persist'
import registerServiceWorker from './registerServiceWorker'

const defaultState = {
  theme: '#3F51B5',
  hasShinyCharm: false,
  chains: {}
}
let initialState

try {
  const fromStorage = window.localStorage.getItem('state')

  if (fromStorage) {
    initialState = JSON.parse(fromStorage)
  } else {
    initialState = defaultState
  }
} catch (err) {
  initialState = defaultState
}

const state = State(initialState, {
  stateTypes: {
    theme: PropTypes.string.isRequired,
    hasShinyCharm: PropTypes.bool.isRequired,
    chains: PropTypes.objectOf(PropTypes.number).isRequired
  }
})

persistState(state)

ReactDOM.render(
  <BrowserRouter>
    <StateProvider state={state}>
      <App />
    </StateProvider>
  </BrowserRouter>,
  document.getElementById('root')
)
registerServiceWorker()
