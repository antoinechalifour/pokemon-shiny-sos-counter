import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import connect from 'components/State/connect'
import PanelTitle from 'components/Pokemon/PanelTitle'

const mapStateToProps = (state, props, applyUpdate) => ({
  hasShinyCharm: state.hasShinyCharm,
  chain: state.chains[props.id] || 0
})

const ProbabilitiesPanel = ({ hasShinyCharm, chain: fullChain }) => {
  const chain = fullChain % 256
  let odds = hasShinyCharm ? 1365 : 4096

  if (chain >= 70) {
    odds = hasShinyCharm ? 683 : 1024
  }

  const p = 1 / odds
  const n = chain
  const pToN = Math.pow(1.0 - p, n)
  const bn = (pToN * Math.pow(-(1.0 / (p - 1.0)), n) - pToN) * 100.0

  return (
    <Wrapper>
      <PanelTitle>Stats</PanelTitle>
      <Label>Probability</Label>
      <Prob>1/{odds}</Prob>
      <Label>B(n, p)</Label>
      <Prob>{bn.toFixed(2)}%</Prob>
    </Wrapper>
  )
}

ProbabilitiesPanel.propTypes = {
  id: PropTypes.number.isRequired,
  hasShinyCharm: PropTypes.bool.isRequired,
  chain: PropTypes.number.isRequired
}

const Wrapper = styled.div`
  flex: 1;
`

const Label = styled.div`
  opacity: .64
`

const Prob = styled.div`
  font-size: 1.4rem;
  margin-bottom: 8px;
`

export default connect(mapStateToProps)(ProbabilitiesPanel)
