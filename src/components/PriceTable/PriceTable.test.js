import React from 'react'
import { PriceTable } from './PriceTable'
import enzyme from '../../lib/enzyme'

it('should render price table', function () {
    const props = {
        headers: ['h1', 'h2'],
        rows: [{
            h1: '1',
            h2: '2'
        }]
    }

    const wrapper = enzyme.shallow(<PriceTable {...props}/>)

    const headers = wrapper.find('th')

    expect(headers.at(0).text()).toBe(props.headers[0])

    const rows = wrapper.find('td')

    expect(rows.at(0).text()).toBe(props.rows[0][props.headers[0]])
})