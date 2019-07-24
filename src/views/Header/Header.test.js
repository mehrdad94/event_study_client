import enzyme from '../../lib/enzyme'
import { Header } from './Header'
import React from 'react'

describe("Header component", () => {
  it('should mount without crash', function () {
    enzyme.mount(<Header />)
  });
})