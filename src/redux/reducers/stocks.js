import {
    CREATE_STOCK,
    UPDATE_STOCK,
    DELETE_STOCK, SELECT_STOCK
} from '../ActionTypes'

const defaultState = {
    stockList: [],
    activeStock: {}
}

export default function stocks (state = defaultState, action) {
    switch (action.type) {
        case CREATE_STOCK:
            return {
                ...state,
                stockList: [action.stock, ...state.stockList],
                stocksKeyValue: { [action.stock.key]: action.stock, ...state.stocksKeyValue }
            }
        case UPDATE_STOCK:
            return {
                ...state,
                stockList: state.stockList.map(stock => stock.key === action.stock.key ? {...stock, ...action.stock} : stock)
            }
        case DELETE_STOCK:
            return {
                ...state,
                stockList: state.stockList.filter(stock => stock.key !== action.key),
                activeStock: state.activeStock.key === action.key ? {} : state.activeStock
            }
        case SELECT_STOCK:
            return {
                ...state,
                activeStock: action.stock
            }
        default:
            return state
    }
}
