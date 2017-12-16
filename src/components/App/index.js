import React, { Component } from 'react'
import styled from 'styled-components'
import SearchPokemon from 'components/SearchPokemon'

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
  state = {
    pokemon: null
  }

  onPokemon = pokemon => {
    this.setState({ pokemon })
  }

  render () {
    return (
      <Wrapper>
        <SearchPokemon onPokemon={this.onPokemon} />
      </Wrapper>
    )
  }
}

export default App
