import React from 'react'
import { csvToJson } from '../../lib/csv'
import { PriceTable } from '../../components/PriceTable/PriceTable'
import PerfectScrollbar from 'perfect-scrollbar'
import './PriceList.scss'

let fileInput

export class PriceList extends React.Component {
    state = {
        prices: []
    }

    onFileChange = e => {
        const file = e.target.files[0]

        if (!file) return

        csvToJson(file)
            .then(json => {
                this.setState({
                    prices: json
                })
            })
    }

    onAddClick = () => {
        fileInput.click()
    }

    getPriceHeaders = () => {
        const firstPrice = this.state.prices[0]

        if (firstPrice) return Object.keys(firstPrice)
        else return []
    }

    componentDidMount() {
        fileInput = document.getElementById('price-list-file-input')
        new PerfectScrollbar(this.refs.scrollable)
    }

    render () {
        return (
            <div className="bdrs-3 ov-h bgc-white bd">
                <div className="bgc-deep-purple-500 ta-c p-30">
                    <h1 className="fw-300 mB-5 lh-1 c-white">01<span className="fsz-def">st</span></h1>
                    <h3 className="c-white">Price List</h3>
                </div>
                <div className="m-0 p-0 mT-20 pos-r">
                    <input type="file"
                           id="price-list-file-input"
                           className="d-n"
                           accept=".csv"
                           onChange={this.onFileChange}/>

                    <button type="button"
                            className="mT-nv-50 pos-a r-10 t-2 btn cur-p bdrs-50p p-0 w-3r h-3r btn-warning"
                            onClick={this.onAddClick}>
                        <i className="ti-plus"/>
                    </button>

                    <div className="p-20 pos-r" ref="scrollable" id="price-list-price-table">
                        <PriceTable headers={this.getPriceHeaders()} rows={this.state.prices}/>
                    </div>
                </div>
            </div>
        )
    }
}
