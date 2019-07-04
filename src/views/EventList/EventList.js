import React, { Fragment } from 'react'
import uuid from 'uuid/v4'
import { connect } from 'react-redux'
import { createEvent, updateEvent, deleteEvent } from '../../redux/actions'
import { EventItem } from './EventItem/EventItem'
import { EventDialog } from './EventDialog/EventDialog'
import { ConfirmModal } from '../../components/ConfirmDialog/ConfirmModal'
import './EventList.scss'
import {Unavailable} from "../../components/Unavailable/Unavailable";

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
        eventDialogProps: {},
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
            isEventDialogActive: true,
            eventDialogTitle: editEventDialogTitle,
            eventDialogProps: event
        })
    }

    renderEvents = () => {
        if (!this.props.eventList) return null

        return this.props.eventList.map(item => (
          <EventItem onDeleteClick={() => this.onDeleteClick(item)}
                     onEditClick={() => this.onEditClick(item)}
                     key={item.key}
                     {...item}/>)
        )
    }

    onPlusClick = () => {
        eventDialogPhase = 'add'
        this.setState({
            isEventDialogActive: true,
            eventDialogTitle: addEventDialogTitle,
            eventDialogProps: {
                title: '',
                date: '',
                description: ''
            }
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
        if (eventDialogPhase === 'add') {
            data.key = uuid()
            this.props.createEvent(data, this.props.stockKey)
        } else {
            data.key = eventToModify.key
            this.props.updateEvent(data, this.props.stockKey)
        }
    }

    onDeleteEventAccept = () => {
        this.props.deleteEvent(eventToModify.key, this.props.stockKey)
    }

    render() {
        return (
            <Fragment>
                <div className="bdrs-3 ov-h bgc-white h-100p bd">
                    <div className="bgc-deep-purple-500 ta-c p-30">
                        <h1 className="fw-300 mB-5 lh-1 c-white">01<span className="fsz-def">st</span></h1>
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
                             {...this.state.eventDialogProps}/>


                {/* Delete Confirm Dialog*/}
                <ConfirmModal isActive={this.state.isConfirmDialogActive}
                              onModalClose={this.onConfirmModalClose}
                              onAccept={this.onDeleteEventAccept}
                              question={deleteConfirmModalQuestion}/>
            </Fragment>
        )
    }
}

const mapStateToProps = state => {
    const stockKey = state.stocks.activeStock.key

    return {
        eventList: state.events[stockKey],
        stockKey: stockKey
    }
}

const actionCreators = {
    createEvent,
    updateEvent,
    deleteEvent
}

export default connect(mapStateToProps, actionCreators)(EventList)
