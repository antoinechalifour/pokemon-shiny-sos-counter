import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import connect from 'components/State/connect'
import PanelTitle from 'components/Pokemon/PanelTitle'

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
  const chain = state.chains[id] || 0

  return {
    chain,
    increment: applyUpdate(increment(id)),
    decrement: applyUpdate(decrement(id))
  }
}

const ChainPanel = ({ chain, sprite, increment, decrement }) => (
  <Wrapper>
    <PanelTitle>SOS Chain</PanelTitle>
    <Sprite src={sprite} />
    <Counter>{chain}</Counter>
    <Actions>
      <button onClick={decrement}>-</button>
      <button onClick={increment}>+</button>
    </Actions>
  </Wrapper>
)

ChainPanel.propTypes = {
  id: PropTypes.number.isRequired,
  sprite: PropTypes.string.isRequired,
  chain: PropTypes.number.isRequired,
  increment: PropTypes.func.isRequired,
  decrement: PropTypes.func.isRequired
}

const Wrapper = styled.div`
  flex: 1;
`

const Sprite = styled.img`
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 150px;
`

const Counter = styled.div`
  flex: 1;
  font-size: 5rem;
  display: flex;
  align-items: center;
  justify-content: center;
`

const Actions = styled.div`
  display: flex;
  justify-content: space-around;
  padding: 24px 0;

  button {
    padding: 4px 32px;
    background: rgba(0, 0, 0, .7);
    border: none;
    border-bottom: 3px solid rgba(0, 0, 0, .9);
    border-radius: 4px;
    font-size: 3rem;
    font-family: monospace;
    color: #fff;
    outline: none;
    cursor: pointer;
  }
`

export default connect(mapStateToProps)(ChainPanel)
