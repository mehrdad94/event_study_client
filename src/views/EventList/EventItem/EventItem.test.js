import React from 'react'
import { EventItem } from './EventItem'
import enzyme from '../../../lib/enzyme'

it('should check props', () => {
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
