import React from 'react'
import { EventAdd } from './EventAdd'
import enzyme from '../../../lib/enzyme'
import 'bootstrap'
import 'bootstrap-datepicker/dist/js/bootstrap-datepicker.min.js'

it('should call on modal open', function (done) {
    const onModalOpen = () => {
        expect(true).toBe(true)
        done()
    }

    enzyme.mount(<EventAdd isActive={true} onModalOpen={onModalOpen}/>)
})

it('should call on modal close', function (done) {
    const onModalClose = () => {
        expect(true).toBe(true)
        done()
    }

    const onModalOpen = () => {
        wrapper.setProps({ isActive: false })
        wrapper.update()
    }

    const wrapper = enzyme.mount(<EventAdd isActive={true} onModalOpen={onModalOpen} onModalClose={onModalClose}/>)
})

it('should has Title, Description, Date Field', function () {
    const wrapper = enzyme.mount(<EventAdd/>)

    const state = {
        title: 'title',
        date: '05/28/2019',
        description: 'description'
    }

    wrapper.setState(state)

    const findElement = elm => wrapper.find(elm)

    const titleField = () => findElement('#eventAddTitle')
    const dateField = () => findElement('#eventAddDate')
    const descriptionField = () => findElement('#eventAddDescription')

    expect(titleField().props().value).toBe(state.title)
    expect(dateField().props().value).toBe(state.date)
    expect(descriptionField().props().value).toBe(state.description)

    const nextState = {
        title: 'title 1',
        date: '05/28/2020',
        description: 'description 1'
    }

    // change input value
    titleField().simulate('change', {target: { value: nextState.title } })
    dateField().simulate('change', {target: { value: nextState.date } })
    descriptionField().simulate('change', {target: { value: nextState.description } })

    wrapper.update()

    expect(wrapper.state('title')).toBe(nextState.title)
    expect(wrapper.state('date')).toBe(nextState.date)
    expect(wrapper.state('description')).toBe(nextState.description)
})
