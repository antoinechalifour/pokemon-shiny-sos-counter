import React, { Component } from 'react'
import styled from 'styled-components'
import { Route, withRouter } from 'react-router-dom'
import { shadeColor } from 'util/colors'
import SearchPokemon from 'components/SearchPokemon'
import FetchPokemon from 'components/Pokemon/Fetch'
import Pokemon from 'components/Pokemon'
import Loader from 'components/Pokemon/Loader'

const Wrapper = styled.div`
  font-family: 'Lato', sans-serif;
  font-size: 1.2rem;
  line-height: 1.6;
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100vh;
  background: #f7f7f9;
  color: #373d3f;
  transition: background .3s ease-in;
`

class App extends Component {
  state = {
    color: null
  }

  onPokemon = pokemonId => {
    this.props.history.push(`/pokemon/${pokemonId}`)
  }

  render () {
    return (
      <Wrapper>
        <SearchPokemon onPokemon={this.onPokemon} />
        <Route
          path='/pokemon/:id'
          render={({ match }) => (
            <FetchPokemon
              pokemonId={Number(match.params.id)}
              render={({ pokemon }) =>
                (pokemon ? <Pokemon {...pokemon} /> : <Loader />)}
            />
          )}
        />
      </Wrapper>
    )
  }
}

export default withRouter(App)
