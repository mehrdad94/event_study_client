import React from 'react'
import { PriceList } from './PriceList'
import enzyme from '../../lib/enzyme'

it('should load a csv file', function (done) {
    const wrapper = enzyme.mount(<PriceList/>)

    const csv = 'FIRST NAME ,LAST NAME\nFrank,Riley'
    const json = [
        {
            "FIRST NAME": "Frank",
            "LAST NAME": "Riley"
        }
    ]
    const file = new Blob([csv], {type : 'text/plain'})
    const readerResult = {
        target: {
            result: csv
        }
    }
    const readAsText = jest.fn(() => {
        dummyFileReader.onload(readerResult)
    })

    const onload = jest.fn()

    const dummyFileReader = {onload, readAsText}

    window.FileReader = jest.fn(() => dummyFileReader)

    wrapper.find('#price-list-file-input').simulate('change', {target: {files: [file]}})

    setTimeout(() => {
        expect(wrapper.state('prices')).toEqual(json)
        done()
    }, 100)
})
