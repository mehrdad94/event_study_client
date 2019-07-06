import React from 'react'
import { EventItem } from './EventItem'
import enzyme from '../../../lib/enzyme'

it('should check props', function () {
    const props = {
        title: 'title',
        date: 'date',
        description: 'description'
    }

    const wrapper = enzyme.shallow(<EventItem {...props}/>)

    const titleComponent = wrapper.find('.eventItemTitle')
    const dateComponent = wrapper.find('.eventItemDate')
    const descriptionComponent = wrapper.find('.eventItemDescription')

    expect(titleComponent.text()).toBe(props.title)
    expect(dateComponent.text()).toBe(`${props.date} - `)
    expect(descriptionComponent.text()).toBe(props.description)
})

it('should active an item', function () {
    const wrapper = enzyme.shallow((<EventItem isActive={true}/>))

    const item = wrapper.find('.item')

    expect(item.hasClass('bgc-grey-50')).toBe(true)
});
it('should click on delete button', function () {
    const mockCallBack = jest.fn()

    const wrapper = enzyme.shallow((<EventItem onDeleteClick={mockCallBack}/>))

    wrapper.find('.delete-icon-btn').simulate('click')

    expect(mockCallBack.mock.calls.length).toEqual(1)
})

it('should click on edit button', function () {
    const mockCallBack = jest.fn()

    const wrapper = enzyme.shallow((<EventItem onEditClick={mockCallBack}/>))

    wrapper.find('.edit-icon-btn').simulate('click')

    expect(mockCallBack.mock.calls.length).toEqual(1)
})

it('should click on item', function () {
    const mockCallBack = jest.fn()

    const wrapper = enzyme.shallow((<EventItem onItemClick={mockCallBack}/>))

    wrapper.find('.item').simulate('click')

    expect(mockCallBack).toHaveBeenCalled()
});
