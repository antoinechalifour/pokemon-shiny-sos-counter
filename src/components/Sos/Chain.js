import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Input from 'components/ui/Input'
import Checkbox from 'components/ui/Checkbox'
import Moves from './Moves'

class Chain extends Component {
  static propTypes = {
    sprites: PropTypes.shape({
      front_shiny: PropTypes.string.isRequired
    }).isRequired
  }

  state = {
    chain: 0,
    level: null,
    hasShinyCharm: false
  }

  onShinyCharmChange = () =>
    this.setState(ls => ({ hasShinyCharm: !ls.hasShinyCharm }))

  onIncrement = () => this.setState(ls => ({ chain: ls.chain + 1 }))

  onDecrement = () => this.setState(ls => ({ chain: ls.chain - 1 }))

  onLevelChange = e => {
    this.setState({ level: Number(e.target.value) })
  }

  render () {
    return (
      <Wrapper>
        <Sprite src={this.props.sprites.front_shiny} />
        <Card>
          <div>
            <Options>
              <SubTitle>Options</SubTitle>
              <label htmlFor='has-shiny-charm'>
                <Checkbox
                  id='has-shiny-charm'
                  type='checkbox'
                  checked={this.state.hasShinyCharm}
                  onChange={this.onShinyCharmChange}
                />
                &nbsp;&nbsp;Shiny Charm
              </label>
            </Options>

            <Probabilities>
              <SubTitle>Probabilities</SubTitle>
            </Probabilities>
          </div>
          <div>
            <SubTitle>Sos Chain</SubTitle>
            <Counter>{this.state.chain}</Counter>
            <CounterAction>
              <button onClick={this.onDecrement}>-</button>
              <button onClick={this.onIncrement}>+</button>
            </CounterAction>
          </div>
          <div>
            <SubTitle>Possible moves</SubTitle>
            <LevelInput
              type='number'
              placeholder='Pokemon level'
              onChange={this.onLevelChange}
            />
            <Moves level={this.state.level} moves={this.props.moves} />
          </div>
        </Card>
      </Wrapper>
    )
  }
}

const Wrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  width: 95%;
  max-width: 860px;
  margin: auto;
  padding: 24px;
  padding-top: 0;
`

const Sprite = styled.img`
  display: block;
  margin: auto;
  width: 150px;
`

const Card = styled.div`
  background: rgba(0, 0, 0, .15);
  border-radius: 4px;
  flex: 1;
  display: flex;

  > div {
    flex: 1;
    padding: 12px;
    display: flex;
    flex-direction: column;
  }

  > div + div {
    border-left: 1px solid rgba(255, 255, 255, .15);
  }
`

const SubTitle = styled.div`
  text-transform: uppercase;
  text-align: center;
  padding-bottom: 8px;
  margin-bottom: 8px;
  border-bottom: 1px solid rgba(255, 255, 255, .15);
`

const Counter = styled.div`
  flex: 1;
  font-size: 5rem;
  display: flex;
  align-items: center;
  justify-content: center;
`

const Options = styled.div`
  flex: 1;
`

const Probabilities = styled.div`
  flex: 1;
`

const CounterAction = styled.div`
  display: flex;
  justify-content: space-around;
  padding: 24px 0;

  button {
    padding: 4px 32px;
    background: rgba(0, 0, 0, .25);
    border: none;
    border-bottom: 3px solid rgba(0, 0, 0, .5);
    border-radius: 4px;
    font-size: 3rem;
    font-family: monospace;
    color: #fff;
    outline: none;
  }
`

const LevelInput = styled(Input)`
  background: rgba(0, 0, 0, .15);
  border: none;
  outline: none;
  margin: 8px auto;
  color: #fff;
  padding: 8px 12px;

  ::placeholder {
    color: rgba(255, 255, 255, .65);
  }
`

export default Chain
