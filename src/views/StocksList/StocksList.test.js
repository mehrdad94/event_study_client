import React from 'react'
import { StocksList } from './StocksList'
import enzyme from '../../lib/enzyme'
import 'bootstrap'
import 'bootstrap-datepicker/dist/js/bootstrap-datepicker.min.js'

describe('StocksList', () => {
  let wrapper

  const props = {
    createStock: jest.fn(),
    deleteStock: jest.fn(),
    stocks: [{
      key: '123',
      title: 'something'
    }]
  }

  beforeEach(() => {
    wrapper = enzyme.mount(<StocksList {...props}/>)
  })

  it('should render stocks', function () {
    const stockListElm = wrapper.find('.scrollable')

    expect(stockListElm.children().length).toBeGreaterThan(0)
  });

  it('Should click on add stock item', function () {
    const inputElm = wrapper.find('input')
    const inputValue = 'text'
    inputElm.simulate('change', {target: { value: inputValue } })

    const addBtn = wrapper.find('.btn.add')
    addBtn.simulate('click')

    expect(props.createStock).toHaveBeenCalled()

    expect(inputElm.props().value).toBe('')
  });

  it('should open confirm dialog and accept to delete', function () {
    const deleteButton = wrapper.find('.item-delete-btn')

    deleteButton.simulate('click')

    const confirmAcceptButton = wrapper.find('.modal .btn.btn-primary')

    confirmAcceptButton.simulate('click')

    expect(props.deleteStock).toHaveBeenCalled()
  });
})
