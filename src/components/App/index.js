import React, { Component } from 'react'
import styled from 'styled-components'
import { Route, withRouter } from 'react-router-dom'
import SearchPokemon from 'components/SearchPokemon'
import Sos from 'components/Sos'

const Wrapper = styled.div`
  font-family: 'Lato', sans-serif;
  font-size: 1.2rem;
  line-height: 1.6;
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100vh;
  background: ${({ color }) => color || '#3F51B5'};
  color: #fff;
  transition: background .3s ease-in;
`

class App extends Component {
  state = {
    color: null
  }

  onPokemon = pokemonId => {
    this.props.history.push(`/pokemon/${pokemonId}`)
  }

  updateTheme = type => {
    const colorMap = {
      water: '#E3F2FD',
      psychic: '#FCE4EC',
      poison: '#F3E5F5',
      ground: '#EFEBE9',
      flying: '#FAFAFA',
      fire: '#FFEBEE',
      dragon: '#E8EAF6',
      ice: '#03A9F4',
      dark: '#212121',
      fairy: '#FCE4EC',
      bug: '#F9FBE7'
    }

    if (colorMap[type.name]) {
      this.setState({ color: colorMap[type.name] })
    } else {
      console.warn('No theme for type', type)
    }
  }

  render () {
    return (
      <Wrapper color={this.state.color}>
        <SearchPokemon onPokemon={this.onPokemon} />
        <Route
          path='/pokemon/:id'
          render={({ match }) => (
            <Sos
              pokemonId={Number(match.params.id)}
              updateTheme={this.updateTheme}
            />
          )}
        />
      </Wrapper>
    )
  }
}

export default withRouter(App)
