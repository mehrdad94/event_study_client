import React from 'react'
import { connect } from 'react-redux'
import PerfectScrollbar from 'perfect-scrollbar'
import './PriceList.scss'
import { Unavailable } from '../../components/Unavailable/Unavailable'

import { MarketModel } from 'event-study'

const ANALYSE_PRICE = "Analyse Prices"
const ANALYSE_PRICE_DESCRIPTION = "You need to create at least One event in order to get analysis"

const unavailableProps = {
    title: ANALYSE_PRICE,
    description: ANALYSE_PRICE_DESCRIPTION,
    isActive: true
}

export class PriceList extends React.Component {
    state = {
        stats: {
            byEvents: {},
            cum: {}
        }
    }

    renderUnavailableComponent = () => {
        if (!this.props.prices || !this.props.prices.length) return <Unavailable {...unavailableProps}/>
        else return null
    }

    onAnalyseClick = () => {
        const events = Object.values(this.props.activeEvents)

        const calendar = events.map((event) => {
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

        console.log(MarketModel({
            calendar
        }))
    }

    componentDidMount() {
        new PerfectScrollbar(this.refs.scrollable)
    }

    render () {
        return (
            <div className="bdrs-3 ov-h bgc-white h-100p bd">
                <div className="bgc-deep-purple-500 ta-c p-30">
                    <h1 className="fw-300 mB-5 lh-1 c-white">01<span className="fsz-def">st</span></h1>
                    <h3 className="c-white">Analysis</h3>
                </div>
                <div className="m-0 p-0 pos-r price-list-price-table-wrap">
                    {
                        this.renderUnavailableComponent()
                    }
                    <button type="button"
                            onClick={this.onAnalyseClick}
                            className="mT-nv-50 pos-a r-10 zi-2 t-25 btn cur-p bdrs-50p p-0 w-3r h-3r btn-warning">
                        <i className="ti-stats-up"/>
                    </button>

                    <div className="p-20 pos-r" ref="scrollable" id="price-list-price-table">
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

export default connect(mapStateToProps, actionCreators)(PriceList)
