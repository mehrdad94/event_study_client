import React, { Fragment } from 'react'
import uuid from 'uuid/v4'
import { connect } from 'react-redux'
import {
    createEvent,
    updateEvent,
    deleteEvent,
    selectEvent,
    deselectEvent,
    createAnalysis,
    updateAnalysis
} from '../../redux/actions'
import { EventItem } from './EventItem/EventItem'
import EventDialog from './EventDialog/EventDialog'
import { ConfirmModal } from '../../components/ConfirmDialog/ConfirmModal'
import { Unavailable } from '../../components/Unavailable/Unavailable'
import './EventList.scss'
import { MarketModel } from 'event-study'

const deleteConfirmModalQuestion = 'Are you sure that you want to delete this Event?'
const addEventDialogTitle = 'Add Event'
const editEventDialogTitle = 'Edit Event'

let eventDialogPhase = 'add' // add or edit
let eventToModify

const CREATE_EVENT = 'Create Event'
const CREATE_EVENT_DESCRIPTION = 'You should create dates of events.'

const unavailableProps = {
    title: CREATE_EVENT,
    description: CREATE_EVENT_DESCRIPTION,
    isActive: true
}

export class EventList extends React.Component {
    state = {
        eventDialogTitle: '',
        eventDialogEvent: {},
        isEventDialogActive: false,
        isConfirmDialogActive: false,
        eventList: []
    }

    renderUnavailableComponent = () => {
        if (!this.props.eventList || !this.props.eventList.length) return <Unavailable {...unavailableProps}/>
        else return null
    }

    onDeleteClick = event => {
        eventToModify = event
        this.setState({
            isConfirmDialogActive: true
        })
    }

    onEditClick = event => {
        eventDialogPhase = 'edit'
        eventToModify = event
        this.setState({
            eventDialogTitle: editEventDialogTitle,
            eventDialogEvent: event,
            isEventDialogActive: true
        })
    }

    onEventClick = event => {
        if (this.props.activeEvents[event.key]) {
            this.props.deselectEvent(event, this.props.stockKey)
        } else {
            this.props.selectEvent(event, this.props.stockKey)
        }
    }

    renderEvents = () => {
        if (!this.props.eventList) return null

        return this.props.eventList.map(item => (
          <EventItem onDeleteClick={() => this.onDeleteClick(item)}
                     onEditClick={() => this.onEditClick(item)}
                     onItemClick={() => this.onEventClick(item)}
                     isActive={Boolean(this.props.activeEvents[item.key])}
                     key={item.key}
                     {...item}/>)
        )
    }

    onPlusClick = () => {
        eventDialogPhase = 'add'
        this.setState({
            isEventDialogActive: true,
            eventDialogTitle: addEventDialogTitle,
            eventDialogEvent: {}
        })
    }

    onEventAddModalClose = () => {
        this.setState({
            isEventDialogActive: false
        })
    }

    onConfirmModalClose = () => {
        this.setState({
            isConfirmDialogActive: false
        })
    }

    onEventDialogAccept = data => {
        const { date, T0T1, T1E, ET2, T2T3, market, stock, dateColumn, operationColumn } = data

        const timeline = { T0T1, T1E, ET2, T2T3 }

        const calendar = [{
            date,
            stock,
            market,
            timeline,
            dateColumn,
            operationColumn
        }]

        const statsResult = MarketModel({ calendar })[0]

        if (eventDialogPhase === 'add') {
            data.key = uuid()
            this.props.createEvent(data, this.props.stockKey)
            this.props.createAnalysis(statsResult, this.props.stockKey, data.key)
        } else {
            data.key = eventToModify.key
            this.props.updateEvent(data, this.props.stockKey)
            this.props.updateAnalysis(statsResult, this.props.stockKey, data.key)
        }
    }

    onDeleteEventAccept = () => {
        this.setState({
            isConfirmDialogActive: false
        })
        this.props.deleteEvent(eventToModify.key, this.props.stockKey)
    }

    render() {
        return (
            <Fragment>
                <div className="bdrs-3 ov-h bgc-white h-100p bd">
                    <div className="bgc-deep-purple-500 ta-c p-30">
                        <h3 className="c-white">Event List</h3>
                    </div>
                    <div className="pos-r event-items-wrap">
                        {
                            this.renderUnavailableComponent()
                        }
                        <button type="button"
                                onClick={this.onPlusClick}
                                className="mT-nv-50 pos-a r-10 t-25 zi-2 btn cur-p bdrs-50p p-0 w-3r h-3r btn-warning event-dialog-btn">
                            <i className="ti-plus"/>
                        </button>

                        {/* Event List */}
                        <ul className="m-0 p-0" id="event-items">
                            { this.renderEvents() }
                        </ul>
                    </div>
                </div>

                {/* Add and Edit Dialog */}
                <EventDialog isActive={this.state.isEventDialogActive}
                             dialogTitle={this.state.eventDialogTitle}
                             onModalClose={this.onEventAddModalClose}
                             onAccept={this.onEventDialogAccept}
                             event={this.state.eventDialogEvent}/>


                {/* Delete Confirm Dialog*/}
                <ConfirmModal isActive={this.state.isConfirmDialogActive}
                              onModalClose={this.onConfirmModalClose}
                              onAccept={this.onDeleteEventAccept}
                              question={deleteConfirmModalQuestion}/>
            </Fragment>
        )
    }
}

// selectors
const getStockKey = state => state.stocks.activeStock.key
const getEventList = state => state.events.events[state.stocks.activeStock.key]
const getActiveEvents = state => state.events.activeEvents[state.stocks.activeStock.key]

const mapStateToProps = state => {
    return {
        stockKey: getStockKey(state),
        eventList: getEventList(state),
        activeEvents: getActiveEvents(state)
    }
}

const actionCreators = {
    createEvent,
    updateEvent,
    deleteEvent,
    selectEvent,
    deselectEvent,
    createAnalysis,
    updateAnalysis
}

export default connect(mapStateToProps, actionCreators)(EventList)
