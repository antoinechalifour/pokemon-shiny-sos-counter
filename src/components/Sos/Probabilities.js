import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

class Probabilities extends Component {
  static propTypes = {
    chain: PropTypes.number.isRequired,
    hasShinyCharm: PropTypes.bool.isRequired
  }

  get chain () {
    return this.props.chain % 256
  }

  get odds () {
    let odds = this.props.hasShinyCharm ? 1365 : 4096

    if (this.props.chain >= 70) {
      odds = this.props.hasShinyCharm ? 683 : 1024
    }

    return odds
  }

  get bn () {
    const p = 1 / this.odds
    const n = this.props.chain
    const pToN = Math.pow(1.0 - p, n)
    return (pToN * Math.pow(-(1.0 / (p - 1.0)), n) - pToN) * 100.0
  }

  render () {
    return (
      <div>
        <Label>Probability</Label>
        <Prob>1/{this.odds}</Prob>
        <Label>B(n, p)</Label>
        <Prob>{this.bn.toFixed(2)}%</Prob>
      </div>
    )
  }
}

const Label = styled.div`
  opacity: .64
`

const Prob = styled.div`
  font-size: 1.4rem;
  margin-bottom: 8px;
`

export default Probabilities
