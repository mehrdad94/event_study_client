import React from 'react'
import { StocksItem } from './StocksItem'
import enzyme from '../../../lib/enzyme'

it('should test props', function () {
    const props = {
        onDeleteClick: jest.fn(),
        onItemClick: jest.fn(),
        title: 'title',
        description: 'description',
        descriptionColor: 'success',
        isActive: true
    }

    const wrapper = enzyme.mount(<StocksItem {...props}/>)

    const titleComponent = wrapper.find('.item-title')
    const descriptionComponent = wrapper.find('.item-description')

    expect(titleComponent.text()).toBe(props.title)
    expect(descriptionComponent.text()).toBe(props.description)
    expect(descriptionComponent.hasClass('c-green-500')).toBe(true)

    const deleteButton = wrapper.find('.item-delete-btn')
    const item = wrapper.find('.item')

    expect(item.hasClass('bgc-grey-50')).toBe(true)

    deleteButton.simulate('click')
    item.simulate('click')

    expect(props.onDeleteClick).toHaveBeenCalled()
    expect(props.onItemClick).toHaveBeenCalled()
})