import React from 'react'
import { Chart } from './Chart'
import enzyme from '../../lib/enzyme'
import  'jest-canvas-mock'

it('should render chart without crash', function () {
    const wrapper = enzyme.mount(<Chart/>)

    expect(wrapper.length).toBe(1)
})