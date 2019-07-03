import React from 'react'
import uuid from 'uuid/v4'
import { EventList } from './EventList'
import enzyme from '../../lib/enzyme'
import 'bootstrap'
import 'bootstrap-datepicker/dist/js/bootstrap-datepicker.min.js'

describe('Event list', function () {
    let wrapper

    const eventList = [{
        key: uuid(),
        title: 'title',
        date: 'dateValue',
        description: 'descriptionValue'
    }]

    const props = {
        eventList,
        createEvent: jest.fn(),
        updateEvent: jest.fn(),
        deleteEvent: jest.fn()
    }

    beforeEach(() => {
        wrapper = enzyme.mount(<EventList {...props}/>)
    })

    it('should show confirm dialog when user clicks on delete button', function () {
        const deleteButton = wrapper.find('.delete-icon-btn')

        deleteButton.simulate('click')

        expect(wrapper.state('isConfirmDialogActive')).toBe(true)
        expect(wrapper.find('.question').text().length).toBeGreaterThan(1)
    })

    it('should add an item to list of items', function () {
        const eventDialogButton = wrapper.find('.event-dialog-btn')

        eventDialogButton.simulate('click')

        const findElement = elm => wrapper.find(elm)

        const titleField = () => findElement('#eventAddTitle')
        const dateField = () => findElement('#eventAddDate')
        const descriptionField = () => findElement('#eventAddDescription')

        const titleValue = 'title'
        const dateValue = 'dateValue'
        const descriptionValue = 'descriptionValue'

        titleField().simulate('change', { target: { value: titleValue} })
        dateField().simulate('change', { target: { value: dateValue } })
        descriptionField().simulate('change', { target: { value: descriptionValue } })

        const acceptButton = () => findElement('#event-dialog-modal .modal-footer .btn-primary')

        acceptButton().simulate('click')

        expect(props.createEvent).toHaveBeenCalled()
    })

    it('should edit an event', function () {
        const newTitle = 'newTitle'

        const findElement = elm => wrapper.find(elm)

        const eventItems = () => findElement('#event-items')

        eventItems().find('.edit-icon-btn').simulate('click')

        const titleField = () => findElement('#eventAddTitle')

        titleField().simulate('change', { target: { value: newTitle} })

        const acceptButton = () => findElement('#event-dialog-modal .modal-footer .btn-primary')

        acceptButton().simulate('click')

        expect(props.updateEvent).toHaveBeenCalled()
    })

    it('should delete an event', function () {
        const findElement = elm => wrapper.find(elm)

        const eventItems = () => findElement('#event-items')

        eventItems().find('.delete-icon-btn').simulate('click')

        wrapper.find('.confirm-dialog .btn-primary').simulate('click')

        expect(props.deleteEvent).toHaveBeenCalled()
    })
})
