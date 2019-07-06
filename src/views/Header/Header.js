import React from 'react'
import { downloadJsonText } from '../../lib/helper'
import store from '../../redux/store'
const EXPORT_FILE_NAME = 'event study state'
export class Header extends React.Component {
  static onExportClick () {
    console.log(store)
    downloadJsonText(EXPORT_FILE_NAME, JSON.stringify(store.getState()))
  }


  render () {
    return (
      <div className="header navbar">
        <div className="header-container">
          <ul className="nav-left">
            <li>
              <a href="#">
                <i className="ti-folder"/>
              </a>
            </li>
            <li>
              <a href="#" onClick={Header.onExportClick}>
                <i className="ti-export"/>
              </a>
            </li>
          </ul>
        </div>
      </div>
    )
  }
}
