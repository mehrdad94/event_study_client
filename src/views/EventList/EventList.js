import React, { Fragment } from 'react'
import { EventItem } from './EventItem/EventItem'
export class EventList extends React.Component {
    renderEvents = () => {
        return this.props.items.map((item, index) => <EventItem key={index} {...item}/>)
    }

    render() {
        return (
            <Fragment>
                <ul className="m-0 p-0 mT-20 eventItems">
                    { this.renderEvents() }
                </ul>
            </Fragment>
        )
    }
}
