import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import OptionsPanel from 'components/Pokemon/OptionsPanel'
import ProbabilitiesPanel from 'components/Pokemon/ProbabilitiesPanel'
import ChainPanel from 'components/Pokemon/ChainPanel'
import MovesPanel from 'components/Pokemon/MovesPanel'
import Shortcuts from 'components/Pokemon/Shortcuts'
import StreamerMode from 'components/Pokemon/StreamerMode'

const Pokemon = props => (
  <Wrapper>
    <Shortcuts id={props.id} />
    <StreamerMode id={props.id} sprite={props.sprites.front_shiny} />
    <Card>
      <div>
        <OptionsPanel id={props.id} />
        <ProbabilitiesPanel id={props.id} />
      </div>
      <div>
        <ChainPanel id={props.id} sprite={props.sprites.front_shiny} />
      </div>
      <div>
        <MovesPanel {...props} />
      </div>
    </Card>
  </Wrapper>
)

Pokemon.propTypes = {
  id: PropTypes.number.isRequired,
  sprites: PropTypes.shape({
    front_shiny: PropTypes.string.isRequired
  }).isRequired
}

const Wrapper = styled.div`
  flex: 1;
  width: 95%;
  max-width: 860px;
  margin: auto;
  overflow-y: auto;
  padding: 24px 0;
`

const Card = styled.div`
  background: #fff;
  box-shadow: 0 1px 3px rgba(0, 0, 0, .24);
  color: #373d3f;
  border-radius: 4px;
  flex: 1;
  display: flex;
  flex-direction: column;

  @media (min-width: 860px) {
    flex-direction: row;
    max-height: 500px;

    > div + div {
      border-left: 1px solid rgba(0, 0, 0, .15);
    }
  }

  > div {
    flex: 1;
    padding: 12px;
    display: flex;
    flex-direction: column;
  }
`

export default Pokemon
