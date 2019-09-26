import React from 'react'
import $ from 'jquery'
import { connect } from 'react-redux'
import { downloadJsonText } from '../../lib/helper'
import { readAsText } from '../../lib/csv'
import { showSetting, showStockList, hideStockList } from '../../redux/actions'

const EXPORT_FILE_NAME = 'Event study state'

export class Header extends React.Component {
  static onExportClick () {
    const date = new Date()
    const currentYear = date.getFullYear()
    const currentMonth = date.getMonth()
    const currentDate = date.getDate()

    const fileName = `${EXPORT_FILE_NAME}-${currentYear}-${currentMonth}-${currentDate}`

    downloadJsonText(fileName, localStorage.getItem('persist:root'))
  }

  static onImportClick () {
    const importStateInput = document.getElementById('importStateInput')

    if (!importStateInput) return

    importStateInput.click()
  }

  onImportStateInputChange = e => {
    const file = e.target.files[0]

    if (!file) return

    readAsText(file).then(data => {
      localStorage.setItem('persist:root', data.target.result)
      window.location.reload()
    })
  }

  onStockListToggleClick = () => {
    if (this.props.stockListStatus) this.props.hideStockList()
    else this.props.showStockList()
  }

  componentDidMount () {
    $('.navbar [data-toggle="tooltip"]').tooltip()
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
            <li>
              <a href="#"
                 onClick={Header.onImportClick}
                 data-toggle="tooltip"
                 data-placement="bottom"
                 data-original-title="Load data">
                <i className="ti-folder"/>
              </a>

              <input type="file"
                     accept=".json"
                     onChange={this.onImportStateInputChange}
                     className="d-none"
                     id="importStateInput"/>
            </li>

            <li>
              <a href="#"
                 data-toggle="tooltip"
                 data-placement="bottom"
                 data-original-title="Save data"
                 onClick={Header.onExportClick}>
                <i className="ti-export"/>
              </a>
            </li>

            <li className="open-setting-btn"
                data-toggle="tooltip"
                data-placement="bottom"
                data-original-title="Setting"
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
