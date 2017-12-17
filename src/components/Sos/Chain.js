import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import DeleteIcon from 'react-icons/lib/md/delete'
import Input from 'components/ui/Input'
import Checkbox from 'components/ui/Checkbox'
import Moves from './Moves'
import Probabilities from './Probabilities'

class Chain extends Component {
  static propTypes = {
    id: PropTypes.number.isRequired,
    sprites: PropTypes.shape({
      front_shiny: PropTypes.string.isRequired
    }).isRequired
  }

  state = {
    chain: this.fetchChainFromLocalStorage(),
    level: null,
    hasShinyCharm: this.fetchShinyCharmFromLocalStorage()
  }

  componentDidMount () {
    window.addEventListener('keyup', this.onKeyUp)
  }

  componentWillUnmount () {
    window.removeEventListener('keyup', this.onKeyUp)
  }

  get chainKey () {
    return `encounters:${this.props.id}`
  }

  get shinyCharmKey () {
    return 'shiny-charm'
  }

  fetchChainFromLocalStorage () {
    const chain = window.localStorage.getItem(this.chainKey)

    return chain ? Number(chain) : 0
  }

  fetchShinyCharmFromLocalStorage () {
    const charm = window.localStorage.getItem(this.shinyCharmKey)

    return charm && charm !== 'false'
  }

  onKeyUp = e => {
    const keyCode = e.keyCode
    const commands = {
      13: this.onIncrement, // ENTER
      32: this.onIncrement, // SPACE
      38: this.onIncrement, // UP
      39: this.onIncrement, // RIGHT
      37: this.onDecrement, // LEFT
      40: this.onDecrement // BOTTOM
    }

    if (e.target.tagName === 'BODY' && commands[keyCode]) {
      commands[keyCode]()
    }
  }

  onShinyCharmChange = () =>
    this.setState(
      ls => ({ hasShinyCharm: !ls.hasShinyCharm }),
      () =>
        window.localStorage.setItem(
          this.shinyCharmKey,
          this.state.hasShinyCharm
        )
    )

  updateChain (getNextValue) {
    this.setState(getNextValue, () => {
      window.localStorage.setItem(this.chainKey, this.state.chain)
    })
  }

  onReset = () => this.updateChain(() => ({ chain: 0 }))

  onIncrement = () => this.updateChain(ls => ({ chain: ls.chain + 1 }))

  onDecrement = () => this.updateChain(ls => ({ chain: ls.chain - 1 }))

  onLevelChange = e => {
    this.setState({ level: Number(e.target.value) })
  }

  render () {
    return (
      <Wrapper>
        <Card>
          <div>
            <OptionsSection>
              <SubTitle>Options</SubTitle>
              <Option>
                <label htmlFor='has-shiny-charm'>
                  <Checkbox
                    id='has-shiny-charm'
                    type='checkbox'
                    checked={this.state.hasShinyCharm}
                    onChange={this.onShinyCharmChange}
                  />
                  &nbsp;&nbsp;&nbsp;Shiny Charm
                </label>
              </Option>
              <Option onClick={this.onReset}>
                <DeleteIcon />
                &nbsp;Reset Chain
              </Option>
            </OptionsSection>

            <ProbabilitiesSection>
              <SubTitle>Probabilities</SubTitle>
              <Probabilities
                chain={this.state.chain}
                hasShinyCharm={this.state.hasShinyCharm}
              />
            </ProbabilitiesSection>
          </div>
          <div>
            <SubTitle>Sos Chain</SubTitle>
            <Sprite src={this.props.sprites.front_shiny} />
            <Counter>{this.state.chain}</Counter>
            <CounterActions>
              <button onClick={this.onDecrement}>-</button>
              <button onClick={this.onIncrement}>+</button>
            </CounterActions>
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
  max-height: 500px;
  flex-direction: column;
  width: 95%;
  max-width: 860px;
  margin: auto;
  padding: 24px;
  padding-top: 0;
`

const Sprite = styled.img`
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 150px;
`

const Card = styled.div`
  background: #fff;
  box-shadow: 0 1px 3px rgba(0, 0, 0, .24);
  color: #373d3f;
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
    border-left: 1px solid rgba(0, 0, 0, .15);
  }
`

const SubTitle = styled.div`
  text-transform: uppercase;
  text-align: center;
  padding-bottom: 8px;
  margin-bottom: 8px;
  border-bottom: 1px solid rgba(0, 0, 0, .15);
`

const Counter = styled.div`
  flex: 1;
  font-size: 5rem;
  display: flex;
  align-items: center;
  justify-content: center;
`

const OptionsSection = styled.div`
  flex: 1;
`

const Option = styled.div`
  cursor: pointer;
  padding: 8px;

  svg {
    font-size: 24px;
    position: relative;
    left: -3px;
    top: -2px;
  }
`

const ProbabilitiesSection = styled.div`
  flex: 1;
`

const CounterActions = styled.div`
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
    color: rgba(0, 0, 0, .65);
  }
`

export default Chain
