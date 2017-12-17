import React from 'react'
import styled from 'styled-components'
import Animation from './FoldingCube'

const Loader = () => (
  <Wrapper>
    <Animation />
    <div>Fetching pokemon information...</div>
  </Wrapper>
)

const Wrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

export default Loader
