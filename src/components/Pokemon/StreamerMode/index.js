import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import connect from 'components/State/connect'
import Portal from 'components/Portal'

const mapStateToProps = (state, props, applyUpdate) => ({
  chain: state.chains[props.id] || 0,
  isOn: state.streamerMode,
  onClose: applyUpdate(state => ({ streamerMode: false }))
})

const StreamerMode = ({ id, chain, sprite, isOn, onClose }) =>
  (isOn
    ? <Portal onClose={onClose}>
      <Wrapper>
        <Sprite src={sprite} />
        <Chain>{chain}</Chain>
          encounters
        </Wrapper>
    </Portal>
    : null)

StreamerMode.propTypes = {
  id: PropTypes.number.isRequired,
  chain: PropTypes.number.isRequired,
  sprite: PropTypes.string.isRequired,
  isOn: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired
}

const Wrapper = styled.div`
  font-family: 'Lato', sans-serif;
  font-size: 1.2rem;
  line-height: 1.6;
  color: #373d3f;
  text-align: center;
`

const Sprite = styled.img`
  display: block;
  width: 150px;
  margin: auto;
`

const Chain = styled.div`
  font-size: 48px;
`

export default connect(mapStateToProps)(StreamerMode)
