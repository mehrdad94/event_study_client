import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import $ from 'jquery'
import FormInput from '../../../components/FormInput/FormInput'
import FormPicker from '../../../components/FormDatepicker/FormDatepicker'
import FormFile from '../../../components/FormFile/FormFile'

import { csvToJson } from '../../../lib/csv'
import {
    validateTimelineKey,
    validateColumnName,
    validatePrices
} from 'event-study'

let jqueryModalRef

const genFormValues = props => {
    const {
        title = '',
        date = '',
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

const genState = props => {
    const {
        defaultEventDateFormat = '',
        invalidFeedBacks = {
            title: '',
            date: '',
            stock: '',
            market: '',
            dateColumn: '',
            operationColumn: '',
            T0T1: '',
            T1E: '',
            ET2: '',
            T2T3: ''
        }
    } = props

    return {
        defaultEventDateFormat,
        invalidFeedBacks
    }
}

export class EventDialog extends React.Component {
    state = genState(this.props)
    formValues = genFormValues(this.props)

    static showModal () {
        jqueryModalRef.modal('show')
    }

    static hideModal () {
        jqueryModalRef.modal('hide')
    }

    handleChange (type, event) {
        this.formValues[type] = event.target.value
    }

    onFileChange = (type, e) => {
        const file = e.target.files[0]

        if (!file) return

        csvToJson(file)
          .then(json => {
              this.formValues[type] = json
          })
    }

    onAccept = () => {
        // validate
        const isTitleInvalid = validateColumnName(this.formValues.title) || ''
        const isValidDate = validateColumnName(this.formValues.date) || ''
        const isDateColumnInvalid = validateColumnName(this.formValues.dateColumn) || ''
        const isOperationColumnInvalid = validateColumnName(this.formValues.operationColumn) || ''
        const isT0T1Invalid = validateTimelineKey(this.formValues.T0T1) || ''
        const isT1EInvalid = validateTimelineKey(this.formValues.T1E) || ''
        const isET2Invalid = validateTimelineKey(this.formValues.ET2) || ''
        const isT2T3Invalid = validateTimelineKey(this.formValues.T2T3) || ''
        const isStockPriceInvalid = validatePrices(this.formValues.stock, this.formValues.dateColumn, this.formValues.operationColumn) || ''
        const isMarketPriceInvalid = validatePrices(this.formValues.market, this.formValues.dateColumn, this.formValues.operationColumn) || ''

        if (isTitleInvalid ||
            isValidDate ||
            isDateColumnInvalid ||
            isOperationColumnInvalid ||
            isT0T1Invalid ||
            isT1EInvalid ||
            isET2Invalid ||
            isT2T3Invalid ||
            isStockPriceInvalid ||
            isMarketPriceInvalid) {
            this.setState({
                invalidFeedBacks: {
                    title: isTitleInvalid.toString(),
                    date: isValidDate.toString(),
                    stock: isStockPriceInvalid.toString(),
                    market: isMarketPriceInvalid.toString(),
                    dateColumn: isDateColumnInvalid.toString(),
                    operationColumn: isOperationColumnInvalid.toString(),
                    T0T1: isT0T1Invalid.toString(),
                    T1E: isT1EInvalid.toString(),
                    ET2: isET2Invalid.toString(),
                    T2T3: isT2T3Invalid.toString()
                }
            })
            return
        }

        EventDialog.hideModal()

        this.props.onAccept(Object.assign({}, this.formValues))
    }

    componentDidMount (){
        jqueryModalRef = $(this.refs.modal)

        jqueryModalRef.on('hidden.bs.modal', e => {
            this.props.onModalClose(e)
        })

        jqueryModalRef.on('shown.bs.modal', e => {
            this.props.onModalOpen(e)
        })

        if (this.props.isActive) EventDialog.showModal()
    }

    componentWillUpdate (nextProps) {
        if (this.props.isActive !== nextProps.isActive) {
            if (nextProps.isActive) {
                this.formValues = genFormValues(Object.assign({}, this.props, nextProps.event))
            } else {
                this.formValues = genFormValues({})
                this.setState(genState({}))
            }
        }
    }

    componentDidUpdate (prevProps) {
        if (this.props.isActive !== prevProps.isActive) {
            this.props.isActive ? EventDialog.showModal() : EventDialog.hideModal()
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
                                    <FormInput
                                      inputLabel={ 'Event title' }
                                      inputValue={ this.formValues.title }
                                      invalidFeedback={ this.state.invalidFeedBacks.title }
                                      onChange={ event => this.handleChange('title', event) }/>
                                </div>

                                <div className="row">
                                    <div className="col-md-12">
                                        <FormPicker pickerLabel={ 'Date' }
                                                    pickerValue={ this.formValues.date }
                                                    invalidFeedback={ this.state.invalidFeedBacks.date }
                                                    onChange={ event => this.handleChange('date', event) }/>
                                    </div>
                                </div>

                                <div className="form-group">
                                    <FormFile accept={ '.csv' }
                                              identifier={ 'eventDialogStockPriceInput' }
                                              inputLabel={ 'Stock prices' }
                                              invalidFeedback={ this.state.invalidFeedBacks.stock }
                                              onChange={e => this.onFileChange('stock', e)}/>
                                </div>

                                <div className="form-group">
                                    <FormFile accept={ '.csv' }
                                              identifier={ 'eventDialogMarketPriceInput' }
                                              inputLabel={ 'Market prices' }
                                              invalidFeedback={ this.state.invalidFeedBacks.market }
                                              onChange={e => this.onFileChange('market', e)}/>
                                </div>

                                <div className="form-group">
                                    <FormInput
                                      inputLabel={ 'Date Column' }
                                      inputValue={ this.formValues.dateColumn }
                                      invalidFeedback={ this.state.invalidFeedBacks.dateColumn }
                                      onChange={ event => this.handleChange('dateColumn', event) }/>
                                </div>

                                <div className="form-group">
                                    <FormInput
                                      inputLabel={ 'Operation Column' }
                                      inputValue={ this.formValues.operationColumn }
                                      invalidFeedback={ this.state.invalidFeedBacks.operationColumn }
                                      onChange={ event => this.handleChange('operationColumn', event) }/>
                                </div>

                                <div className="form-group">
                                    <FormInput
                                      inputLabel={ 'Estimation period (T0T1)' }
                                      inputValue={ this.formValues.T0T1 }
                                      invalidFeedback={ this.state.invalidFeedBacks.T0T1 }
                                      onChange={ event => this.handleChange('T0T1', event) }/>
                                </div>

                                <div className="form-group">
                                    <FormInput
                                      inputLabel={ 'Pre-announcement window (T1E)' }
                                      inputValue={ this.formValues.T1E }
                                      invalidFeedback={ this.state.invalidFeedBacks.T1E }
                                      onChange={ event => this.handleChange('T1E', event) }/>
                                </div>

                                <div className="form-group">
                                    <FormInput
                                      inputLabel={ 'Post-announcement window (ET2)' }
                                      inputValue={ this.formValues.ET2 }
                                      invalidFeedback={ this.state.invalidFeedBacks.ET2 }
                                      onChange={ event => this.handleChange('ET2', event) }/>
                                </div>

                                <div className="form-group">
                                    <FormInput
                                      inputLabel={ 'Post event period (T2T3)' }
                                      inputValue={ this.formValues.T2T3 }
                                      invalidFeedback={ this.state.invalidFeedBacks.T2T3 }
                                      onChange={ event => this.handleChange('T2T3', event) }/>
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
    defaultEventDateFormat: PropTypes.string,
    event: PropTypes.object,
    setting: PropTypes.object
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

const mapStateToProps = state => {
    return {
        dateColumn: state.setting.dateColumn,
        operationColumn: state.setting.operationColumn,
        defaultEventDateFormat: state.setting.defaultEventDateFormat,
        T0T1: state.setting.T0T1,
        T1E: state.setting.T1E,
        ET2: state.setting.ET2,
        T2T3: state.setting.T2T3
    }
}

export default connect(mapStateToProps)(EventDialog)
