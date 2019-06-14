import React from 'react'
import { EventList } from './EventList'
import enzyme from '../../lib/enzyme'

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
