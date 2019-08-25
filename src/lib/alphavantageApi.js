import axios from 'axios'

const API_URL = process.env.REACT_APP_API_URL

export const requestMarketModel = data => axios.post(`${API_URL}/model/market`, data)
// export const requestStockData = (token, )