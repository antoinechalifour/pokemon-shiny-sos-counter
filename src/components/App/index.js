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
  background: #3F51B5;
  color: #fff;
`

class App extends Component {
  onPokemon = pokemonId => {
    this.props.history.push(`/pokemon/${pokemonId}`)
  }

  render () {
    return (
      <Wrapper>
        <SearchPokemon onPokemon={this.onPokemon} />
        <Route
          path='/pokemon/:id'
          render={({ match }) => <Sos pokemonId={Number(match.params.id)} />}
        />
      </Wrapper>
    )
  }
}

export default withRouter(App)
