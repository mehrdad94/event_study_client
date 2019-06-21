import React from 'react'
import { EventList } from './EventList'
import enzyme from '../../lib/enzyme'
import 'bootstrap'
import 'bootstrap-datepicker/dist/js/bootstrap-datepicker.min.js'

it('should show confirm dialog when user clicks on delete button', function () {
    const wrapper = enzyme.mount(<EventList/>)

    const deleteButton = wrapper.find('.delete-icon-btn')

    deleteButton.simulate('click')

    expect(wrapper.state('isConfirmDialogActive')).toBe(true)
    expect(wrapper.find('.question').text().length > 1).toBe(true)
})

it('should add an item to list of items', function () {
    const wrapper = enzyme.mount(<EventList/>)

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

    const eventItems = () => findElement('#event-items')


    expect(eventItems().find('.eventItemTitle').text()).toBe(titleValue)
    expect(eventItems().find('.eventItemDate').text()).toBe(dateValue + ' - ')
    expect(eventItems().find('.eventItemDescription').text()).toBe(descriptionValue)
})

it('should delete an event', function () {
    const title = 'title'
    const date = 'dateValue'
    const description = 'descriptionValue'

    const items = [{
        title,
        date,
        description
    }]

    const wrapper = enzyme.mount(<EventList/>)

    wrapper.setState({
        eventList: items
    })


    const findElement = elm => wrapper.find(elm)

    const eventItems = () => findElement('#event-items')

    expect(eventItems().find('.eventItemTitle').text()).toBe(items[0].title)
    expect(eventItems().find('.eventItemDate').text()).toBe(items[0].date + ' - ')
    expect(eventItems().find('.eventItemDescription').text()).toBe(items[0].description)


    eventItems().find('.delete-icon-btn').simulate('click')

    wrapper.find('.confirm-dialog .btn-primary').simulate('click')

    expect(eventItems().children().length).toBe(0)
})

it('should edit an event', function () {
    const title = 'title'
    const newTitle = 'newTitle'
    const date = 'dateValue'
    const description = 'descriptionValue'

    const items = [{
        title,
        date,
        description
    }]

    const wrapper = enzyme.mount(<EventList/>)

    wrapper.setState({
        eventList: items
    })

    const findElement = elm => wrapper.find(elm)

    const eventItems = () => findElement('#event-items')

    eventItems().find('.edit-icon-btn').simulate('click')

    const titleField = () => findElement('#eventAddTitle')

    titleField().simulate('change', { target: { value: newTitle} })

    const acceptButton = () => findElement('#event-dialog-modal .modal-footer .btn-primary')

    acceptButton().simulate('click')

    expect(eventItems().find('.eventItemTitle').text()).toBe(newTitle)
})