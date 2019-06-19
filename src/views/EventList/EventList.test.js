import React from 'react'
import { EventList } from './EventList'
import enzyme from '../../lib/enzyme'
import 'bootstrap'
import 'bootstrap-datepicker/dist/js/bootstrap-datepicker.min.js'

it('should check rendered elements', () => {
    const props = {
        items: [
            {
                title: 'title',
                date: 'date',
                description: 'description'
            }
        ]
    }

    const wrapper = enzyme.shallow(<EventList {...props}/>)

    const itemsComponent = wrapper.find('.eventItems')

    expect(itemsComponent.children().length).toBe(1)
})

it('should show confirm dialog when user clicks on delete button', function () {
    const props = {
        items: [
            {
                title: 'title',
                date: 'date',
                description: 'description'
            }
        ]
    }

    const wrapper = enzyme.mount(<EventList {...props}/>)

    const deleteButton = wrapper.find('.delete-icon-btn')

    deleteButton.simulate('click')

    expect(wrapper.state('isConfirmDialogActive')).toBe(true)
    expect(wrapper.find('.question').text().length > 1).toBe(true)
})

it('should show edit dialog when user clicks on edit button', function () {
    const props = {
        items: [
            {
                title: 'title',
                date: 'date',
                description: 'description'
            }
        ]
    }

    const wrapper = enzyme.mount(<EventList {...props}/>)

    const editButton = wrapper.find('.edit-icon-btn')

    editButton.simulate('click')

    const findElement = elm => wrapper.find(elm)

    const titleField = () => findElement('#eventAddTitle')
    const dateField = () => findElement('#eventAddDate')
    const descriptionField = () => findElement('#eventAddDescription')

    expect(titleField().props().value).toBe(props.items[0].title)
    expect(dateField().props().value).toBe(props.items[0].date)
    expect(descriptionField().props().value).toBe(props.items[0].description)
})