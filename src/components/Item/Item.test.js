import React from 'react'
import { Item } from './Item'
import enzyme from '../../lib/enzyme'

it('should test props', function () {
    const props = {
        onDeleteClick: jest.fn(),
        onItemClick: jest.fn(),
        title: 'title',
        description: 'description',
        descriptionColor: 'success'
    }

    const wrapper = enzyme.mount(<Item {...props}/>)

    const titleComponent = wrapper.find('.item-title')
    const descriptionComponent = wrapper.find('.item-description')

    expect(titleComponent.text()).toBe(props.title)
    expect(descriptionComponent.text()).toBe(props.description)
    expect(descriptionComponent.hasClass('c-green-500')).toBe(true)

    const deleteButton = wrapper.find('.item-delete-btn')
    const item = wrapper.find('.item')

    deleteButton.simulate('click')
    item.simulate('click')

    expect(props.onDeleteClick).toHaveBeenCalled()
    expect(props.onItemClick).toHaveBeenCalled()
})