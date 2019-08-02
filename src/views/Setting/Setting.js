import React from 'react'
import { connect } from 'react-redux'
import { Dialog } from '../../components/Dialog/Dialog'
import { hideSetting } from '../../redux/actions'
import {
  setDateColumn,
  setOperationColumn,
  setT0T1,
  setT1E,
  setET2,
  setT2T3,
  setDefaultEventDateFormat
} from '../../redux/actions'
import FormInput from '../../components/FormInput/FormInput'
import {
  validateTimelineKey,
  validateColumnName
} from 'event-study'

const genFormValues = props => {
  const {
    dateColumn = '',
    operationColumn = '',
    T0T1 = '',
    T1E = '',
    ET2 = '',
    T2T3 = '',
    defaultEventDateFormat = ''
  } = props

  return {
    dateColumn,
    operationColumn,
    T0T1,
    T1E,
    ET2,
    T2T3,
    defaultEventDateFormat
  }
}

const genState = props => {
  const {
    invalidFeedBacks = {
      dateColumn: '',
      operationColumn: '',
      T0T1: '',
      T1E: '',
      ET2: '',
      T2T3: '',
      defaultEventDateFormat: ''
    }
  } = props

  return {
    invalidFeedBacks
  }
}

export class Setting extends React.Component {
  state = genState(this.props)
  formValues = genFormValues(this.props)

  DialogHeader = () => {
    return (
      <h5 className="m-0 dialog-title">Setting</h5>
    )
  }

  DialogBody = () => {
    return (
      <form>
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
            inputLabel={ 'Default Event Date Format (In create event dialog)' }
            inputValue={ this.formValues.defaultEventDateFormat }
            invalidFeedback={ this.state.invalidFeedBacks.defaultEventDateFormat }
            onChange={ event => this.handleChange('defaultEventDateFormat', event) }/>
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
            inputLabel={ 'Pre-announcement window  (T1E)' }
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
    )
  }

  DialogFooter = () => {
    return (
      <div className="d-ib">
        <button type="button" className="btn" data-dismiss="modal">Close</button>
        <button className="btn btn-primary cur-p" onClick={this.onAccept}>Done</button>
      </div>
    )
  }

  handleChange = (type, event) => {
    this.formValues[type] = event.target.value
  }

  onAccept = () => {
    // validate
    const isDateColumnInvalid = validateColumnName(this.formValues.dateColumn) || ''
    const isOperationColumnInvalid = validateColumnName(this.formValues.operationColumn) || ''
    const isT0T1Invalid = validateTimelineKey(this.formValues.T0T1) || ''
    const isT1EInvalid = validateTimelineKey(this.formValues.T1E) || ''
    const isET2Invalid = validateTimelineKey(this.formValues.ET2) || ''
    const isT2T3Invalid = validateTimelineKey(this.formValues.T2T3) || ''
    const isDefaultEventDateFormatInvalid = validateColumnName(this.formValues.defaultEventDateFormat) || ''

    // if has error
    if (isDateColumnInvalid ||
        isOperationColumnInvalid ||
        isT0T1Invalid ||
        isT1EInvalid ||
        isET2Invalid ||
        isT2T3Invalid ||
        isDefaultEventDateFormatInvalid) {
      // set error
      this.setState({
        invalidFeedBacks: {
          dateColumn: isDateColumnInvalid.toString(),
          operationColumn: isOperationColumnInvalid.toString(),
          T0T1: isT0T1Invalid.toString(),
          T1E: isT1EInvalid.toString(),
          ET2: isET2Invalid.toString(),
          T2T3: isT2T3Invalid.toString(),
          defaultEventDateFormat: isDefaultEventDateFormatInvalid.toString()
        }
      })
      return
    }

    this.props.setDateColumn(this.formValues.dateColumn)
    this.props.setOperationColumn(this.formValues.operationColumn)
    this.props.setT0T1(this.formValues.T0T1)
    this.props.setT1E(this.formValues.T1E)
    this.props.setET2(this.formValues.ET2)
    this.props.setT2T3(this.formValues.T2T3)
    this.props.setDefaultEventDateFormat(this.formValues.defaultEventDateFormat)

    this.props.hideSetting()
  }

  onModalClose = () => {
    this.setState(genState(this.props))
    this.props.hideSetting()
  }

  render () {
    return (
      <Dialog
        onModalClose={this.onModalClose}
        isActive={this.props.showSetting}
        header={<this.DialogHeader/>}
        body={<this.DialogBody/>}
        footer={<this.DialogFooter/>}/>
    )
  }
}

const mapStateToProps = state => {
  return {
    showSetting: state.application.showSetting,
    dateColumn: state.setting.dateColumn,
    operationColumn: state.setting.operationColumn,
    defaultEventDateFormat: state.setting.defaultEventDateFormat,
    T0T1: state.setting.T0T1,
    T1E: state.setting.T1E,
    ET2: state.setting.ET2,
    T2T3: state.setting.T2T3
  }
}

const actionCreator = {
  hideSetting,
  setDateColumn,
  setOperationColumn,
  setDefaultEventDateFormat,
  setT0T1,
  setT1E,
  setET2,
  setT2T3
}

export default connect(mapStateToProps, actionCreator)(Setting)
