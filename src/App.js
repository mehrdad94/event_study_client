import React from 'react'
import { EventList } from './views/EventList/EventList'
import { PriceList} from './views/PriceList/PriceList'

function App () {
  return (
      <div>
        <div className="page-container">
          <main className='main-content bgc-grey-100'>
            <div id='mainContent'>
              <div className="container-fluid">
                <div className="row">
                  <div className="col-md-4">
                    <EventList/>
                  </div>
                  <div className="col-md-8">
                    <PriceList/>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
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
