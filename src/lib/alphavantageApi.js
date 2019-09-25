import axios from 'axios'

const ALPHAVANTAGE_URL = 'https://www.alphavantage.co/query'
const outputSize = 'full' // compact, full

const getUrl = (symbol, interval, apiKey) => {
  switch (interval) {
    case '1min':
    case '5min':
    case '15min':
    case '30min':
    case '60min':
      return `${ALPHAVANTAGE_URL}?function=TIME_SERIES_INTRADAY&symbol=${symbol}&interval=${interval}&outputsize=${outputSize}&apikey=${apiKey}`
    case 'Daily':
      return `${ALPHAVANTAGE_URL}?function=TIME_SERIES_DAILY_ADJUSTED&symbol=${symbol}&outputsize=${outputSize}&apikey=${apiKey}`
    case 'Weekly':
      return `${ALPHAVANTAGE_URL}?function=TIME_SERIES_WEEKLY_ADJUSTED&symbol=${symbol}&outputsize=${outputSize}&apikey=${apiKey}`
    case 'Monthly':
      return `${ALPHAVANTAGE_URL}?function=TIME_SERIES_MONTHLY_ADJUSTED&symbol=${symbol}&outputsize=${outputSize}&apikey=${apiKey}`
    default:
      return ''
  }
}

const getPriceLabel = interval => {
  switch (interval) {
    case '1min':
      return 'Time Series (1min)'
    case '5min':
      return 'Time Series (5min)'
    case '15min':
      return 'Time Series (15min)'
    case '30min':
      return 'Time Series (30min)'
    case '60min':
      return 'Time Series (60min)'
    case 'Daily':
      return 'Time Series (Daily)'
    case 'Weekly':
      return 'Weekly Adjusted Time Series'
    case 'Monthly':
      return 'Monthly Adjusted Time Series'
    default:
      throw new Error('unknown interval')
  }
}

// store last ten requests
const requests = []

const saveRequest = (url, data) => {
  requests.push([url, data])

  if (requests.length === 10) {
    requests.shift()
  }
}

const hasRequest = url => requests.find(item => item[0] === url)

const extractRealData = data => data['data']

const getErrorMessage = data => data['Error Message']

const toProperFormat = data => {
  const days = Object.keys(data).sort(function (a, b) {
    return Date.parse(a) - Date.parse(b)
  })

  return days.map(day => {
    return {
      Date: day,
      Open: data[day]['1. open'],
      High: data[day]['2. high'],
      Low: data[day]['3. low'],
      Close: data[day]['4. close'],
      'Adj Close': data[day]['5. adjusted close']
    }
  })
}

export const getStockData  = (symbol, interval, apiKey) => {
  const url = getUrl(symbol, interval, apiKey)

  return new Promise((resolve, reject) => {
    const hadSameUrlRequest = hasRequest(url)

    // dont request if the request is already in memory
    if (hadSameUrlRequest) {
      resolve(hadSameUrlRequest[1])
      return
    }

    axios.get(url).then(data => {
      const pureData = extractRealData(data)
      const error = getErrorMessage(pureData)

      if (error) reject(error)
      else {
        const result = toProperFormat(pureData[getPriceLabel(interval)])
        // save request for future use
        saveRequest(url, result)
        resolve(result)
      }
    }).catch(reject)
  })
}
