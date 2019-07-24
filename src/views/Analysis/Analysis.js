import React from 'react'
import { connect } from 'react-redux'
import PerfectScrollbar from 'perfect-scrollbar'
import './Analysis.scss'
import { Unavailable } from '../../components/Unavailable/Unavailable'
import { isObjectEmpty } from '../../lib/helper'
import { MarketModel } from 'event-study'
import { LineChart } from '../../components/LineChart/LineChart'

const ANALYSE_EVENTS = "Analyse Events"
const ANALYSE_EVENTS_DESCRIPTION = "You need to create and select at least One event in order to get analysis"

const unavailableProps = {
    title: ANALYSE_EVENTS,
    description: ANALYSE_EVENTS_DESCRIPTION,
    isActive: true
}

const getNewsType = type => {
  if (type === 0) {
    return ''
  } else if (type === 1) {
    return 'good'
  } else {
    return 'bad'
  }
}

const getIconCLass = type => {
  if (type === 'bad') {
    return 'fa fa-level-down c-red-500'
  } else if (type === 'good') {
    return 'fa fa-level-up c-green-500'
  } else {
    return 'fa fa-border c-green-500'
  }
}

const News = props => {
  const getContent = type => {
    if (type === 'bad') {
      return 'Bad News '
    } else if (type === 'good') {
      return 'Good News '
    } else {
      return 'No News'
    }
  }

  return (
    <div className="peer fw-600">
            <span className="fsz-def fw-600 mR-10 c-grey-800">
                {getContent(props.type)}
              <i className={getIconCLass(props.type)}/>
            </span>
      <small className="c-grey-500 fw-600">News Type</small>
    </div>
  )
}

const Significant = props => {
  const getContent = type => {
    if (type === 'good') {
      return 'Significant '
    } else {
      return 'Insignificant '
    }
  }

  return (
    <div className="peer fw-600">
            <span className="fsz-def fw-600 mR-10 c-grey-800">
                {getContent(props.type)}
              <i className={getIconCLass(props.type)}/>
            </span>
      <small className="c-grey-500 fw-600">Significant Test</small>
    </div>
  )
}

export class Analysis extends React.Component {
    state = {
        statsPerEvents: {}
    }

    renderUnavailableComponent = () => {
        if (isObjectEmpty(this.props.activeEvents)) return <Unavailable {...unavailableProps}/>
        else return null
    }

    onAnalyseClick = () => {
        const events = Object.values(this.props.activeEvents)

        const calendar = events.map(event => {
            const { date, T0T1, T1E, ET2, T2T3, market, stock, dateColumn, operationColumn } = event

            const timeline = { T0T1, T1E, ET2, T2T3 }

            return {
                date,
                stock,
                market,
                timeline,
                dateColumn,
                operationColumn
            }
        })

        const statsResult = MarketModel({ calendar })

        const result = statsResult.reduce((object, stats, index) => {
            object[events[index].key] = stats
            return object
        }, {})

        this.setState({
          statsPerEvents: {
              ...this.state.statsPerEvents,
              ...result
          }
        })
    }

    getChartData = () => {
        const events = this.props.activeEvents ? Object.values(this.props.activeEvents) : []

        const result = {
          labels: [],
          dataSets: [],
          newsType: null,
          significantTest: null
        }
        if (events.length > 1) {
        } else if (events.length === 1) {
            const event = events[0]
            const analysis = this.state.statsPerEvents[event.key]

            if (!analysis) return result

            const labels = analysis.returnDates
            const dataSets = [analysis.CARS]

            result.labels = labels
            result.dataSets = dataSets

            result.newsType = getNewsType(analysis.newsType)
            result.significantTest = analysis.significantTest[event.T1E - 1] ? 'good' : ''
        } else {

        }
        return result
    }

    componentDidMount() {
        new PerfectScrollbar(this.refs.scrollable)
    }

    render () {
        const chartsData = this.getChartData()

        return (
            <div className="bdrs-3 ov-h bgc-white h-100p bd">
                <div className="bgc-deep-purple-500 ta-c p-30">
                    <h1 className="fw-300 mB-5 lh-1 c-white">01<span className="fsz-def">st</span></h1>
                    <h3 className="c-white">Analysis</h3>
                </div>
                <div className="m-0 p-0 pos-r analysis-scroll-container-wrap">
                    {
                        this.renderUnavailableComponent()
                    }
                    <button type="button"
                            onClick={this.onAnalyseClick}
                            className="mT-nv-50 pos-a r-10 zi-2 t-25 btn cur-p bdrs-50p p-0 w-3r h-3r btn-warning">
                        <i className="ti-stats-up"/>
                    </button>

                    <div className="pos-r" ref="scrollable" id="analysis-scroll-container">
                       <div className="bd bgc-white">
                          <div className="layers">
                            <div className="layer w-100 pX-20 pT-20">
                              <h6 className="lh-1">CAR Stats</h6>
                            </div>
                            <div className="layer w-100 p-20">
                              <LineChart {...chartsData}/>
                            </div>

                            {/*<div className="layer bdT p-20 w-100">*/}
                            {/*  <div className="peers ai-c jc-c gapX-20">*/}
                            {/*    <Significant type={chartsData.significantTest}/>*/}
                            {/*    <News type={chartsData.newsType}/>*/}
                            {/*  </div>*/}
                            {/*</div>*/}
                         </div>
                      </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    const stockKey = state.stocks.activeStock.key

    return {
        stockKey,
        activeEvents: state.events.activeEvents[stockKey],
    }
}

const actionCreators = {}

export default connect(mapStateToProps, actionCreators)(Analysis)
