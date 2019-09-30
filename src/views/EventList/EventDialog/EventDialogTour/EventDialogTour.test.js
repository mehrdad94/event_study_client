import React from 'react'
import { EventDialogTour }from './EventDialogTour'
import enzyme from '../../../../lib/enzyme'

describe("EventDialogTour component", function () {
  it('should render without crash', function () {
    enzyme.mount(<EventDialogTour isOpen={false} onRequestClose={() => {}}/>)
  })
})
