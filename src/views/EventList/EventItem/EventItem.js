import React from 'react'
import PropTypes from 'prop-types'

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

    render() {
        const { title, description, date } = this.props
        const activeEventClass = this.props.isActive ? 'bgc-grey-50' : ''
        return (
            <li onClick={this.onItemClick} className={`bdB peers ai-c bgcH-grey-50 jc-sb fxw-nw cur-p item ${activeEventClass}`}>
                <a className="td-n p-20 peers fxw-nw mR-20 peer-greed c-grey-900">
                    <div className="peer">
                        <span className="fw-600 eventItemTitle">{title}</span>
                        <div className="c-grey-600">
                            <span className="c-grey-700 eventItemDate">{date} - </span>
                            <i className="eventItemDescription">{description}</i>
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
    description: PropTypes.string,
    onDeleteClick: PropTypes.func,
    onEditClick: PropTypes.func,
    onItemClick: PropTypes.func,
    isActive: PropTypes.bool
}

EventItem.defaultProps = {
    title: '',
    date: '',
    description: '...',
    onDeleteClick: () => {},
    onEditClick: () => {},
    onItemClick: () => {},
    isActive: false
}
