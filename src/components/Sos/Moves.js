import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

class Moves extends Component {
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

    if (this.props.level) {
      // If the user entered a Pokemon level, then
      // we need to filter only possible moves.
      // For that, we will sort moves by DESC. order,
      // removes the ones above the current level,
      // and take ~4 moves.
      // possibleMoves = sunMoonMoves.filter()
      possibleMoves = possibleMoves.filter(({ version_group_details }) =>
        version_group_details.some(
          ({ level_learned_at }) => level_learned_at < this.props.level
        )
      )

      possibleMoves = [
        ...possibleMoves
      ].sort(
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

  render () {
    return (
      <Wrapper>
        {this.moves.map(({ name, levels }) => (
          <Move key={name}>
            <span>{name}</span>{' '}
            <span>
              {levels.map(level => this.getLevelLabel(level)).join(' | ')}
            </span>
          </Move>
        ))}
      </Wrapper>
    )
  }
}

const Wrapper = styled.ul`
  flex: 1;
  overflow-y: auto;
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

export default Moves
