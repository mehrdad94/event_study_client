import React from 'react'
import { EventAdd } from './EventAdd'
import enzyme from '../../../lib/enzyme'
import 'bootstrap'

it('should check toggle modal', () => {
    const props = {
        isActive: true
    }

    const wrapper = enzyme.mount(<EventAdd {...props}/>)

    const modalComponent = wrapper.find('.modal')

    expect(modalComponent.hasClass('show')).toBe(true)
})
