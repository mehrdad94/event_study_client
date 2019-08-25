import axios from 'axios'

const ALPHAVANTAGE_URL = 'https://www.alphavantage.co/query'

const getUrl = (symbol, interval, apiKey) => {
  switch (interval) {
    case '1min':
    case '5min':
    case '15min':
    case '30min':
    case '60min':
      return `${ALPHAVANTAGE_URL}?function=TIME_SERIES_INTRADAY&symbol=${symbol}&interval=${interval}&outputsize=full&apikey=${apiKey}`
    case 'Daily':
      return `${ALPHAVANTAGE_URL}?function=TIME_SERIES_DAILY_ADJUSTED&symbol=${symbol}&outputsize=full&apikey=${apiKey}`
    case 'Weekly':
      return `${ALPHAVANTAGE_URL}?function=TIME_SERIES_WEEKLY_ADJUSTED&symbol=${symbol}&outputsize=full&apikey=${apiKey}`
    case 'Monthly':
      return `${ALPHAVANTAGE_URL}?function=TIME_SERIES_MONTHLY_ADJUSTED&symbol=${symbol}&outputsize=full&apikey=${apiKey}`
    default:
      return ''
  }
}

const getStockData = (symbol, interval, apiKey) => {
  const url = getUrl(symbol, interval, apiKey)

  axios.post(url)
}