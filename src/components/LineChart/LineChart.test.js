import React from 'react'
import { LineChart } from './LineChart'
import enzyme from '../../lib/enzyme'
import  'jest-canvas-mock'
it('should render chart without crash', function () {
    const wrapper = enzyme.mount(<LineChart/>)

    expect(wrapper.length).toBe(1)
})
