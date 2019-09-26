import 'popper.js'
import 'bootstrap'
import 'bootstrap-datepicker/dist/js/bootstrap-datepicker.min.js'
import 'bootstrap-datepicker/dist/css/bootstrap-datepicker.min.css'

import React from 'react'
import ReactDOM from 'react-dom'
import { PersistGate } from 'redux-persist/integration/react'
import { Provider } from 'react-redux'
import { store, persistor } from './redux/store'
import { Loader } from './components/Loader/Loader'
import App from './App'
import * as serviceWorker from './serviceWorker'
import './styles/index.scss'

const ActiveLoader = () => <Loader active={true}/>

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={<ActiveLoader/>} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>
  , document.getElementById('root'))

serviceWorker.register()
