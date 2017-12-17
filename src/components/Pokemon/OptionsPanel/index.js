import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import DeleteIcon from 'react-icons/lib/md/delete'
import Checkbox from 'components/ui/Checkbox'
import connect from 'components/State/connect'

const mapStateToProps = (state, props, applyUpdate) => {
  return {
    hasShinyCharm: state.hasShinyCharm,
    toggleShinyCharm: applyUpdate(() => ({
      hasShinyCharm: !state.hasShinyCharm
    })),
    resetChain: applyUpdate(state => ({
      chains: {
        ...state.chains,
        [props.id]: 0
      }
    }))
  }
}

const OptionsPanel = ({ id, hasShinyCharm, toggleShinyCharm, resetChain }) => (
  <Wrapper>

    <Option>
      <label htmlFor='has-shiny-charm'>
        <Checkbox
          id='has-shiny-charm'
          type='checkbox'
          checked={hasShinyCharm}
          onChange={toggleShinyCharm}
        />
        &nbsp;&nbsp;&nbsp;Shiny Charm
      </label>
    </Option>
    <Option onClick={resetChain}>
      <DeleteIcon />
      &nbsp;Reset Chain
    </Option>
  </Wrapper>
)

OptionsPanel.propTypes = {
  id: PropTypes.number.isRequired,
  hasShinyCharm: PropTypes.bool.isRequired,
  toggleShinyCharm: PropTypes.func.isRequired,
  resetChain: PropTypes.func.isRequired
}

const Wrapper = styled.div`
  flex: 1;
`

const Option = styled.div`
  cursor: pointer;
  padding: 8px;

  svg {
    font-size: 24px;
    position: relative;
    left: -3px;
    top: -2px;
  }
`

export default connect(mapStateToProps)(OptionsPanel)
