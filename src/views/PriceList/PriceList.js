import React from 'react'
import { connect } from 'react-redux'
import { setPrices } from '../../redux/actions/index'
import { csvToJson } from '../../lib/csv'
import { PriceTable } from '../../components/PriceTable/PriceTable'
import PerfectScrollbar from 'perfect-scrollbar'
import './PriceList.scss'
import {Unavailable} from '../../components/Unavailable/Unavailable'

const IMPORT_PRICES = "Import Prices"
const IMPORT_PRICES_DESCRIPTION = "You need to import stock prices from JSON or CSV file."

const unavailableProps = {
    title: IMPORT_PRICES,
    description: IMPORT_PRICES_DESCRIPTION,
    isActive: true
}

export class PriceList extends React.Component {
    renderUnavailableComponent = () => {
        if (!this.props.prices || !this.props.prices.length) return <Unavailable {...unavailableProps}/>
        else return null
    }

    onFileChange = e => {
        const file = e.target.files[0]

        if (!file) return

        csvToJson(file)
            .then(json => {
                this.props.setPrices(json, this.props.stockKey)
            })
    }

    onAddClick = () => {
        this.refs.fileInput.click()
    }

    getPriceHeaders = () => {
        if (!this.props.prices) return []

        const firstPrice = this.props.prices[0]

        if (firstPrice) return Object.keys(firstPrice)
        else return []
    }

    componentDidMount() {
        new PerfectScrollbar(this.refs.scrollable)
    }

    render () {
        return (
            <div className="bdrs-3 ov-h bgc-white h-100p bd">
                <div className="bgc-deep-purple-500 ta-c p-30">
                    <h1 className="fw-300 mB-5 lh-1 c-white">01<span className="fsz-def">st</span></h1>
                    <h3 className="c-white">Price List</h3>
                </div>
                <div className="m-0 p-0 pos-r price-list-price-table-wrap">
                    {
                        this.renderUnavailableComponent()
                    }
                    <input type="file"
                           ref="fileInput"
                           id="price-list-file-input"
                           className="d-n"
                           accept=".csv"
                           onChange={this.onFileChange}/>

                    <button type="button"
                            className="mT-nv-50 pos-a r-10 zi-2 t-25 btn cur-p bdrs-50p p-0 w-3r h-3r btn-warning"
                            onClick={this.onAddClick}>
                        <i className="ti-plus"/>
                    </button>

                    <div className="p-20 pos-r" ref="scrollable" id="price-list-price-table">
                        <PriceTable headers={this.getPriceHeaders()} rows={this.props.prices}/>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    const stockKey = state.stocks.activeStock.key

    return {
        prices: state.prices[stockKey],
        stockKey: stockKey
    }
}

const actionCreators = {
    setPrices
}

export default connect(mapStateToProps, actionCreators)(PriceList)
