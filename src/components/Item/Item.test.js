import React from 'react'
import { Item } from './Item'
import enzyme from '../../lib/enzyme'

it('should test props', function () {
    let deleteClicked = false
    let editClicked = false

    const props = {
        onDeleteClick () {
            deleteClicked = true
        },
        onEditClick () {
            editClicked = true
        },
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
    const editButton = wrapper.find('.item-edit-btn')

    deleteButton.simulate('click')
    editButton.simulate('click')

    expect(deleteClicked).toBe(true)
    expect(editClicked).toBe(true)
})