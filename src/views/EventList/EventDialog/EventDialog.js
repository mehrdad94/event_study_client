import React from 'react'
import PropTypes from 'prop-types'
import $ from 'jquery'
import { csvToJson } from '../../../lib/csv'

let jqueryModalRef
let datePicker

const genState = props => {
    const {
        title = '',
        defaultEventDateFormat = '',
        date = '',
        description = '',
        stock = {},
        market = {},
        dateColumn = '',
        operationColumn = '',
        T0T1 = '',
        T1E = '',
        ET2 = '',
        T2T3 = ''
    } = props

    return {
        title,
        date,
        defaultEventDateFormat,
        description,
        stock,
        market,
        dateColumn,
        operationColumn,
        T0T1,
        T1E,
        ET2,
        T2T3
    }
}

export class EventDialog extends React.Component {
    constructor(props) {
        super(props);
        this.state = genState(props)
    }

    static showModal () {
        jqueryModalRef.modal('show')
    }

    static hideModal () {
        jqueryModalRef.modal('hide')
    }

    handleChange (type, event) {
        this.setState({ [type]: event.target.value})
    }

    onFileChange = (type, e) => {
        const file = e.target.files[0]

        if (!file) return

        csvToJson(file)
          .then(json => {
              this.setState({
                  [type]: json
              })
          })
    }
    onAccept = () => {
        EventDialog.hideModal()
        this.props.onAccept(Object.assign({}, this.state))
    }
    onDialogClose = () => {
        document.getElementById('eventDialogStockPriceInput').value = ''
        document.getElementById('eventDialogMarketPriceInput').value = ''
    }
    onDialogOpen = () => {
        this.setState(genState(this.props))
    }
    onDatepickerChange = e => {
        this.handleChange('date', e)
    }
    componentDidMount (){
        jqueryModalRef = $(this.refs.modal)

        jqueryModalRef.on('hidden.bs.modal', e => {
            this.onDialogClose()
            this.props.onModalClose(e)
        })

        jqueryModalRef.on('shown.bs.modal', e => {
            this.onDialogOpen()
            this.props.onModalOpen(e)
        })

        if (this.props.isActive) EventDialog.showModal()

        datePicker = $('.event-date').datepicker({ format: this.state.defaultEventDateFormat }).on('changeDate', this.onDatepickerChange)
    }

    componentDidUpdate (prevProps) {
        if (this.props.isActive !== prevProps.isActive) {
            this.props.isActive ? EventDialog.showModal() : EventDialog.hideModal()
        }
        if (this.props.defaultEventDateFormat !== prevProps.defaultEventDateFormat) {
            datePicker.datepicker('destroy').datepicker({ format: this.props.defaultEventDateFormat }).on('changeDate', this.onDatepickerChange)
        }
    }

    render() {
        return (
            <div className="modal fade" ref='modal'>
                <div className="modal-dialog" id="event-dialog-modal" role="document">
                    <div className="modal-content">
                        <div className="bd p-15">
                            <h5 className="m-0 dialog-title">{this.props.dialogTitle}</h5>
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
                                    <label className="fw-500"
                                           htmlFor="eventDialogStockPriceInput">Stock prices</label>
                                    <input type="file"
                                           accept=".csv"
                                           onClick={(e) => { e.target.value = null }}
                                           onChange={(e) => this.onFileChange('stock', e)}
                                           className="form-control-file bdc-grey-200"
                                           id="eventDialogStockPriceInput"/>
                                </div>

                                <div className="form-group">
                                    <label className="fw-500"
                                           htmlFor="eventDialogMarketPriceInput">Market prices</label>
                                    <input type="file"
                                           accept=".csv"
                                           onClick={(e) => { e.target.value = null }}
                                           onChange={(e) => this.onFileChange('market', e)}
                                           className="form-control-file bdc-grey-200"
                                           id="eventDialogMarketPriceInput"/>
                                </div>

                                <div className="form-group">
                                    <label className="fw-500">Date Column</label>
                                    <input className="form-control bdc-grey-200"
                                           id="eventAddDateColumn"
                                           value={this.state.dateColumn}
                                           onChange={e => this.handleChange('dateColumn', e)}/>
                                </div>
                                <div className="form-group">
                                    <label className="fw-500">Operation Column</label>
                                    <input className="form-control bdc-grey-200"
                                           id="eventAddOperationColumn"
                                           value={this.state.operationColumn}
                                           onChange={e => this.handleChange('operationColumn', e)}/>
                                </div>
                                <div className="form-group">
                                    <label className="fw-500">Pre event window (T0T1)</label>
                                    <input className="form-control bdc-grey-200"
                                           id="eventAddT0T1"
                                           value={this.state.T0T1}
                                           onChange={e => this.handleChange('T0T1', e)}/>
                                </div>
                                <div className="form-group">
                                    <label className="fw-500">End of pre event window till event date (T1E)</label>
                                    <input className="form-control bdc-grey-200"
                                           id="eventAddT1E"
                                           value={this.state.T1E}
                                           onChange={e => this.handleChange('T1E', e)}/>
                                </div>
                                <div className="form-group">
                                    <label className="fw-500">Event date till post event window (ET2)</label>
                                    <input className="form-control bdc-grey-200"
                                           id="eventAddET2"
                                           value={this.state.ET2}
                                           onChange={e => this.handleChange('ET2', e)}/>
                                </div>
                                <div className="form-group">
                                    <label className="fw-500">Post event window (T2T3)</label>
                                    <input className="form-control bdc-grey-200"
                                           id="eventAddT2T3"
                                           value={this.state.T2T3}
                                           onChange={e => this.handleChange('T2T3', e)}/>
                                </div>
                            </form>
                        </div>
                        <div className="text-right modal-footer">
                            <button type="button" className="btn" data-dismiss="modal">Close</button>
                            <button className="btn btn-primary cur-p" onClick={this.onAccept}>Done</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

EventDialog.propTypes = {
    isActive: PropTypes.bool,
    onModalClose: PropTypes.func,
    onModalOpen: PropTypes.func,
    onAccept: PropTypes.func,
    dialogTitle: PropTypes.string,
    title: PropTypes.string,
    date: PropTypes.string,
    defaultEventDateFormat: PropTypes.string
}

EventDialog.defaultProps = {
    isActive: false,
    onModalClose: () => {},
    onModalOpen: () => {},
    onAccept: () => {},
    dialogTitle: '',
    title: '',
    date: ''
}
