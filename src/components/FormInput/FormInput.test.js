import React from 'react'
import enzyme from '../../lib/enzyme'
import FormInput from './FormInput'

describe('Test form input', function () {
  let wrapper

  beforeEach(() => {
    wrapper = enzyme.mount(<FormInput/>)
  })

  it('Should set initial input value', function () {
    const inputValue = 'value'

    wrapper.setProps({ inputValue })

    wrapper.update()

    expect(wrapper.find('input').props().defaultValue).toBe(inputValue)
  })

  it('should set input label', function () {
    const inputLabel = 'label'

    wrapper.setProps({ inputLabel })

    expect(wrapper.find('label').text()).toBe(inputLabel)
  })

  it('should set error box', function () {
    const invalidFeedback = 'invalidFeedback'

    wrapper.setProps({ invalidFeedback })

    expect(wrapper.find('input').hasClass('is-invalid')).toBeTruthy()
    expect(wrapper.find('.invalid-feedback').text()).toBe(invalidFeedback)
  })

  it('should call on change', function () {
    const changeValue = 'value'
    const onChange = jest.fn()

    wrapper.setProps({ onChange })

    wrapper.find('input').simulate('change', { target: { value: changeValue } })

    expect(onChange).toHaveBeenCalled()
  })
})
