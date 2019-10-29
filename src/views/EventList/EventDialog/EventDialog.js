import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import $ from 'jquery'
import is from 'ramda/src/is'
import moment from 'moment'
import EventDialogTour from './EventDialogTour/EventDialogTour'
import FormInput from '../../../components/FormInput/FormInput'
import FormSelect from '../../../components/FormSelect/FormSelect'
import FormPicker from '../../../components/FormDatepicker/FormDatepicker'
import FormFile from '../../../components/FormFile/FormFile'

import { csvToJson } from '../../../lib/csv'
import { getStockData } from '../../../lib/alphavantageApi'

import {
  validateTimelineKey,
  validateColumnName,
  validatePrices,
  MarketModel,
  MeanModel
} from 'event-study'

let jqueryModalRef
const toSelectInput = value => ({ label: value, value })
const timeFrames = ['1min', '5min', '15min', '30min', '60min', 'Daily', 'Weekly', 'Monthly'].map(toSelectInput)
const extractErrorFromResults = result => {
  if (typeof result === 'string') return result
  else return 'Invalid data'
}
const genState = props => {
  const {
    loading = false,
    showHelp = false,
    title = '',
    date = '',
    dates = [],
    stock = [],
    stockSymbol = '',
    stockTimeFrame = 'Daily',
    market = [],
    marketSymbol = '',
    marketTimeFrame = 'Daily',
    dateColumn = '',
    operationColumn = '',
    alphavantageToken = '',
    T0T1 = '',
    T1E = '',
    ET2 = '',
    T2T3 = '',
    defaultEventDateFormat = '',
    analysisModel = true, // true means Market Model
    useExternalSource = false,
    stockInputFileLabel = '', // stock name
    marketInputFileLabel = '', // market name
    invalidFeedBacks = {
      title: '',
      date: '',
      stockInputFileLabel: '',
      stockSymbol: '',
      stockTimeFrame: '',
      marketInputFileLabel: '',
      marketSymbol: '',
      marketTimeFrame: '',
      alphavantageToken: '',
      dateColumn: '',
      operationColumn: '',
      T0T1: '',
      T1E: '',
      ET2: '',
      T2T3: '',
      globalError: ''
    }
  } = props

  return {
    loading,
    showHelp,
    title,
    date,
    dates,
    stock,
    stockSymbol,
    stockTimeFrame,
    market,
    marketSymbol,
    marketTimeFrame,
    dateColumn,
    operationColumn,
    alphavantageToken,
    T0T1,
    T1E,
    ET2,
    T2T3,
    defaultEventDateFormat,
    analysisModel,
    useExternalSource,
    stockInputFileLabel,
    marketInputFileLabel,
    invalidFeedBacks
  }
}

export class EventDialog extends React.Component {
  state = genState(this.props)

  static showModal () {
    jqueryModalRef.modal({
      keyboard: false,
      backdrop: 'static',
      show: true
    })
  }

  static hideModal () {
    jqueryModalRef.modal('hide')
  }

  handleChange (type, event) {
    this.setState({
      [type]: event.target.value
    })
  }

  handleCheckboxChange = (type, event) => {
    this.setState({
      [type]: event.target.checked
    })
  }
  onDeleteDate = index => {
    const dates = [...this.state.dates]

    dates.splice(index, 1)

    this.setState({
      dates
    })
  }

  onDateChange = event => {
    this.setState({
      date: event.target.value
    })

    this.addDate()
  }
  analysisCheckBoxClass = (checked) => {
    return checked ? 'col-sm-5' : 'col-sm-10'
  }
  onFileChange = (labelType, infoType, e) => {
    const file = e.target.files[0]

    if (!file) return

    csvToJson(file)
      .then(json => {
        this.setState({
          [infoType]: json,
          [labelType]: file.name
        })
      })
  }

  addDate = () => {
    if (!this.state.date) return
    const parsedDate = moment(this.state.date, this.state.defaultEventDateFormat.toUpperCase(), true)

    if (!parsedDate.isValid()) return

    // find duplicate
    const duplicateIndex = this.state.dates.findIndex(d => d === this.state.date)
    if (duplicateIndex !== -1) return;

    const newDates = [...this.state.dates]

    newDates.push(this.state.date)

    this.setState({
      dates: newDates
    })
  }

  renderChips = () => {
    return this.state.dates.map((date, index) => (
      <div className="chip" key={index}>
        <span>{date}</span>

        <span className="chip-close-btn" onClick={() => { this.onDeleteDate(index) } }>&times;</span>
      </div>
    ))
  }

  validateSharedInputs = () => {
    const isValidDate = validateColumnName(this.state.date) || ''
    const isDateColumnInvalid = validateColumnName(this.state.dateColumn) || ''
    const isOperationColumnInvalid = validateColumnName(this.state.operationColumn) || ''
    const isT0T1Invalid = validateTimelineKey(this.state.T0T1) || ''
    const isT1EInvalid = validateTimelineKey(this.state.T1E) || ''
    const isET2Invalid = validateTimelineKey(this.state.ET2) || ''
    const isT2T3Invalid = validateTimelineKey(this.state.T2T3) || ''

    return [
      ['date', isValidDate],
      ['dateColumn', isDateColumnInvalid],
      ['operationColumn', isOperationColumnInvalid],
      ['T0T1', isT0T1Invalid],
      ['T1E', isT1EInvalid],
      ['ET2', isET2Invalid],
      ['T2T3', isT2T3Invalid]
    ].filter(item => item[1])
  }

  validateMarketModelSources = () => {
    const isStockPriceInvalid = validatePrices(this.state.stock, this.state.dateColumn, this.state.operationColumn) || ''
    const isMarketPriceInvalid = validatePrices(this.state.market, this.state.dateColumn, this.state.operationColumn) || ''

    return [
      ['stock', isStockPriceInvalid],
      ['market', isMarketPriceInvalid]
    ].filter(item => item[1])
  }

  validateMeanModelSources = () => {
    const isStockPriceInvalid = validatePrices(this.state.stock, this.state.dateColumn, this.state.operationColumn) || ''

    return [
      ['stock', isStockPriceInvalid]
    ].filter(item => item[1])
  }

  validateMarketModelExternalSourceInputs = () => {
    const isStockSymbolValid = validateColumnName(this.state.stockSymbol) || ''
    const isStockTimeFrameValid = validateColumnName(this.state.stockTimeFrame) || ''
    const isMarketSymbolValid = validateColumnName(this.state.marketSymbol) || ''
    const isMarketTimeFrameValid = validateColumnName(this.state.marketTimeFrame) || ''
    const isAlphavantageTokenValid = validateColumnName(this.state.alphavantageToken) || ''

    return [
      ['stockSymbol', isStockSymbolValid],
      ['stockTimeFrame', isStockTimeFrameValid],
      ['alphavantageToken', isAlphavantageTokenValid],
      ['marketSymbol', isMarketSymbolValid],
      ['marketTimeFrame', isMarketTimeFrameValid]
    ].filter(item => item[1])
  }

  validateMeanModelExternalSourceInputs = () => {
    const isStockSymbolValid = validateColumnName(this.state.stockSymbol) || ''
    const isStockTimeFrameValid = validateColumnName(this.state.stockTimeFrame) || ''
    const isAlphavantageTokenValid = validateColumnName(this.state.alphavantageToken) || ''

    return [
      ['stockSymbol', isStockSymbolValid],
      ['stockTimeFrame', isStockTimeFrameValid],
      ['alphavantageToken', isAlphavantageTokenValid]
    ].filter(item => item[1])
  }

  validateAll = () => {
    const areSharedInputsValid = this.validateSharedInputs()

    let areInputsValid

    if (this.state.analysisModel) {
      if (this.state.useExternalSource) {
        areInputsValid = this.validateMarketModelExternalSourceInputs()
      } else {
        areInputsValid = this.validateMarketModelSources()
      }
    } else {
      if (this.state.useExternalSource) {
        areInputsValid = this.validateMeanModelExternalSourceInputs()
      } else {
        areInputsValid = this.validateMeanModelSources()
      }
    }

    const addError = (invalidFeedBacks, feedback) => {
      invalidFeedBacks[feedback[0]] = feedback[1].toString()
      return invalidFeedBacks
    }

    if (areSharedInputsValid.length || areInputsValid.length) {
      return areInputsValid.reduce(addError, areSharedInputsValid.reduce(addError, {}))
    } else return null
  }

  getStockDataFromExternalResource = () => {
    return new Promise((resolve, reject) => {
      const {
        stockSymbol,
        stockTimeFrame,
        marketSymbol,
        marketTimeFrame,
        alphavantageToken
      } = this.state

      this.setState({ loading: true })

      const promises = [getStockData(stockSymbol, stockTimeFrame, alphavantageToken)]
      if (this.state.analysisModel) promises.push(getStockData(marketSymbol, marketTimeFrame, alphavantageToken))

      Promise.all(promises).then(result => {
        this.setState({
          stock: result[0],
          market: result[1] || [],
          loading: false
        })
        resolve()
      }).catch(reject)
    })
  }
  onAfterValidate = () => {
    const { date, dates, title = 'No Title', T0T1, T1E, ET2, T2T3, market, stock, dateColumn, operationColumn } = this.state

    if (!dates.length) dates.push(date)

    const timeline = { T0T1, T1E, ET2, T2T3 }

    let hasError = false
    // extract dates
    const statsResults = dates.map(date => {
      const calendar = [{
        date,
        stock,
        market,
        timeline,
        dateColumn,
        operationColumn
      }]

      const statsResult = this.state.analysisModel ? MarketModel({ calendar })[0] : MeanModel({ calendar })[0]

      if (!is(Object, statsResult) || statsResult['errors']) {
        this.setState({
          invalidFeedBacks: {
            globalError: extractErrorFromResults(statsResult)
          }
        })

        hasError = true
      }

      return statsResult
    })

    if (hasError) return

    const eventsData = dates.map(date => {
      return {
        date, title, T0T1, T1E, ET2, T2T3, dateColumn, operationColumn
      }
    })

    EventDialog.hideModal()

    this.props.onAccept({
      eventsData,
      statsResults
    })
  }
  onAccept = () => {
    const validationResult = this.validateAll()

    if (validationResult) {
      this.setState({
        invalidFeedBacks: validationResult
      })
      return
    }

    if (this.state.useExternalSource) {
      this.getStockDataFromExternalResource()
        .then(() => {
          const validationResult = this.validateAll()

          if (validationResult) {
            this.setState({
              invalidFeedBacks: validationResult,
              loading: false
            })
            return
          }

          this.onAfterValidate()
        })
        .catch(error => {
          if (typeof error === 'object') {
            error = JSON.stringify(error)
          }

          this.setState({
            loading: false,
            invalidFeedBacks: {
              globalError: error
            }
          })
        })
    } else {
      this.onAfterValidate()
    }
  }

  onHelpClick = () => {
    this.setState({
      showHelp: true
    })
  }

  onTourCloseClick = () => {
    this.setState({
      showHelp: false
    })
  }

  componentDidMount () {
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
        this.setState(genState(Object.assign({}, this.props, nextProps.event)))
      } else {
        this.setState(genState({}))
        const stockId = document.getElementById('eventDialogStockPriceInput')
        const marketId = document.getElementById('eventDialogMarketPriceInput')

        if (stockId) stockId.value = ''
        if (marketId) marketId.value = ''
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
            <div className="bd p-15 modal-header">
              <h5 className="m-0 dialog-title">
                <a href="#" className="icon-button pl-0 pos-r t-2" onClick={this.onHelpClick}>
                  <i className="ti-help-alt"/>
                </a>

                {this.props.dialogTitle}
              </h5>

              <button type="button" className="close float-right" data-dismiss="modal" aria-label="Close" disabled={this.state.loading}>
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <EventDialogTour isOpen={this.state.showHelp} onRequestClose={this.onTourCloseClick}/>
              {
                this.state.invalidFeedBacks.globalError ? (<div className="alert alert-danger" role="alert">{this.state.invalidFeedBacks.globalError}!</div>) : null
              }

              <form>
                <div className="form-group event-dialog-title-input">
                  <FormInput
                    inputLabel={ 'Event title' }
                    inputValue={ this.state.title }
                    invalidFeedback={ this.state.invalidFeedBacks.title }
                    onChange={ event => this.handleChange('title', event) }/>
                </div>

                <div className="row">
                  <div className="col-md-12 event-dialog-date-input">
                    <FormPicker pickerLabel={ 'Dates' }
                                defaultEventDateFormat={this.state.defaultEventDateFormat}
                                pickerValue={ this.state.date }
                                invalidFeedback={ this.state.invalidFeedBacks.date }
                                onChange={ event => this.onDateChange(event) }/>
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-12">
                    <div className="form-group">
                      {
                        this.renderChips()
                      }
                    </div>
                  </div>
                </div>

                <div className="form-group event-dialog-external-resource-checkbox">
                  <div className="custom-control custom-checkbox">
                    <input type="checkbox"
                           className="custom-control-input"
                           id="toggleUseExternalResource"
                           checked={ this.state.useExternalSource }
                           onChange={ event => this.handleCheckboxChange('useExternalSource', event) }/>
                    <label className="custom-control-label" htmlFor="toggleUseExternalResource">Use external resources</label>
                  </div>
                </div>

                <div className="form-row">
                  {
                    this.state.useExternalSource ? (
                      <Fragment>
                        <div className="col-sm-2">
                          <div className="custom-control custom-checkbox">
                            <input type="checkbox"
                                   className="custom-control-input"
                                   id="toggleMarketModel"
                                   checked={ this.state.analysisModel }
                                   onChange={ e => this.handleCheckboxChange('analysisModel', e) }/>
                            <label className="custom-control-label" htmlFor="toggleMarketModel">MM</label>
                          </div>
                        </div>

                        <div className={"form-group " + this.analysisCheckBoxClass(this.state.analysisModel)}>
                          <div>
                            <FormInput
                              inputLabel={ 'Stock Symbol' }
                              inputValue={ this.state.stockSymbol }
                              invalidFeedback={ this.state.invalidFeedBacks.stockSymbol }
                              onChange={ event => this.handleChange('stockSymbol', event) }/>

                            <div className="form-group"/>

                            <FormSelect
                              selectLabel={ 'Stock Time Frame' }
                              selectValue={ this.state.stockTimeFrame }
                              selectOptions={ timeFrames }
                              invalidFeedback={ this.state.invalidFeedBacks.stockTimeFrame }
                              onChange={ event => this.handleChange('stockTimeFrame', event) }/>
                          </div>
                        </div>

                        {
                          this.state.analysisModel ? (
                            <div className="form-group col-sm-5">
                              <FormInput
                                inputLabel={ 'Market Symbol' }
                                inputValue={ this.state.marketSymbol }
                                invalidFeedback={ this.state.invalidFeedBacks.marketSymbol }
                                onChange={ event => this.handleChange('marketSymbol', event) }/>

                              <div className="form-group"/>

                              <FormSelect
                                selectLabel={ 'Market Time Frame' }
                                selectValue={ this.state.marketTimeFrame }
                                selectOptions={ timeFrames }
                                invalidFeedback={ this.state.invalidFeedBacks.marketTimeFrame }
                                onChange={ event => this.handleChange('marketTimeFrame', event) }/>
                            </div>
                          ) : null
                        }
                      </Fragment>
                    ) : (
                      <Fragment>
                        <div className="col-sm-2">
                          <div className="custom-control custom-checkbox mt-2 event-dialog-analysis-model-checkbox">
                            <input type="checkbox"
                                   className="custom-control-input"
                                   id="toggleMarketModel"
                                   checked={ this.state.analysisModel }
                                   onChange={ e => this.handleCheckboxChange('analysisModel', e) }/>
                            <label className="custom-control-label" htmlFor="toggleMarketModel">MM</label>
                          </div>
                        </div>

                        <div className={"form-group " + this.analysisCheckBoxClass(this.state.analysisModel)}>
                          <FormFile accept={ '.csv' }
                                    identifier={ 'eventDialogStockPriceInput' }
                                    inputLabel={ this.state.stockInputFileLabel || 'Stock prices' }
                                    invalidFeedback={ this.state.invalidFeedBacks.stock }
                                    onChange={e => this.onFileChange('stockInputFileLabel', 'stock', e)}/>
                        </div>

                        {
                          this.state.analysisModel ? (
                            <div className="form-group col-sm-5">
                              <FormFile accept={ '.csv' }
                                        identifier={ 'eventDialogMarketPriceInput' }
                                        inputLabel={ this.state.marketInputFileLabel || 'Market prices' }
                                        invalidFeedback={ this.state.invalidFeedBacks.market }
                                        onChange={e => this.onFileChange('marketInputFileLabel', 'market', e)}/>
                            </div>
                          ) : null
                        }
                      </Fragment>
                    )
                  }
                </div>

                {
                  this.state.useExternalSource ? (
                    <div className="form-group event-dialog-alphavantage-token-input">
                      <FormInput
                        inputLabel={ 'Alphavantage Token: <a href="https://www.alphavantage.co/support/#api-key" target="_blank">get your token</a>' }
                        inputValue={ this.state.alphavantageToken }
                        invalidFeedback={ this.state.invalidFeedBacks.alphavantageToken }
                        onChange={ event => this.handleChange('alphavantageToken', event) }/>
                    </div>
                  ) : null
                }

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
                    inputLabel={ 'Estimation period (T0T1)' }
                    inputValue={ this.state.T0T1 }
                    invalidFeedback={ this.state.invalidFeedBacks.T0T1 }
                    onChange={ event => this.handleChange('T0T1', event) }/>
                </div>

                <div className="form-group">
                  <FormInput
                    inputLabel={ 'Pre-announcement window (T1E)' }
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
            </div>
            <div className="text-right modal-footer">
              <button type="button" className="btn" data-dismiss="modal" disabled={this.state.loading}>Close</button>

              <button className="btn btn-primary"
                      type="button"
                      onClick={this.onAccept}
                      disabled={this.state.loading}>
                { this.state.loading ? (
                  <Fragment>
                    <span className="spinner-border spinner-border-sm mr-2" role="status" aria-hidden="true"/>
                    downloading, might take a while...
                  </Fragment>
                ) : (
                  <span>Done</span>
                ) }
              </button>
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
    alphavantageToken: state.setting.alphavantageToken,
    defaultEventDateFormat: state.setting.defaultEventDateFormat,
    T0T1: state.setting.T0T1,
    T1E: state.setting.T1E,
    ET2: state.setting.ET2,
    T2T3: state.setting.T2T3
  }
}

export default connect(mapStateToProps)(EventDialog)
