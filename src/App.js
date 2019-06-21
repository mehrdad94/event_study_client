import React from 'react'
import { StocksList } from './views/StocksList/StocksList'
import { EventList } from './views/EventList/EventList'
import { PriceList} from './views/PriceList/PriceList'
import { Chart } from './views/Chart/Chart'
import './App.scss'
function App () {
  return (
      <div>
        <div className="page-container">
          <main className='main-content bgc-grey-100'>
            <div id='mainContent'>
              <div className="container-fluid">
                <StocksList/>
                <div className="stocks-list-wrapper">
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

export default App
