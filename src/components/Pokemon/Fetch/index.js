import { Component } from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'
import connect from 'components/State/connect'

const mapStateToProps = (state, props, applyUpdate) => ({
  updateTheme: theme => applyUpdate(() => ({ theme }))()
})

class FetchPokemon extends Component {
  static propTypes = {
    pokemonId: PropTypes.number.isRequired,
    render: PropTypes.func.isRequired,
    updateTheme: PropTypes.func.isRequired
  }

  state = {
    pokemon: null
  }

  getKey (pokemonId) {
    return `pokemon:${pokemonId}`
  }

  async synchronizePokemon (pokemonId) {
    // If the pokemon is already in the local
    // storage then we dont need to fetch it again
    let pokemon = this.fetchPokemonFromLocalStorage(pokemonId)

    if (!pokemon) {
      pokemon = await this.fetchPokemonFromApi(pokemonId)
      this.persistPokemonToLocalStorage(pokemonId, pokemon)
    }

    this.setState({ pokemon })
    this.props.updateTheme(pokemon.types[0].type.name)
  }

  fetchPokemonFromLocalStorage (pokemonId) {
    const pokemon = window.localStorage.getItem(this.getKey(pokemonId))

    try {
      return JSON.parse(pokemon)
    } catch (err) {
      // The local storage data is corrupted.
      // Return null to fetch data again
      return null
    }
  }

  persistPokemonToLocalStorage (pokemonId, pokemon) {
    window.localStorage.setItem(this.getKey(pokemonId), JSON.stringify(pokemon))
  }

  async fetchPokemonFromApi (pokemonId) {
    const response = await axios.get(
      `https://pokeapi.co/api/v2/pokemon/${pokemonId}`
    )

    return response.data
  }

  componentDidMount () {
    this.synchronizePokemon(this.props.pokemonId)
  }

  componentWillReceiveProps (nextProps) {
    if (this.props.pokemonId !== nextProps.pokemonId) {
      this.setState({ pokemon: null })
      this.synchronizePokemon(nextProps.pokemonId)
    }
  }

  render () {
    return this.props.render({ pokemon: this.state.pokemon })
  }
}

export default connect(mapStateToProps)(FetchPokemon)
