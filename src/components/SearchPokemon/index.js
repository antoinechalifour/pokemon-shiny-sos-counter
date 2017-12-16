import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import matchSorter from 'match-sorter'
import pokemons from 'data/pokedex.json'
import Input from 'components/ui/Input'

const pokedex = Object.keys(pokemons).map(id => pokemons[id])
const formatPokemon = pokemon => {
  const { id, names } = pokemon
  const [, , englishName] = names

  return `#${id} - ${englishName}`
}

class SearchPokemon extends Component {
  static propTypes = {
    onPokemon: PropTypes.func.isRequired
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
      <Wrapper>
        <SearchInput
          value={this.state.search}
          onChange={this.onChange}
          placeholder='Pokemon name or #...'
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
      </Wrapper>
    )
  }
}

const Wrapper = styled.div`
  position: relative;
  width: 550px;
  margin: auto;
  padding: 12px;
`

const SearchInput = styled(Input)`
  outline: none;
  background: none;
  border: none;
  padding: 12px 16px;
  background: rgba(0, 0, 0, .65);
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

export default SearchPokemon
