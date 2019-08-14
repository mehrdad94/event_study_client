import React from 'react'
import { connect } from 'react-redux'
import { downloadJsonText } from '../../lib/helper'
import store from '../../redux/store'
import { showSetting, showStockList, hideStockList } from '../../redux/actions'

const EXPORT_FILE_NAME = 'event study state'

export class Header extends React.Component {
  static onExportClick () {
    downloadJsonText(EXPORT_FILE_NAME, JSON.stringify(store.getState()))
  }

  onStockListToggleClick = () => {
    if (this.props.stockListStatus) this.props.hideStockList()
    else this.props.showStockList()
  }

  render () {
    return (
      <div className="header navbar">
        <div className="header-container">
          <ul className="nav-left">
            <li className="stock-list-toggle d-lg-none"
                onClick={this.onStockListToggleClick}>
              <a href="#">
                <i className="ti-menu-alt"/>
              </a>
            </li>
          </ul>
          <ul className="nav-right">
            {/*<li>*/}
            {/*  <a href="#" onClick={Header.onExportClick}>*/}
            {/*    <i className="ti-export"/>*/}
            {/*  </a>*/}
            {/*</li>*/}
            {/*<li>*/}
            {/*  <a href="#">*/}
            {/*    <i className="ti-folder"/>*/}
            {/*  </a>*/}
            {/*</li>*/}
            <li className="open-setting-btn"
                onClick={this.props.showSetting}>
              <a href="#">
                <i className="ti-settings"/>
              </a>
            </li>
          </ul>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    stockListStatus: state.application.stockListStatus
  }
}

const actionCreators = {
  showSetting,
  showStockList,
  hideStockList
}

export default connect(mapStateToProps, actionCreators)(Header)
