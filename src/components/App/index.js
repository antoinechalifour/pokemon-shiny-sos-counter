import React, { Component } from 'react'
import styled from 'styled-components'
import { Route, withRouter } from 'react-router-dom'
import { shadeColor } from 'util/colors'
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
      water: '#0D47A1',
      psychic: '#880E4F',
      poison: '#4A148C',
      ground: '#3E2723',
      flying: '#FAFAFA',
      normal: '#FAFAFA',
      fire: '#B71C1C',
      dragon: '#1A237E',
      ice: '#01579B',
      dark: '#212121',
      fairy: '#AD1457',
      bug: '#827717',
      fighting: '#BF360C'
    }

    if (colorMap[type.name]) {
      this.setState({ color: shadeColor(colorMap[type.name], -0.65) })
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
