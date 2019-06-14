import React from 'react'
import { EventAdd } from './EventAdd'
import enzyme from '../../../lib/enzyme'
import 'bootstrap'

it('should render without crash', () => {
    const wrapper = enzyme.mount(<EventAdd/>)

    const modalComponent = wrapper.find('.modal')

    expect(modalComponent.hasClass('modal')).toBe(true)
})
