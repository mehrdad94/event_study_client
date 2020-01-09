const toSelectInput = value => ({ label: value, value })

export const adjustmentRules = [{
  label: 'Take earlier trading day',
  value: 'PREV_TRADING_DAY'
}, {
  label: 'Take later trading day',
  value: 'NEXT_TRADING_DAY'
}, {
  label: 'Skip respective observations',
  value: 'SKIP'
}]

export const timeFrames = ['1min', '5min', '15min', '30min', '60min', 'Daily', 'Weekly', 'Monthly'].map(toSelectInput)

export const dateColumn = 'Date'
export const operationColumn = 'Close'
export const alphavantageToken = ''
export const adjustmentRule = 'NEXT_TRADING_DAY'
export const T0T1 = 40
export const T1E = 7
export const ET2 = 7
export const T2T3 = 5
export const defaultEventDateFormat = 'yyyy-mm-dd'

export const deleteStockQuestion = 'Do you want to delete that StocksItem?'
export const resetSettingQuestion = 'Your setting data will be replaced by default ones, do you agree?'
