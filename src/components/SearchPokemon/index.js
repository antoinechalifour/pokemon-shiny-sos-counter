import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import matchSorter from 'match-sorter'
import pokemons from 'data/pokedex.json'
import connect from 'components/State/connect'
import Input from 'components/ui/Input'

const pokedex = Object.keys(pokemons).map(id => pokemons[id])
const formatPokemon = pokemon => {
  const { id, names } = pokemon
  const [, , englishName] = names

  return `#${id} - ${englishName}`
}

const mapStateToProps = state => ({ theme: state.theme })

class SearchPokemon extends Component {
  static propTypes = {
    onPokemon: PropTypes.func.isRequired,
    theme: PropTypes.string.isRequired
  }

  state = {
    search: '',
    suggestions: []
  }

  onSelect = pokemon => {
    this.props.onPokemon(pokemon.id)
    this.setState({ suggestions: [] })
  }

  onChange = e => {
    const search = e.target.value
    const nextState = { search }

    if (search.length > 2) {
      nextState.suggestions = matchSorter(pokedex, search, {
        keys: ['id', 'names']
      })
    } else {
      nextState.suggestions = []
    }

    this.setState(nextState)
  }

  onSubmit = e => {
    e.preventDefault()
  }

  render () {
    return (
      <Wrapper theme={this.props.theme}>
        <Inner>
          <SearchInput
            value={this.state.search}
            onChange={this.onChange}
            placeholder='Pokemon name or number...'
          />
          {this.state.suggestions.length > 0 &&
            <SuggestionsList>
              {this.state.suggestions.map(pokemon => {
                const { id } = pokemon
                const names = [...pokemon.names]
                names.splice(2, 1)

                return (
                  <Suggestion key={id} onClick={() => this.onSelect(pokemon)}>
                    <span>{formatPokemon(pokemon)}</span>
                    <span>{names.join(' • ')}</span>
                  </Suggestion>
                )
              })}
            </SuggestionsList>}
        </Inner>
      </Wrapper>
    )
  }
}

const colorMap = {
  water: '#BBDEFB',
  psychic: '#F8BBD0',
  poison: '#E1BEE7',
  ground: '#FFE0B2',
  flying: '#F5F5F5',
  normal: '#F5F5F5',
  fire: '#FFCCBC',
  dragon: '#C5CAE9',
  ice: '#B3E5FC',
  dark: '#CFD8DC',
  steel: '#CFD8DC',
  fairy: '#F8BBD0',
  bug: '#F0F4C3',
  fighting: '#FFECB3'
}

const Wrapper = styled.div`
  padding: 12px;
  transition: background .3s ease-in;

  ${({ theme }) => {
    const background = colorMap[theme] || 'transparent'

    return `
      background: ${background};
      box-shadow: 0 1px 3px rgba(0, 0, 0, .24);
    `
  }}
`

const Inner = styled.div`
  position: relative;
  width: 550px;
  margin: auto;
`

const SearchInput = styled(Input)`
  outline: none;
  background: none;
  border: none;
  padding: 12px 16px;
  background: rgba(0, 0, 0, .85);
  color: #fff;
  border-radius: 4px;
  font-size: 1.5rem;

  &::placeholder {
    color: rgba(255, 255, 255, .65);
  }
`

const SuggestionsList = styled.ul`
  position: absolute;
  left: 0;
  right: 0;
  max-height: 30vh;
  overflow-y: auto;
  background: rgba(255, 255, 255, .9);
  color: #373d3f;
  box-shadow: 0 1px 3px rgba(0, 0, 0, .35);
`

const Suggestion = styled.li`
  padding: 8px;
  cursor: pointer;

  & + & {
    border-top: 1px solid rgba(0, 0, 0, .15);
  }

  span {
    display: block;
  }

  span:last-child {
    opacity: .65;
    font-size: 0.75rem;
  }
`

export default connect(mapStateToProps)(SearchPokemon)
