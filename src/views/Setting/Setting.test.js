import React from 'react'
import { Setting } from './Setting'
import enzyme from '../../lib/enzyme'
import 'bootstrap'
import 'bootstrap-datepicker/dist/js/bootstrap-datepicker.min.js'

describe('Setting component', function () {
  it('should test input fields', function () {
    const wrapper = enzyme.mount(<Setting/>)

    const state = {
      dateColumn: 'Date',
      operationColumn: 'Close',
      T0T1: '10',
      T1E: '4',
      ET2: '7',
      T2T3: '5',
      defaultEventDateFormat: 'yyyy-mm-dd'
    }

    wrapper.setState(state)

    const findElement = elm => wrapper.find(elm)

    const dateColumnField = () => findElement('#settingDateColumn')
    const operationColumnField = () => findElement('#settingOperationColumn')
    const T0T1Field = () => findElement('#settingT0T1')
    const T1EField = () => findElement('#settingT1E')
    const ET2Field = () => findElement('#settingET2')
    const T2T3Field = () => findElement('#settingT2T3')
    const defaultEventDateFormatField = () => findElement('#settingDefaultEventDate')

    expect(dateColumnField().props().value).toBe(state.dateColumn)
    expect(operationColumnField().props().value).toBe(state.operationColumn)
    expect(T0T1Field().props().value).toBe(state.T0T1)
    expect(T1EField().props().value).toBe(state.T1E)
    expect(ET2Field().props().value).toBe(state.ET2)
    expect(T2T3Field().props().value).toBe(state.T2T3)
    expect(defaultEventDateFormatField().props().value).toBe(state.defaultEventDateFormat)

    const nextState = {
      dateColumn: 'Date 1',
      operationColumn: 'Close 1',
      T0T1: '15',
      T1E: '14',
      ET2: '13',
      T2T3: '12',
      defaultEventDateFormat: 'yyyy-dd-mm'
    }

    // change input value
    dateColumnField().simulate('change', { target: { value: nextState.dateColumn } })
    operationColumnField().simulate('change', { target: { value: nextState.operationColumn } })
    T0T1Field().simulate('change', { target: { value: nextState.T0T1 }})
    T1EField().simulate('change', { target: { value: nextState.T1E }})
    ET2Field().simulate('change', { target: { value: nextState.ET2 }})
    T2T3Field().simulate('change', { target: { value: nextState.T2T3 }})
    defaultEventDateFormatField().simulate('change', { target: { value: nextState.defaultEventDateFormat }})

    wrapper.update()

    expect(wrapper.state('dateColumn')).toBe(nextState.dateColumn)
    expect(wrapper.state('operationColumn')).toBe(nextState.operationColumn)
    expect(wrapper.state('T0T1')).toBe(nextState.T0T1)
    expect(wrapper.state('T1E')).toBe(nextState.T1E)
    expect(wrapper.state('ET2')).toBe(nextState.ET2)
    expect(wrapper.state('T2T3')).toBe(nextState.T2T3)
    expect(wrapper.state('defaultEventDateFormat')).toBe(nextState.defaultEventDateFormat)
  })
})
