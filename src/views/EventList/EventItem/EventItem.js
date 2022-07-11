import React from 'react'
import PropTypes from 'prop-types'
import './EventItem.css'

export class EventItem extends React.Component {
    onDeleteClick = e => {
        e.stopPropagation()
        this.props.onDeleteClick(e)
    }

    onEditClick = e => {
        e.stopPropagation()
        this.props.onEditClick(e)
    }

    onItemClick = e => {
        this.props.onItemClick(e)
    }

    getEventTypeClassName = type => {
        if (type === 1) return 'event-item-good'
        else if (type === 0) return 'event-item-neutral'
        else return 'event-item-bad'
    }
    render() {
        const { title, date, T0T1, T1E, ET2, T2T3 } = this.props
        const activeEventClass = this.props.isActive ? 'bgc-grey-50' : ''
        const eventTypeClass = this.getEventTypeClassName(this.props.eventType)

        return (
            <li onClick={this.onItemClick} className={`bdB peers ai-c bgcH-grey-50 jc-sb fxw-nw cur-p item ${activeEventClass} ${eventTypeClass}`}>
                <a className="td-n p-20 peers fxw-nw mR-20 peer-greed c-grey-900">
                    <div className="peer">
                        <span className="fw-600 eventItemTitle">{title}</span>
                        <div className="c-grey-600">
                            <span className="c-grey-700 eventItemDate">{date}</span>
                        </div>
                        <div className="c-grey-600">
                            <span className="c-grey-700 eventItemDate">
                                Timeline: {T0T1}, {T1E}, {ET2}, {T2T3}
                            </span>
                        </div>
                    </div>
                </a>
                <div className="peers mR-15">
                    <div className="peer">
                        <a href="#"
                           className="td-n c-deep-purple-500 cH-blue-500 fsz-md p-5 edit-icon-btn"
                           onClick={this.onEditClick}>
                            <i className="ti-pencil"/>
                        </a>
                    </div>
                    <div className="peer">
                        <a href="#"
                           className="td-n c-red-500 cH-blue-500 fsz-md p-5 delete-icon-btn"
                           onClick={this.onDeleteClick}>
                            <i className="ti-trash"/>
                        </a>
                    </div>
                </div>
            </li>
        )
    }
}

EventItem.propTypes = {
    title: PropTypes.string,
    date: PropTypes.string,
    eventType: PropTypes.number,
    description: PropTypes.string,
    onDeleteClick: PropTypes.func,
    onEditClick: PropTypes.func,
    onItemClick: PropTypes.func,
    isActive: PropTypes.bool
}

EventItem.defaultProps = {
    title: '',
    date: '',
    eventType: 0,
    description: '...',
    onDeleteClick: () => {},
    onEditClick: () => {},
    onItemClick: () => {},
    isActive: false
}
