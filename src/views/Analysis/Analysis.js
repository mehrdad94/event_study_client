import './Analysis.scss'

import React from 'react'
import { connect } from 'react-redux'
import { createSelector } from 'reselect'
import PerfectScrollbar from 'perfect-scrollbar'
import groupBy from 'ramda/src/groupBy'
import prop from 'ramda/src/prop'
import mapObjIndexed from 'ramda/src/mapObjIndexed'
import map from 'ramda/src/map'

import {
  setActiveMainFrame
} from '../../redux/actions'

import { Unavailable } from '../../components/Unavailable/Unavailable'
import { isObjectEmpty, sequence } from '../../lib/helper'
import { AAR, CAR } from 'event-study'
import { LineChart } from '../../components/LineChart/LineChart'
import {COLORS} from "../../lib/colors";

const UNAVAILABLE_TITLE = "Analyse Events"
const UNAVAILABLE_DESCRIPTION = "You need to create and select at least One event in order to get analysis."

const UNAVAILABLE_ANALYSIS_TITLE = "No Analysis Available"
const UNAVAILABLE_ANALYSIS_DESCRIPTION = "If you want your final analysis hit analyse button"

const unavailableProps = {
    title: UNAVAILABLE_TITLE,
    description: UNAVAILABLE_DESCRIPTION,
    isActive: true
}

const unavailableAnalysisProps = {
  title: UNAVAILABLE_ANALYSIS_TITLE,
  description: UNAVAILABLE_ANALYSIS_DESCRIPTION,
  isActive: true
}

const getChartLabelBasedOnNewsType = type => {
  type = type.toString()

  if (type === '0') {
    return 'Neutral'
  } else if (type === '-1') {
    return 'Bad News'
  } else {
    return 'Good News'
  }
}

const getChartStyleBasedOnNewsType = type => {
  type = type.toString()

  if (type === '0') {
    return {
      backgroundColor: 'rgba(237, 231, 246, 0.5)',
      borderColor: COLORS['grey-500'],
      pointBackgroundColor: COLORS['grey-700'],
      borderWidth: 2,
    }
  } else if (type === '-1') {
    return {
      backgroundColor: 'rgba(237, 231, 246, 0.5)',
      borderColor: COLORS['red-500'],
      pointBackgroundColor: COLORS['red-700'],
      borderWidth: 2,
    }
  } else {
    return {
      backgroundColor: 'rgba(237, 231, 246, 0.5)',
      borderColor: COLORS['green-500'],
      pointBackgroundColor: COLORS['green-700'],
      borderWidth: 2,
    }
  }
}

export const lineChartLineStyle = type => {
  return {
    ...getChartStyleBasedOnNewsType(type),
    label: getChartLabelBasedOnNewsType(type)
  }
}

export const createLineChartDataSet = (data, type) => ({
  data,
  ...lineChartLineStyle(type)
})

export class Analysis extends React.Component {
    renderUnavailableComponent = () => {
        const hasNoActiveEvents = isObjectEmpty(this.props.activeEvents)
        const hasNoAnalysis = isObjectEmpty(this.props.analysis)

        if (hasNoActiveEvents) return <Unavailable {...unavailableProps}/>
        else if (!hasNoActiveEvents && hasNoAnalysis) return <Unavailable {...unavailableAnalysisProps}/>
        else return null
    }

    getChartData = () => {
        const result = {
          labels: [],
          dataSets: [],
          chartLegend: ''
        }

        if (!this.props.activeEvents) return result

        const events = this.props.activeEvents

        if (events.length > 1) {
            const analysis = events.map(event => this.props.analysis[event.key]).filter(item => item)

            if (analysis.length <= 1) return result

            const newsByType = groupBy(prop('newsType'), analysis)

            const newsAbnormalReturns = mapObjIndexed(map(prop('abnormalReturn')), newsByType)

            const averageAbnormalReturn = mapObjIndexed(AAR, newsAbnormalReturns)

            const cumulativeAbnormalReturn = mapObjIndexed(CAR, averageAbnormalReturn)

            const dataSets = mapObjIndexed((data, key) => {
              return createLineChartDataSet(data, key)
            }, cumulativeAbnormalReturn)

            result.labels = sequence(events[0].ET2 + events[0].T1E - 1).map(item => item - (events[0].T1E - 1))

            result.dataSets = Object.values(dataSets)

            result.chartLegend = 'CAAR Stats (Cumulative Average Abnormal Return):'
        } else if (events.length === 1) {
            const event = events[0]
            const analysis = this.props.analysis[event.key]

            if (!analysis) return result

            const labels = analysis.returnDates
            const dataSets = [analysis.CARS].map(data => createLineChartDataSet(data, analysis.newsType))

            result.labels = labels
            result.dataSets = dataSets
            result.chartLegend = 'CAR Stats for: ' + event.date
        }

        return result
    }

    componentDidMount() {
        new PerfectScrollbar(this.refs.scrollable)
    }

    onEventListClick = () => {
      this.props.setActiveMainFrame('EVENT_LIST')
    }

    render () {
        const chartsData = this.getChartData()

        return (
            <div className="bdrs-3 ov-h bgc-white h-100p bd">
                <div className="bgc-deep-purple-500 ta-c p-30">
                    <h3 className="c-white">Analysis</h3>
                </div>
                <div className="m-0 p-0 pos-r analysis-scroll-container-wrap">
                    {
                        this.renderUnavailableComponent()
                    }
                    <div className="d-ib pos-a r-10 t-25 zi-2 mT-nv-50">
                      <button type="button"
                              onClick={this.onEventListClick}
                              className="btn cur-p bdrs-50p p-0 w-3r h-3r btn-warning analysis-event-list-btn d-n@md+">
                        <i className="ti-agenda"/>
                      </button>
                    </div>

                    <div className="pos-r" ref="scrollable" id="analysis-scroll-container">
                       <div className="bd bgc-white">
                          <div className="layers">
                            <div className="layer w-100 pX-20 pT-20">
                              <h6 className="lh-1">{chartsData.chartLegend}</h6>
                            </div>
                            <div className="layer w-100 p-20">
                              <LineChart {...chartsData}/>
                            </div>
                         </div>
                      </div>
                    </div>
                </div>
            </div>
        )
    }
}


// selectors
const defaultEventList = []
const defaultAnalysisList = []
const defaultActiveEventsKeys = {}

const getStockKey = state => state.stocks.activeStock.key
const getEventList = state => state.events.events[state.stocks.activeStock.key] || defaultEventList
const getAnalysisList = state => state.analysis.analysis[state.stocks.activeStock.key] || defaultAnalysisList
const getActiveEventsKeys = state => state.events.activeEvents[state.stocks.activeStock.key] || defaultActiveEventsKeys

const getActiveEvents = createSelector([getEventList, getActiveEventsKeys], (eventList, eventKeys) => {
  return eventList.filter(e => eventKeys[e.key])
})

const mapStateToProps = state => {
    return {
        stockKey: getStockKey(state),
        eventList: getEventList(state),
        analysis: getAnalysisList(state),
        activeEvents: getActiveEvents(state)
    }
}

const actionCreators = {
  setActiveMainFrame
}

export default connect(mapStateToProps, actionCreators)(Analysis)
