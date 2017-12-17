import { Component } from 'react'
import PropTypes from 'prop-types'

class StateProvider extends Component {
  static propTypes = {
    state: PropTypes.shape({
      update: PropTypes.func.isRequired,
      subscribe: PropTypes.func.isRequired
    }).isRequired
  }

  static childContextTypes = {
    state: PropTypes.object
  }

  getChildContext () {
    return {
      state: this.props.state
    }
  }

  render () {
    return this.props.children
  }
}

export default StateProvider
