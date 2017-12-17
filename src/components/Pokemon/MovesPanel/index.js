import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Input from 'components/ui/Input'
import PanelTitle from 'components/Pokemon/PanelTitle'

const formatMoveName = name => {
  const withoutSlashes = name.split('-').join(' ')

  return `${withoutSlashes[0].toUpperCase()}${withoutSlashes.slice(1)}`
}

class MovesPanel extends Component {
  static propTypes = {
    level: PropTypes.number,
    moves: PropTypes.arrayOf(
      PropTypes.shape({
        move: PropTypes.shape({
          name: PropTypes.string.isRequired
        }).isRequired,
        version_group_details: PropTypes.arrayOf(
          PropTypes.shape({
            level_learned_at: PropTypes.number.isRequired,
            move_learn_method: PropTypes.shape({
              name: PropTypes.string.isRequired
            }).isRequired,
            version_group: PropTypes.shape({
              name: PropTypes.string.isRequired
            }).isRequired
          })
        ).isRequired
      })
    ).isRequired
  }

  state = {
    level: ''
  }

  get moves () {
    // Filter moves to get only those learnt by leveling up
    const levelUpMoves = this.props.moves.filter(
      ({ version_group_details }) => {
        return version_group_details.some(
          vgd => vgd.move_learn_method.name === 'level-up'
        )
      }
    )

    const sunMoonMoves = levelUpMoves.filter(({ version_group_details }) => {
      return version_group_details.some(
        vgd => vgd.version_group.name === 'sun-moon'
      )
    })

    // Remove moves learned before sun and moon
    sunMoonMoves.forEach(move => {
      move.version_group_details = move.version_group_details.filter(
        ({ version_group }) => version_group.name === 'sun-moon'
      )
    })

    let possibleMoves = sunMoonMoves

    if (this.state.level) {
      // If the user entered a Pokemon level, then
      // we need to filter only possible moves.
      // For that, we will sort moves by DESC. order,
      // removes the ones above the current level,
      // and take ~4 moves.

      // Remove moves from birth

      possibleMoves = possibleMoves.filter(({ version_group_details }) =>
        version_group_details.some(
          ({ level_learned_at }) => level_learned_at < this.state.level
        )
      )

      possibleMoves = [...possibleMoves]

      possibleMoves.forEach(move => {
        move.version_group_details = move.version_group_details.filter(
          ({ level_learned_at }) => level_learned_at !== 0
        )
      })

      possibleMoves.sort(
        (
          { version_group_details: move1 },
          { version_group_details: move2 }
        ) => {
          const findMaxLevel = move =>
            move.reduce(
              (acc, { level_learned_at }) => Math.max(acc, level_learned_at),
              0
            )

          return findMaxLevel(move2) - findMaxLevel(move1)
        }
      )
    }

    return possibleMoves.map(({ move, version_group_details }) => ({
      name: move.name,
      levels: version_group_details.map(
        ({ level_learned_at }) => level_learned_at
      )
    }))
  }

  getLevelLabel (level) {
    if (level === 0) {
      return 'Birth'
    } else {
      return `Lv. ${level}`
    }
  }

  onLevelChange = e => this.setState({ level: e.target.value })

  render () {
    return (
      <Wrapper>
        <PanelTitle>Possible Moves</PanelTitle>
        <LevelInput
          type='number'
          placeholder='Pokemon level'
          value={this.state.level}
          onChange={this.onLevelChange}
        />
        <Moves>
          {this.moves.map(({ name, levels }) => (
            <Move key={name}>
              <span>{formatMoveName(name)}</span>{' '}
              <span>
                {levels.map(level => this.getLevelLabel(level)).join(' | ')}
              </span>
            </Move>
          ))}
        </Moves>
      </Wrapper>
    )
  }
}

const Wrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`

const LevelInput = styled(Input)`
  background: rgba(0, 0, 0, .33);
  border: none;
  outline: none;
  color: #313131;
  margin: 8px auto;
  padding: 8px 12px;
  border-radius: 4px;

  ::placeholder {
    color: rgba(0, 0, 0, .5);
  }
`

const Moves = styled.ul`
  overflow-y: auto;
  flex: 1;
`

const Move = styled.li`
  font-size: 1rem;
  padding: 8px;

  & + & {
    border-top: 1px solid rgba(255, 255, 255, .1);
  }

  span:last-child {
    opacity: .65;
    font-size: 0.75rem;
  }
`

export default MovesPanel
