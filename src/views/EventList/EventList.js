import React, { Fragment } from 'react'
import { EventItem } from './EventItem/EventItem'
import { EventDialog } from './EventDialog/EventDialog'
import { ConfirmModal } from '../../components/ConfirmDialog/ConfirmModal'
import './EventList.scss'

const deleteConfirmModalQuestion = 'Are you sure that you want to delete this Event?'
const addEventDialogTitle = 'Add Event'
const editEventDialogTitle = 'Edit Event'

let eventDialogPhase = 'add' // add or edit
let eventKey

export class EventList extends React.Component {
    state = {
        eventDialogTitle: '',
        eventDialogProps: {},
        isEventDialogActive: false,
        isConfirmDialogActive: false,
        eventList: []
    }

    onDeleteClick = (index) => {
        eventKey = index
        this.setState({
            isConfirmDialogActive: true
        })
    }

    onEditClick = (index) => {
        eventDialogPhase = 'edit'
        eventKey = index
        this.setState({
            isEventDialogActive: true,
            eventDialogTitle: editEventDialogTitle,
            eventDialogProps: this.state.eventList[index]
        })
    }

    renderEvents = () => {
        return this.state.eventList.map((item, index) => <EventItem onDeleteClick={() => this.onDeleteClick(index)} onEditClick={() => this.onEditClick(index)} key={index} {...item}/>)
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
            this.setState({
                eventList: [
                    ...this.state.eventList,
                    data
                ]
            })
        } else {
            const newList = [...this.state.eventList]
            newList[eventKey] = Object.assign({}, newList[eventKey], data)
            this.setState({
                eventList: newList
            })
        }
    }

    onDeleteEventAccept = () => {
        let newList = [...this.state.eventList]

        newList.splice(eventKey, 1)

        this.setState({
            eventList: newList
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
                                className="mT-nv-50 pos-a r-10 t-2 btn cur-p bdrs-50p p-0 w-3r h-3r btn-warning event-dialog-btn">
                            <i className="ti-plus"/>
                        </button>

                        <ul className="m-0 p-0 mT-20" id="event-items">
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
