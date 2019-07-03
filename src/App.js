import React from 'react'
import { connect } from 'react-redux'
import { isObjectEmpty } from './lib/helper'
import StocksList from './views/StocksList/StocksList'
import EventList from './views/EventList/EventList'
import PriceList from './views/PriceList/PriceList'
import Chart from './views/Chart/Chart'
import { Unavailable } from './components/Unavailable/Unavailable'
import './App.scss'

const CREATE_STOCK = "Create a Stock"
const CREATE_STOCK_DESCRIPTION = "First of all you need to create a stock name."
const unavailableProps = {
  title: CREATE_STOCK,
  description: CREATE_STOCK_DESCRIPTION,
  isActive: true
}

export class App extends React.Component {
  renderUnavailableComponent = () => {
    if (isObjectEmpty(this.props.activeStock)) return <Unavailable {...unavailableProps}/>
    else return null
  }

  render () {
    return (
      <div>
        <div className="page-container">
          <main className='main-content bgc-grey-100'>
            <div id='mainContent'>
              <div className="container-fluid">
                <StocksList/>

                <div className="stocks-list-wrapper pos-r">
                  {
                    this.renderUnavailableComponent()
                  }
                  <div className="row">
                    <div className="col-md-4">
                      <EventList/>
                    </div>
                    <div className="col-md-8">
                      <PriceList/>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12 pt-3">
                      <Chart/>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </main>

          <footer className="bdT ta-c p-30 lh-0 fsz-sm c-grey-600">
            <span>Copyright © 2019 All rights reserved.</span>
          </footer>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    stocks: state.stocks.stockList,
    activeStock: state.stocks.activeStock
  }
}

export default connect(mapStateToProps)(App)
