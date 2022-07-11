import React from 'react'
import { connect } from 'react-redux'
import PerfectScrollbar from 'perfect-scrollbar'
import { isObjectEmpty } from './lib/helper'
import StocksList from './views/StocksList/StocksList'
import EventList from './views/EventList/EventList'
import Analysis from './views/Analysis/Analysis'
import Header from './views/Header/Header'
import AppTour from './views/AppTour/AppTour'
import { Unavailable } from './components/Unavailable/Unavailable'
import Setting from './views/Setting/Setting'
import '../node_modules/bootstrap/dist/css/bootstrap.css'
import './App.css'

const CREATE_CATEGORY = "Create a Category"
const CREATE_CATEGORY_DESCRIPTION = "First of all you need to create a category."

const unavailableProps = {
  title: CREATE_CATEGORY,
  description: CREATE_CATEGORY_DESCRIPTION,
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

  hideNoneActiveFrame = frame => this.props.activeMainFrame === frame ? '' : 'd-n@md-'

  showStockList = () => this.props.stockListStatus ? '' : 'close-stocks'

  render () {
    return (
      <div className={"h-100p " + (this.showStockList())}>
        <div className="page-container h-100p">
          <AppTour/>
          <Setting/>
          <Header/>
          <main className='main-content bgc-grey-200'>
            <div id='mainContent' className="h-100p">
              <div className="container-fluid h-100p pos-r" ref="scrollable">
                <StocksList/>

                <div className="main-wrapper pos-r h-100p">
                  {
                    this.renderUnavailableComponent()
                  }
                  <div className="row h-100p">
                    <div className={"col-lg-4 col-md-12 h-100p " + this.hideNoneActiveFrame('EVENT_LIST')} >
                      <EventList/>
                    </div>
                    <div className={"col-lg-8 col-md-12 h-100p " + this.hideNoneActiveFrame('ANALYSIS')} >
                      <Analysis/>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </main>

          <footer className="bdT ta-c p-30 lh-0 fsz-sm c-grey-600">
            <span>Report any issue to: <a href="mailto:m_javidi@outlook.com">m_javidi@outlook.com</a>.</span>
          </footer>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    stocks: state.stocks.stockList,
    activeStock: state.stocks.activeStock,
    stockListStatus: state.application.stockListStatus,
    activeMainFrame: state.application.activeMainFrame
  }
}

export default connect(mapStateToProps)(App)
