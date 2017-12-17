import React, { Component } from 'react'
import PropTypes from 'prop-types'

const connect = mapStateToProps => WrappedComponent => {
  class ConnectedComponent extends Component {
    constructor (props, { state }) {
      super(props)

      this.state = { connectState: {} }

      this.unsubscribe = state.subscribe(connectState =>
        this.setState({ connectState })
      )
    }

    static contextTypes = {
      state: PropTypes.object
    }

    componentWillUnmount () {
      this.unsubscribe()
    }

    render () {
      const state = this.context.state.get()
      const applyUpdate = update => () => this.context.state.update(update)
      const connectedProps = mapStateToProps(state, this.props, applyUpdate)

      return <WrappedComponent {...this.props} {...connectedProps} />
    }
  }

  return ConnectedComponent
}

export default connect
