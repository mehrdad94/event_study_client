import React from 'react'
import { connect } from 'react-redux'
import { downloadJsonText } from '../../lib/helper'
import store from '../../redux/store'
import { showSetting } from '../../redux/actions'

const EXPORT_FILE_NAME = 'event study state'

export class Header extends React.Component {
  static onExportClick () {
    downloadJsonText(EXPORT_FILE_NAME, JSON.stringify(store.getState()))
  }

  showSetting = () => {
    this.props.showSetting()
  }

  render () {
    return (
      <div className="header navbar">
        <div className="header-container">
          <ul className="nav-left">

          </ul>
          <ul className="nav-right">
            <li>
              <a href="#" onClick={Header.onExportClick}>
                <i className="ti-export"/>
              </a>
            </li>
            <li>
              <a href="#">
                <i className="ti-folder"/>
              </a>
            </li>
            <li>
              <a href="#" onClick={this.showSetting}>
                <i className="ti-settings"/>
              </a>
            </li>
          </ul>
        </div>
      </div>
    )
  }
}

const actionCreators = {
  showSetting
}

export default connect(null, actionCreators)(Header)
