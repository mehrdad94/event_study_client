import enzyme from '../../lib/enzyme'
import { Header } from './Header'
import React from 'react'

describe("Header component", () => {
  let wrapper

  const props = {
    showSetting: jest.fn(),
    stockListStatus: true,
    hideStockList: jest.fn(),
    showStockList: jest.fn()
  }

  beforeEach(() => {
    wrapper = enzyme.mount(<Header {...props}/>)
  })

  it('should open setting', function () {
    const settingBtn = wrapper.find('.open-setting-btn')

    settingBtn.simulate('click')

    expect(props.showSetting).toHaveBeenCalled()
  })

  it('should hide setting', function () {
    const stockListToggleBtn = wrapper.find('.stock-list-toggle')

    stockListToggleBtn.simulate('click')

    expect(props.hideStockList)

    wrapper.setProps({
      stockListStatus: false
    })

    stockListToggleBtn.simulate('click')

    expect(props.showStockList)
  })
})