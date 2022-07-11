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
    updateAnalysis,
    setActiveMainFrame,
    deleteAnalysis
} from '../../redux/actions'

import { EventItem } from './EventItem/EventItem'
import EventDialog from './EventDialog/EventDialog'
import { ConfirmModal } from '../../components/ConfirmDialog/ConfirmModal'
import { Unavailable } from '../../components/Unavailable/Unavailable'
import './EventList.css'
import PerfectScrollbar from 'perfect-scrollbar'

const deleteConfirmModalQuestion = 'Are you sure that you want to delete this Event?'
const addEventDialogTitle = 'Add Event'
const editEventDialogTitle = 'Edit Event'

let eventDialogPhase = 'add' // add or edit
let eventToModify

const CREATE_EVENT = 'Create Event'
const CREATE_EVENT_DESCRIPTION = 'Click on the plus sign.'

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
                     eventType={this.props.analysis[item.key].newsType}
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

    onAnalysisClick = () => {
        this.props.setActiveMainFrame('ANALYSIS')
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

    onEventDialogAccept = ({ eventsData, statsResults }) => {
        statsResults.forEach((statsResult, index) => {
            const eventData = eventsData[index]

            if (!eventData) return

            if (eventDialogPhase === 'add') {
                eventData.key = uuid()
                this.props.createAnalysis(statsResult, this.props.stockKey, eventData.key)
                this.props.createEvent(eventData, this.props.stockKey)
            } else {
                eventData.key = eventToModify.key
                this.props.updateEvent(eventData, this.props.stockKey)
                this.props.updateAnalysis(statsResult, this.props.stockKey, eventData.key)
            }
        })
    }

    onDeleteEventAccept = () => {
        this.setState({
            isConfirmDialogActive: false
        })
        this.props.deleteEvent(eventToModify.key, this.props.stockKey)
    }
    componentDidMount() {
        new PerfectScrollbar(this.refs.scrollable)
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
                        <div className="d-ib pos-a r-10 t-25 zi-2 mT-nv-50">
                            <button type="button"
                                    onClick={this.onAnalysisClick}
                                    className="btn cur-p bdrs-50p p-0 w-3r h-3r btn-warning event-list-analyse-btn d-n@md+">
                                <i className="ti-stats-up"/>
                            </button>

                            <button type="button"
                                    onClick={this.onPlusClick}
                                    className="btn cur-p bdrs-50p p-0 w-3r h-3r btn-warning event-dialog-btn ml-3">
                                <i className="ti-plus"/>
                            </button>
                        </div>

                        {/* Event List */}
                        <ul className="m-0 p-0 pos-r" ref="scrollable" id="event-items">
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
const defaultAnalysisList = []

const getStockKey = state => state.stocks.activeStock.key
const getEventList = state => state.events.events[state.stocks.activeStock.key]
const getActiveEvents = state => state.events.activeEvents[state.stocks.activeStock.key]
const getAnalysisList = state => state.analysis.analysis[state.stocks.activeStock.key] || defaultAnalysisList

const mapStateToProps = state => {
    return {
        stockKey: getStockKey(state),
        eventList: getEventList(state),
        activeEvents: getActiveEvents(state),
        analysis: getAnalysisList(state)
    }
}

const actionCreators = {
    createEvent,
    updateEvent,
    deleteEvent,
    selectEvent,
    deselectEvent,
    createAnalysis,
    updateAnalysis,
    setActiveMainFrame,
    deleteAnalysis
}

export default connect(mapStateToProps, actionCreators)(EventList)
