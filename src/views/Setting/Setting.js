import React, {Fragment} from 'react'
import { connect } from 'react-redux'
import { Dialog } from '../../components/Dialog/Dialog'
import FormSelect from '../../components/FormSelect/FormSelect'
import { ConfirmModal } from '../../components/ConfirmDialog/ConfirmModal'

import {
  setDateColumn,
  setOperationColumn,
  setAlphavantageToken,
  setAdjustmentRule,
  setT0T1,
  setT1E,
  setET2,
  setT2T3,
  setDefaultEventDateFormat,
  resetSettingDefaults,
  showSetting,
  hideSetting
} from '../../redux/actions'
import FormInput from '../../components/FormInput/FormInput'
import {
  validateTimelineKey,
  validateColumnName
} from 'event-study'

import { adjustmentRules, resetSettingQuestion } from '../../configs/constants'

const genState = props => {
  const {
    dateColumn = '',
    operationColumn = '',
    alphavantageToken = '',
    adjustmentRule = '',
    T0T1 = '',
    T1E = '',
    ET2 = '',
    T2T3 = '',
    defaultEventDateFormat = '',
    showResetConfirmDialog = false,
    invalidFeedBacks = {
      dateColumn: '',
      operationColumn: '',
      adjustmentRule: '',
      T0T1: '',
      T1E: '',
      ET2: '',
      T2T3: '',
      defaultEventDateFormat: ''
    }
  } = props

  return {
    dateColumn,
    operationColumn,
    alphavantageToken,
    adjustmentRule,
    T0T1,
    T1E,
    ET2,
    T2T3,
    defaultEventDateFormat,
    showResetConfirmDialog,
    invalidFeedBacks
  }
}

export class Setting extends React.Component {
  state = genState(this.props)

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
              inputValue={ this.state.dateColumn }
              invalidFeedback={ this.state.invalidFeedBacks.dateColumn }
              onChange={ event => this.handleChange('dateColumn', event) }/>
        </div>

        <div className="form-group">
          <FormInput
            inputLabel={ 'Operation Column' }
            inputValue={ this.state.operationColumn }
            invalidFeedback={ this.state.invalidFeedBacks.operationColumn }
            onChange={ event => this.handleChange('operationColumn', event) }/>
        </div>

        <div className="form-group">
          <FormInput
            inputLabel={ 'Alphavantage Token' }
            inputValue={ this.state.alphavantageToken }
            invalidFeedback={ this.state.invalidFeedBacks.alphavantageToken }
            onChange={ event => this.handleChange('alphavantageToken', event) }/>
        </div>

        <div className="form-group">
          <FormInput
            inputLabel={ 'Default Event Date Format (In create event dialog)' }
            inputValue={ this.state.defaultEventDateFormat }
            invalidFeedback={ this.state.invalidFeedBacks.defaultEventDateFormat }
            onChange={ event => this.handleChange('defaultEventDateFormat', event) }/>
        </div>

        <div className="form-group">
          <FormSelect
            selectLabel={ 'Adjustment Rule for Non-Trading Days' }
            selectValue={ this.state.adjustmentRule }
            invalidFeedback={ this.state.invalidFeedBacks.adjustmentRule }
            selectOptions={ adjustmentRules }
            onChange={ event => this.handleChange('adjustmentRule', event) }/>
        </div>

        <div className="form-group">
          <FormInput
            inputLabel={ 'Estimation period (T0T1)' }
            inputValue={ this.state.T0T1 }
            invalidFeedback={ this.state.invalidFeedBacks.T0T1 }
            onChange={ event => this.handleChange('T0T1', event) }/>
        </div>

        <div className="form-group">
          <FormInput
            inputLabel={ 'Pre-announcement window  (T1E)' }
            inputValue={ this.state.T1E }
            invalidFeedback={ this.state.invalidFeedBacks.T1E }
            onChange={ event => this.handleChange('T1E', event) }/>
        </div>

        <div className="form-group">
          <FormInput
            inputLabel={ 'Post-announcement window (ET2)' }
            inputValue={ this.state.ET2 }
            invalidFeedback={ this.state.invalidFeedBacks.ET2 }
            onChange={ event => this.handleChange('ET2', event) }/>
        </div>

        <div className="form-group">
          <FormInput
            inputLabel={ 'Post event period (T2T3)' }
            inputValue={ this.state.T2T3 }
            invalidFeedback={ this.state.invalidFeedBacks.T2T3 }
            onChange={ event => this.handleChange('T2T3', event) }/>
        </div>
      </form>
    )
  }

  DialogFooter = () => {
    return (
      <div className="w-100">
        <button className="btn btn-outline-danger cur-p float-left"
                data-dismiss="modal"
                onClick={this.onReset}>Reset Settings</button>

        <button type="button" className="btn mr-1" data-dismiss="modal">Close</button>
        <button className="btn btn-primary cur-p ml-1" onClick={this.onAccept}>Done</button>
      </div>
    )
  }

  handleChange = (type, event) => {
    this.setState({
      [type]: event.target.value
    })
  }

  onAccept = () => {
    // validate
    const isDateColumnInvalid = validateColumnName(this.state.dateColumn) || ''
    const isOperationColumnInvalid = validateColumnName(this.state.operationColumn) || ''
    const isAdjustmentRuleValid = validateColumnName(this.state.adjustmentRule) || ''
    const isT0T1Invalid = validateTimelineKey(this.state.T0T1) || ''
    const isT1EInvalid = validateTimelineKey(this.state.T1E) || ''
    const isET2Invalid = validateTimelineKey(this.state.ET2) || ''
    const isT2T3Invalid = validateTimelineKey(this.state.T2T3) || ''
    const isDefaultEventDateFormatInvalid = validateColumnName(this.state.defaultEventDateFormat) || ''

    // if has error
    if (isDateColumnInvalid ||
        isOperationColumnInvalid ||
        isAdjustmentRuleValid ||
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
          adjustmentRule: isAdjustmentRuleValid.toString(),
          T0T1: isT0T1Invalid.toString(),
          T1E: isT1EInvalid.toString(),
          ET2: isET2Invalid.toString(),
          T2T3: isT2T3Invalid.toString(),
          defaultEventDateFormat: isDefaultEventDateFormatInvalid.toString()
        }
      })
      return
    }

    this.props.setDateColumn(this.state.dateColumn)
    this.props.setOperationColumn(this.state.operationColumn)
    this.props.setAlphavantageToken(this.state.alphavantageToken)
    this.props.setAdjustmentRule(this.state.adjustmentRule)
    this.props.setT0T1(+this.state.T0T1)
    this.props.setT1E(+this.state.T1E)
    this.props.setET2(+this.state.ET2)
    this.props.setT2T3(+this.state.T2T3)
    this.props.setDefaultEventDateFormat(this.state.defaultEventDateFormat)

    this.props.hideSetting()
  }

  onReset = () => {
    this.setState({
      showResetConfirmDialog: true
    })
  }

  onResetConfirmClose = () => {
    this.setState({
      showResetConfirmDialog: false
    })

    this.props.showSettingMethod()
  }

  onResetConfirmAccept = () => {
    this.setState({
      showResetConfirmDialog: false
    })

    this.props.resetSettingDefaults()

    this.props.showSettingMethod()
  }

  onModalClose = () => {
    this.props.hideSetting()
  }

  render () {
    return (
      <Fragment>
        <Dialog
          onModalClose={this.onModalClose}
          isActive={this.props.showSetting}
          header={<this.DialogHeader/>}
          body={<this.DialogBody/>}
          footer={<this.DialogFooter/>}/>

        <ConfirmModal isActive={this.state.showResetConfirmDialog}
                      question={resetSettingQuestion}
                      onModalClose={this.onResetConfirmClose}
                      onAccept={this.onResetConfirmAccept}/>
      </Fragment>
    )
  }
}

const mapStateToProps = state => {
  return {
    showSetting: state.application.showSetting,
    dateColumn: state.setting.dateColumn,
    alphavantageToken: state.setting.alphavantageToken,
    operationColumn: state.setting.operationColumn,
    defaultEventDateFormat: state.setting.defaultEventDateFormat,
    adjustmentRule: state.setting.adjustmentRule,
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
  setAlphavantageToken,
  setDefaultEventDateFormat,
  setAdjustmentRule,
  setT0T1,
  setT1E,
  setET2,
  setT2T3,
  resetSettingDefaults,
  showSettingMethod: showSetting
}

export default connect(mapStateToProps, actionCreator)(Setting)
