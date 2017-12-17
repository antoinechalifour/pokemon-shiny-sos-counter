import { Component } from 'react'
import PropTypes from 'prop-types'
import connect from 'components/State/connect'

const updateChain = fn => id => state => ({
  chains: {
    ...state.chains,
    [id]: fn(state.chains[id] || 0)
  }
})

const increment = updateChain(x => x + 1)
const decrement = updateChain(x => x - 1)

const mapStateToProps = (state, props, applyUpdate) => {
  const id = props.id

  return {
    increment: applyUpdate(increment(id)),
    decrement: applyUpdate(decrement(id))
  }
}

class Shortcuts extends Component {
  static propTypes = {
    increment: PropTypes.func.isRequired,
    decrement: PropTypes.func.isRequired
  }

  componentDidMount () {
    window.addEventListener('keyup', this.onKeyUp)
  }

  componentWillUnmount () {
    window.removeEventListener('keyup', this.onKeyUp)
  }

  onKeyUp = e => {
    const commands = {
      13: this.props.increment, // ENTER
      32: this.props.increment, // SPACE
      38: this.props.increment, // UP
      39: this.props.increment, // RIGHT,
      37: this.props.decrement, // LEFT
      40: this.props.decrement // DOWN
    }

    if (e.target.tagName !== 'INPUT' && commands[e.keyCode]) {
      commands[e.keyCode]()
    }
  }

  render () {
    return null
  }
}

export default connect(mapStateToProps)(Shortcuts)
