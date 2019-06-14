import React from 'react'
import { Loader } from './Loader'
import enzyme from '../../lib/enzyme'

it('renders without crashing and should activate Loader', () => {
    const wrapper = enzyme.shallow(<Loader/>)

    expect(wrapper.find('#Loader').hasClass('fadeOut')).toBe(true)

    wrapper.setProps({
        active: true
    })

    expect(wrapper.find('#Loader').hasClass('true')).toBe(false)
})
