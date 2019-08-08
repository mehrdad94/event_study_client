import React from 'react'
import { Setting } from './Setting'
import enzyme from '../../lib/enzyme'
import 'bootstrap'
import 'bootstrap-datepicker/dist/js/bootstrap-datepicker.min.js'

describe('Setting component', function () {
  let wrapper
  const props = {
    dateColumn: 'Date',
    operationColumn: 'Close',
    T0T1: '10',
    T1E: '4',
    ET2: '7',
    T2T3: '5',
    defaultEventDateFormat: 'yyyy-mm-dd'
  }

  beforeEach(() => {
    wrapper = enzyme.mount(<Setting {...props}/>)
  })

  it('should test input fields', function () {
  })
})
