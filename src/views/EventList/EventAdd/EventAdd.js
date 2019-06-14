import React from 'react'
import $ from 'jquery'

export class EventAdd extends React.Component {
    showModal () {
        $(this.refs.modal).modal('show')
    }
    hideModal () {
        $(this.refs.modal).modal('hide')
    }
    componentDidMount(){
        if (this.props.isActive) this.showModal()
    }
    componentDidUpdate(prevProps) {
        if (this.props.isActive !== prevProps.isActive) {
            this.props.isActive ? this.showModal() : this.hideModal()
        }
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
                                    <input className="form-control bdc-grey-200"/>
                                </div>
                                <div className="row">
                                    <div className="col-md-6">
                                        <label className="fw-500">Start</label>
                                        <div className="timepicker-input input-icon form-group">
                                            <div className="input-group">
                                                <div className="input-group-addon bgc-white bd bdwR-0">
                                                    <i className="ti-calendar"/>
                                                </div>
                                                <input type="text" className="form-control bdc-grey-200 start-date"
                                                       placeholder="Datepicker" data-provide="datepicker"/>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <label className="fw-500">End</label>
                                        <div className="timepicker-input input-icon form-group">
                                            <div className="input-group">
                                                <div className="input-group-addon bgc-white bd bdwR-0">
                                                    <i className="ti-calendar"/>
                                                </div>
                                                <input type="text" className="form-control bdc-grey-200 end-date"
                                                       placeholder="Datepicker" data-provide="datepicker"/>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label className="fw-500">Event title</label>
                                    <textarea className="form-control bdc-grey-200" rows='5'/>
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
