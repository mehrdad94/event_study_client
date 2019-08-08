import React from 'react'
import uuid from 'uuid/v4'
import { EventList } from './EventList'
import enzyme from '../../lib/enzyme'
import 'bootstrap'
import 'bootstrap-datepicker/dist/js/bootstrap-datepicker.min.js'

describe('Event list', function () {
    let wrapper

    const event = {
        key: uuid(),
        title: 'title',
        date: 'dateValue',
        description: 'descriptionValue'
    }

    const eventList = [event]

    const activeEvents = {
        [event.key]: event.key
    }

    const props = {
        eventList,
        activeEvents,
        createEvent: jest.fn(),
        updateEvent: jest.fn(),
        deleteEvent: jest.fn(),
        selectEvent: jest.fn(),
        deselectEvent: jest.fn(),
        createAnalysis: jest.fn(),
        updateAnalysis: jest.fn()
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

        const titleValue = 'title'
        const dateValue = 'dateValue'

        titleField().simulate('change', { target: { value: titleValue} })
        dateField().simulate('change', { target: { value: dateValue } })

        const acceptButton = () => findElement('#event-dialog-modal .modal-footer .btn-primary')

        acceptButton().simulate('click')

        expect(props.createEvent).toHaveBeenCalled()
        expect(props.createAnalysis).toHaveBeenCalled()
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
        expect(props.updateAnalysis).toHaveBeenCalled()
    })

    it('should delete an event', function () {
        const findElement = elm => wrapper.find(elm)

        const eventItems = () => findElement('#event-items')

        eventItems().find('.delete-icon-btn').simulate('click')

        wrapper.find('.confirm-dialog .btn-primary').simulate('click')

        expect(props.deleteEvent).toHaveBeenCalled()
    })

    it('should deselect an event', function () {
        const findElement = elm => wrapper.find(elm)

        const eventItems = () => findElement('#event-items')

        eventItems().find('.item').simulate('click')

        expect(props.deselectEvent).toHaveBeenCalled()
    })

    it('should select an event', function () {
        wrapper.setProps({
            activeEvents: {}
        })

        const findElement = elm => wrapper.find(elm)

        const eventItems = () => findElement('#event-items')

        eventItems().find('.item').simulate('click')

        expect(props.selectEvent).toHaveBeenCalled()
    })
})
