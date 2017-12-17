import PropTypes from 'prop-types'

const Store = (initialState, options = {}) => {
  let currentState = initialState || {}
  let listeners = []

  const subscribe = listener => {
    listeners.push(listener)

    return () => (listeners = listeners.filter(x => x !== listener))
  }

  const update = updateFn => {
    const nextSubState = updateFn(currentState)
    currentState = {
      ...currentState,
      ...nextSubState
    }

    if (options.stateTypes) {
      PropTypes.checkPropTypes(
        options.stateTypes,
        currentState,
        'substate',
        'state'
      )
    }

    listeners.forEach(x => x(currentState))
  }

  return {
    update,
    subscribe,
    get: () => currentState
  }
}

export default Store
