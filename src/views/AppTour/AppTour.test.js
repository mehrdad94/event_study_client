import React from 'react'
import { AppTour }from './AppTour'
import enzyme from '../../lib/enzyme'

describe("AppTour component", function () {
  it('should render without crash', function () {
    enzyme.mount(<AppTour isFirstTimeVisit={false}/>)
  })
})