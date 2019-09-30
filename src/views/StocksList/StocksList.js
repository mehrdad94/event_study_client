import React from 'react'
import uuid from 'uuid/v4'
import { connect } from 'react-redux'
import { createStock, updateStock, deleteStock, selectStock } from '../../redux/actions/index'
import { StocksItem } from './StocksItem/StocksItem'
import { ConfirmModal } from '../../components/ConfirmDialog/ConfirmModal'
import './StocksList.scss'
import PerfectScrollbar from 'perfect-scrollbar'

let stockKeyToDelete
let stockKeyToEdit
const deleteStockQuestion = 'Do you want to delete that StocksItem?'

export class StocksList extends React.Component {
    state = {
        phase: 'add', // add or edit
        stockNameInputValue: '',
        showDeleteConfirmDialog: false
    }

    onInputChange = (value, type) => {
        this.setState({
            [type]: value
        })
    }

    onAddClick = () => {
        const key = uuid()
        const title = this.state.stockNameInputValue

        if (!title) return

        this.props.createStock({
            key,
            title
        })

        this.setState({
            stockNameInputValue: ''
        })
    }

    onEditClick = () => {
        const title = this.state.stockNameInputValue

        if (!title) return

        this.props.updateStock({
            key: stockKeyToEdit,
            title
        })

        this.setState({
            stockNameInputValue: '',
            phase: 'add',
        })
    }

    onItemEditClick = stock => {
        stockKeyToEdit = stock.key

        this.setState({
            phase: 'edit',
            stockNameInputValue: stock.title
        })

        this.refs.stockInput.focus()
    }

    onDeleteClick = (stockId) => {
        stockKeyToDelete = stockId

        this.setState({
            showDeleteConfirmDialog: true
        })
    }

    onDeleteConfirmClose = () => {
        this.setState({
            showDeleteConfirmDialog: false
        })
    }

    onDeleteConfirmAccept = () => {
        this.setState({
            showDeleteConfirmDialog: false
        })
        // delete analysis, delete events
        this.props.deleteStock(stockKeyToDelete)
    }

    onKeyDown = event => {
        if (event.key === 'Enter') {
            if (this.state.phase === 'add') {
                this.onAddClick()
            } else {
                this.onEditClick()
            }
        }
    }

    renderStocksList = () => {
        return this.props.stocks.map(stock => (
          <StocksItem {...stock}
                      onDeleteClick={() => this.onDeleteClick(stock.key)}
                      onEditClick={() => this.onItemEditClick(stock)}
                      onItemClick={() => this.props.selectStock(stock)}
                      isActive={stock.key === this.props.activeStock.key}
                      key={stock.key}/>
        ))
    }
    componentDidMount() {
        new PerfectScrollbar(this.refs.scrollable)
        this.refs.stockInput.focus()
    }
    render () {
        return (
            <div className="peer stock-list h-100p">
                <div className="layers h-100">
                    <div className="bdB layer w-100 pos-r">
                        <input type="text"
                               placeholder="Category Name"
                               name="Name"
                               ref="stockInput"
                               value={this.state.stockNameInputValue}
                               onKeyDown={this.onKeyDown}
                               onChange={e => this.onInputChange(e.target.value, 'stockNameInputValue')}
                               className="form-constrol p-15 bdrs-0 w-100 bdw-0 category-name-input"/>

                        {
                            this.state.phase === 'add' ? (
                              <button type="button"
                                className="btn add btn-warning bdrs-50p w-2r p-0 h-2r pos-a r-10 t-10 category-add-btn"
                                onClick={this.onAddClick}>
                                  <i className="ti-plus"/>
                              </button>) :
                              (<button type="button"
                                      className="btn add btn-warning bdrs-50p w-2r p-0 h-2r pos-a r-10 t-10"
                                      onClick={this.onEditClick}>
                                  <i className="ti-pencil"/>
                              </button>)
                        }
                    </div>

                    <div className="layer w-100 fxg-1 scrollable pos-r" ref="scrollable">
                        { this.renderStocksList() }
                    </div>
                    <div>
                        <ConfirmModal isActive={this.state.showDeleteConfirmDialog}
                                      question={deleteStockQuestion}
                                      onModalClose={this.onDeleteConfirmClose}
                                      onAccept={this.onDeleteConfirmAccept}/>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        stocks: state.stocks.stockList,
        activeStock: state.stocks.activeStock
    }
}

const actionCreators = {
    createStock,
    updateStock,
    deleteStock,
    selectStock
}

export default connect(mapStateToProps, actionCreators)(StocksList);
