import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Input from 'components/ui/Input'
import Moves from './Moves'

class Chain extends Component {
  static propTypes = {
    sprites: PropTypes.shape({
      front_shiny: PropTypes.string.isRequired
    }).isRequired
  }

  state = {
    chain: 0,
    level: null
  }

  componentDidMount () {
    // this.props.moves.forEach(({ move, version_group_details }) => {
    //   console.log('------------')
    //   console.log(move.name)
    //   const versions = version_group_details.map(x => x.version_group.name)
    //   console.log(versions.join('\n\t -'))
    // })
  }

  onLevelChange = e => {
    this.setState({ level: Number(e.target.value) })
  }

  render () {
    return (
      <Wrapper>
        <Sprite src={this.props.sprites.front_shiny} />
        <Card>
          <div>Probabilities & options here</div>
          <div>Chain info here</div>
          <div>
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

const LevelInput = styled(Input)`
  background: rgba(0, 0, 0, .15);
  border: none;
  outline: none;
  margin-bottom: 16px;
  color: #fff;
  padding: 8px 12px;

  ::placeholder {
    color: rgba(255, 255, 255, .65);
  }
`

export default Chain
