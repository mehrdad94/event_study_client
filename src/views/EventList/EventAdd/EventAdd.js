import React from 'react'
import PropTypes from 'prop-types'
import $ from 'jquery'

let jqueryModalRef

export class EventAdd extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            date: '',
            description: ''
        }
    }

    static showModal () {
        jqueryModalRef.modal('show')
    }

    static hideModal () {
        jqueryModalRef.modal('hide')
    }

    componentDidMount (){
        jqueryModalRef = $(this.refs.modal)

        jqueryModalRef.on('hidden.bs.modal', e => { this.props.onModalClose(e) })

        jqueryModalRef.on('shown.bs.modal', e => { this.props.onModalOpen(e) })

        if (this.props.isActive) EventAdd.showModal()

        $('.event-date').datepicker()
    }

    componentDidUpdate (prevProps) {
        if (this.props.isActive !== prevProps.isActive) {
            this.props.isActive ? EventAdd.showModal() : EventAdd.hideModal()
        }
    }

    handleChange (type, event) {
        this.setState({ [type]: event.target.value})
    }

    render() {
        return (
            <div className="modal fade" ref='modal'>
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="bd p-15">
                            <h5 className="m-0">Add Event</h5>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="form-group">
                                    <label className="fw-500">Event title</label>
                                    <input className="form-control bdc-grey-200"
                                           id="eventAddTitle"
                                           value={this.state.title}
                                           onChange={e => this.handleChange('title', e)}/>
                                </div>
                                <div className="row">
                                    <div className="col-md-12">
                                        <label className="fw-500">Date</label>
                                        <div className="timepicker-input input-icon form-group">
                                            <div className="input-group">
                                                <div className="input-group-addon bgc-white bd bdwR-0">
                                                    <i className="ti-calendar"/>
                                                </div>
                                                <input type="text"
                                                       className="form-control bdc-grey-200 event-date"
                                                       placeholder="Datepicker"
                                                       data-provide="datepicker"
                                                       id="eventAddDate"
                                                       value={this.state.date}
                                                       onChange={e => this.handleChange('date', e)}/>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label className="fw-500">Event Description</label>
                                    <textarea id="eventAddDescription"
                                              className="form-control bdc-grey-200"
                                              rows='5'
                                              value={this.state.description}
                                              onChange={e => this.handleChange('description', e)}/>
                                </div>
                                <div className="text-right">
                                    <button className="btn btn-primary cur-p" data-dismiss="modal">Done</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

EventAdd.propTypes = {
    isActive: PropTypes.bool,
    onModalClose: PropTypes.func,
    onModalOpen: PropTypes.func
}

EventAdd.defaultProps = {
    isActive: false,
    onModalClose: () => {},
    onModalOpen: () => {}
}