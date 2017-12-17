import React from 'react'
import styled from 'styled-components'

const Loader = () => (
  <Wrapper><div>Fetching pokemon information...</div></Wrapper>
)

const Wrapper = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #373d3f;
`

export default Loader
