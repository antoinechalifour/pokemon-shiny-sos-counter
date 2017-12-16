const fs = require('fs')
const axios = require('axios')

const getPokemonUrl = id => `https://pokeapi.co/api/v2/pokemon-species/${id}/`
const POKEMON_COUNT = 801
const db = {}
;(async function () {
  for (let i = 0; i < POKEMON_COUNT; i += 1) {
    const id = i + 1
    try {
      console.log(`Fetching info for Pokemon #${id}`)
      const response = await axios.get(getPokemonUrl(id))
      const info = response.data
      db[id] = {
        id,
        names: info.names.map(x => x.name)
      }
    } catch (err) {
      console.log(`Failed to fetch information for Pokemon #${id}`)
    }
  }

  fs.writeFileSync('./db.json', JSON.stringify(db, null, 2))
})()
