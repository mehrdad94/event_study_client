import React from 'react'
import { Setting } from './Setting'
import enzyme from '../../lib/enzyme'
import 'bootstrap'
import 'bootstrap-datepicker/dist/js/bootstrap-datepicker.min.js'

describe('Setting component', function () {
  let wrapper

  beforeEach(() => {
    wrapper = enzyme.mount(<Setting/>)
  })

  const findElement = elm => wrapper.find(elm)

  it('should test input fields', function () {
    const state = {
      dateColumn: 'Date',
      operationColumn: 'Close',
      T0T1: '10',
      T1E: '4',
      ET2: '7',
      T2T3: '5',
      defaultEventDateFormat: 'yyyy-mm-dd',
      invalidFeedBacks: {
        dateColumn: '',
        operationColumn: '',
        T0T1: '',
        T1E: '',
        ET2: '',
        T2T3: '',
        defaultEventDateFormat: '',
      }
    }

    wrapper.setState(state)
  })
})
