import React from 'react'
import { App } from './App'
import enzyme from './lib/enzyme'
import 'bootstrap'
import 'bootstrap-datepicker/dist/js/bootstrap-datepicker.min.js'

it('renders without crashing', () => {
  enzyme.shallow(<App/>)
});
