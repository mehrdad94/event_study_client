import {
    CREATE_STOCK,
    UPDATE_STOCK,
    DELETE_STOCK
} from '../ActionTypes'

export default function stocks (state = [], action) {
    switch (action.type) {
        case CREATE_STOCK:
            return [
                action.stock,
                ...state
            ]
        case UPDATE_STOCK:
            return state.map(stock => {
                if (stock.key !== action.stock.key) return stock
                else return {
                    ...stock,
                    ...action.stock.payload
                }
            })
        case DELETE_STOCK:
            return state.filter(stock => stock.key !== action.key)
        default:
            return state
    }
}
