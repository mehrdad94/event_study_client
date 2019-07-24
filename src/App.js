import React from 'react'
import { connect } from 'react-redux'
import PerfectScrollbar from 'perfect-scrollbar'
import { isObjectEmpty } from './lib/helper'
import StocksList from './views/StocksList/StocksList'
import EventList from './views/EventList/EventList'
import PriceList from './views/PriceList/PriceList'
import Header from './views/Header/Header'
// import Chart from './views/Chart/Chart'
import { Unavailable } from './components/Unavailable/Unavailable'
import Setting from './views/Setting/Setting'
import './App.scss'

const CREATE_STOCK = "Create a Stock"
const CREATE_STOCK_DESCRIPTION = "First of all you need to create a stock name."
const unavailableProps = {
  title: CREATE_STOCK,
  description: CREATE_STOCK_DESCRIPTION,
  isActive: true,
  zIndex: 9
}

export class App extends React.Component {
  renderUnavailableComponent = () => {
    if (isObjectEmpty(this.props.activeStock)) return <Unavailable {...unavailableProps}/>
    else return null
  }

  componentDidMount() {
    new PerfectScrollbar(this.refs.scrollable)
  }

  render () {
    return (
      <div className="h-100p">
        <div className="page-container h-100p">
          <Setting/>
          <Header/>
          <main className='main-content bgc-grey-200'>
            <div id='mainContent' className="h-100p">
              <div className="container-fluid h-100p pos-r" ref="scrollable">
                <StocksList/>

                <div className="stocks-list-wrapper pos-r h-100p">
                  {
                    this.renderUnavailableComponent()
                  }
                  <div className="row h-100p">
                    <div className="col-md-4 h-100p">
                      <EventList/>
                    </div>
                    <div className="col-md-8 h-100p">
                      <PriceList/>
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
