import React from 'react'
import styled from 'styled-components'

const Checkbox = props => (
  <Wrapper><input type='checkbox' {...props} /><span /></Wrapper>
)

const Wrapper = styled.span`
  position: relative;
  display: inline-block;
  height: 16px;
  width: 16px;

  input,
  span {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
  }

  input {
    z-index: 1;
    opacity: 0;
  }

  span {
    background: #fff;
    border-radius: 2px;
    border: 2px solid #d6d6d9;
    transition: all .2 ease-in;
  }

  input:checked + span {
    background: #313131;
    border: 2px solid #212121;
  }

  input + span::before {
    opacity: 0;
    transition: opacity .2s ease-in;
    content: '';
    display: block;
    position: absolute;
    left: 4px;
    top: -5px;
    width: 6px;
    height: 12px;
    border: solid #fff;
    border-width: 0 3px 3px 0;
    transform: rotate(45deg);
  }

  input:checked + span::before {
    opacity: 1;
  }
`

export default Checkbox
