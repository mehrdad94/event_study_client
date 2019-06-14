import React from 'react'
import { EventList } from './views/EventList/EventList'

const items = [
  {
    title: 'All Day Event',
    description: 'Website Development',
    date: 'Nov 01'
  }
]

function App () {
  return (
      <div>
        <div className="page-container">
          <main className='main-content bgc-grey-100'>
            <div id='mainContent'>
              <div className="container-fluid">
                <div className="row">
                  <div className="col-md-4">
                    <div className="bdrs-3 ov-h bgc-white bd">
                      <div className="bgc-deep-purple-500 ta-c p-30">
                        <h1 className="fw-300 mB-5 lh-1 c-white">01<span className="fsz-def">st</span></h1>
                        <h3 className="c-white">Event List</h3>
                      </div>
                      <div className="pos-r">
                        <button type="button"
                                className="mT-nv-50 pos-a r-10 t-2 btn cur-p bdrs-50p p-0 w-3r h-3r btn-warning">
                          <i className="ti-plus"/>
                        </button>

                        <EventList items={items}/>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-8">
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
