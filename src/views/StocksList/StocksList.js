import React from 'react'
import uuid from 'uuid/v4'
import { connect } from 'react-redux'
import { createStock, deleteStock, selectStock } from '../../redux/actions/index'
import { Item } from '../../components/Item/Item'
import { ConfirmModal } from '../../components/ConfirmDialog/ConfirmModal'
import './StocksList.scss'

let stockKeyToDelete
const deleteStockQuestion = 'Do you want to delete that Item?'

export class StocksList extends React.Component {
    state = {
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

        this.props.createStock({
            key,
            title
        })

        this.setState({
            stockNameInputValue: ''
        })
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
        this.props.deleteStock(stockKeyToDelete)
    }

    renderStocksList = () => {
        return this.props.stocks.map(stock => (
          <Item {...stock}
                onDeleteClick={() => this.onDeleteClick(stock.key)}
                onItemClick={() => this.props.selectStock(stock)}
                key={stock.key}/>
        ))
    }

    render () {
        return (
            <div className="peer stocks-list h-100p">
                <div className="layers h-100">
                    <div className="bdB layer w-100 pos-r">
                        <input type="text"
                               placeholder="Stock Name"
                               name="Name"
                               ref="stock"
                               value={this.state.stockNameInputValue}
                               onChange={e => this.onInputChange(e.target.value, 'stockNameInputValue')}
                               className="form-constrol p-15 bdrs-0 w-100 bdw-0"/>
                        <button type="button"
                                className="btn add btn-warning bdrs-50p w-2r p-0 h-2r pos-a r-10 t-10"
                                onClick={this.onAddClick}>
                            <i className="ti-plus"/>
                        </button>
                    </div>

                    <div className="layer w-100 fxg-1 scrollable pos-r">
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
        stocks: state.stocks.stockList
    }
}

const actionCreators = {
    createStock,
    deleteStock,
    selectStock
}

export default connect(mapStateToProps, actionCreators)(StocksList);
