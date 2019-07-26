import React from 'react'
import { connect } from 'react-redux'
import { Dialog } from '../../components/Dialog/Dialog'
import { hideSetting } from '../../redux/actions'
import { setDateColumn, setOperationColumn, setT0T1, setT1E, setET2, setT2T3, setDefaultEventDateFormat } from '../../redux/actions'

const genState = props => {
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
          <label className="fw-500">Date Column</label>
          <input className="form-control bdc-grey-200"
                 id="settingDateColumn"
                 value={this.state.dateColumn}
                 onChange={e => this.handleChange('dateColumn', e)}/>
        </div>
        <div className="form-group">
          <label className="fw-500">Operation Column</label>
          <input className="form-control bdc-grey-200"
                 id="settingOperationColumn"
                 value={this.state.operationColumn}
                 onChange={e => this.handleChange('operationColumn', e)}/>
        </div>
        <div className="form-group">
          <label className="fw-500">Default Event Date Format (In create event dialog)</label>
          <input className="form-control bdc-grey-200"
                 id="settingDefaultEventDate"
                 value={this.state.defaultEventDateFormat}
                 onChange={e => this.handleChange('defaultEventDateFormat', e)}/>
        </div>
        <div className="form-group">
          <label className="fw-500">Estimation period (T0T1)</label>
          <input className="form-control bdc-grey-200"
                 id="settingT0T1"
                 value={this.state.T0T1}
                 onChange={e => this.handleChange('T0T1', e)}/>
        </div>
        <div className="form-group">
          <label className="fw-500">Pre-announcement window  (T1E)</label>
          <input className="form-control bdc-grey-200"
                 id="settingT1E"
                 value={this.state.T1E}
                 onChange={e => this.handleChange('T1E', e)}/>
        </div>
        <div className="form-group">
          <label className="fw-500">Post-announcement window (ET2)</label>
          <input className="form-control bdc-grey-200"
                 id="settingET2"
                 value={this.state.ET2}
                 onChange={e => this.handleChange('ET2', e)}/>
        </div>
        <div className="form-group">
          <label className="fw-500">Post event period (T2T3)</label>
          <input className="form-control bdc-grey-200"
                 id="settingT2T3"
                 value={this.state.T2T3}
                 onChange={e => this.handleChange('T2T3', e)}/>
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
    this.setState({ [type]: event.target.value})
  }

  onAccept = () => {
    this.props.setDateColumn(this.state.dateColumn)
    this.props.setOperationColumn(this.state.operationColumn)
    this.props.setT0T1(this.state.T0T1)
    this.props.setT1E(this.state.T1E)
    this.props.setET2(this.state.ET2)
    this.props.setT2T3(this.state.T2T3)
    this.props.setDefaultEventDateFormat(this.state.defaultEventDateFormat)
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
