import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { EventItem } from './EventItem/EventItem'
import { EventAdd } from './EventAdd/EventAdd'

export class EventList extends React.Component {
    state = {
        isEventAddModalActive: false
    }

    renderEvents = () => {
        return this.props.items.map((item, index) => <EventItem key={index} {...item}/>)
    }

    onPlusClick = () => {
        this.setState({
            isEventAddModalActive: true
        })
    }

    onEventAddModalClose = () => {
        this.setState({
            isEventAddModalActive: false
        })
    }

    render() {
        return (
            <Fragment>
                <div className="bdrs-3 ov-h bgc-white bd">
                    <div className="bgc-deep-purple-500 ta-c p-30">
                        <h1 className="fw-300 mB-5 lh-1 c-white">01<span className="fsz-def">st</span></h1>
                        <h3 className="c-white">Event List</h3>
                    </div>
                    <div className="pos-r">
                        <button type="button"
                                onClick={this.onPlusClick}
                                className="mT-nv-50 pos-a r-10 t-2 btn cur-p bdrs-50p p-0 w-3r h-3r btn-warning">
                            <i className="ti-plus"/>
                        </button>

                        <ul className="m-0 p-0 mT-20 eventItems">
                            { this.renderEvents() }
                        </ul>
                    </div>
                </div>

                <EventAdd isActive={this.state.isEventAddModalActive}
                          onModalClose={this.onEventAddModalClose}/>
            </Fragment>
        )
    }
}

EventList.propTypes = {
    items: PropTypes.array
}

EventList.defaultProps = {
    items: []
}
