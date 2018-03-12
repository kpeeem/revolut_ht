// ------------------------------------
// Constants
// ------------------------------------
export const KEYBOARD_TOGGLE = 'KEYBOARD_TOGGLE'
export const FETCH_CURRENCIES = 'FETCH_CURRENCIES'
export const CHANGE_BALANCE = 'CHANGE_BALANCE'
export const CHANGE_FROM_INPUT = 'CHANGE_FROM_INPUT'

// const SERVER = 'https://openexchangerates.org/api/latest.json'
// const APP_ID = '8b49400fb00d454499c9e9e556a31d1c'
// const GET_API_STRING = (base = 'USD', currencies = [EUR]) =>
//  `${SERVER}?app_id=${APP_ID}&symbols=${currencies.join('%2C')}&base=${base}&prettyprint=false&show_alternative=false`

// const SERVER = 'http://apilayer.net/api/live'
// const APP_ID = 'f59bec56c1eba2badbb8152e207cd988'
// const GET_API_STRING = (base = 'USD', currencies = ['EUR']) =>
//  `${SERVER}?access_key=${APP_ID}&currencies=${currencies.join(',')}&source=${base}&format=1`

const SERVER = 'https://api.fixer.io/'
const GET_API_STRING = (base = 'EUR', currencies = ['EUR', 'USD', 'GBP', 'AUD', 'JPY', 'SEK', 'RUB']) =>
  `${SERVER}latest?base=${base}`

const initialState = {
  keyboardIsVisible: true,
  from: 0,
  base: 'EUR',
  rawRates: {
    EUR: 0,
    USD: 0,
    GBP: 0,
    AUD: 0,
    JPY: 0,
    SEK: 0,
    RUB: 0
  },
  rates: {
    EUR: {
      title: 'EUR',
      symbol: '€',
      balance: '10000.12'
    },
    USD: {
      title: 'USD',
      symbol: '$',
      balance: '3000.56'
    },
    GBP: {
      title: 'GBP',
      symbol: '£',
      balance: '2000.34'
    },
    AUD: {
      title: 'AUD',
      symbol: '$',
      balance: '4000.78'
    },
    JPY: {
      title: 'JPY',
      symbol: '¥',
      balance: '6000.12'
    },
    SEK: {
      title: 'SEK',
      symbol: 'kr',
      balance: '7000.34'
    },
    RUB: {
      title: 'RUB',
      symbol: '₽',
      balance: '8000.56'
    }
  }
}

const currenciesToLoad = Object.keys(initialState.rates) || ['EUR', 'USD', 'GBP', 'AUD', 'JPY', 'SEK', 'RUB']

// ------------------------------------
// Actions
// ------------------------------------

export const changeFromInput = (value, name) => (dispatch, getState) =>
  dispatch({
    type: CHANGE_FROM_INPUT,
    payload: +value
  })

export const toggleKeyboard = () => (dispatch, getState) =>
  dispatch({
    type: KEYBOARD_TOGGLE,
    payload: getState().exchange.keyboardIsVisible
  })

export const pollCurrencies = (base = 'EUR', currencies = currenciesToLoad) => {
  return (dispatch, getState) => {
    const API_STRING = GET_API_STRING(base, currencies)
    fetch(API_STRING)
      .then(response => response.json(), error => console.log('pollCurrencies: An error occurred. - ', error))
      .then(json => {
        console.log(json)
        const data = { ...json.rates, [`${base}`]: 1 }

        return dispatch({
          type: FETCH_CURRENCIES,
          payload: data
        })
      })
  }
}

export const changeBalance = ({ currencyFrom, currencyTo, changeValueFrom }) => {
  return (dispatch, getState) => {
    if (currencyFrom === currencyTo || !(+changeValueFrom > 0)) {
      return
    }
    // debugger
    const { rates, rawRates, from } = getState().exchange
    const changeValueTo = from * rawRates[currencyTo]
    const resultBalanceFrom = +rates[currencyFrom].balance - changeValueFrom
    const resultBalanceTo = +rates[currencyTo].balance + changeValueTo

    if (resultBalanceFrom >= 0) {
      rates[currencyFrom].balance = resultBalanceFrom.toFixed(2)
      rates[currencyTo].balance = resultBalanceTo.toFixed(2)
      dispatch({
        type: CHANGE_BALANCE,
        payload: rates
      })
    }
  }
}

export const randomizeBalance = () => {
  return (dispatch, getState) => {
    const { rates } = getState().exchange
    Object.keys(rates).reduce((acc, rateName) => {
      acc[rateName].balance = (Math.random() * 100000).toFixed(2)
      return acc
    }, rates)
    dispatch({
      type: CHANGE_BALANCE,
      payload: rates
    })
  }
}

export const actions = {
  changeFromInput,
  toggleKeyboard,
  pollCurrencies,
  changeBalance,
  randomizeBalance
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [KEYBOARD_TOGGLE]: (state, action) => ({
    ...state,
    keyboardIsVisible: !action.payload
  }),
  [FETCH_CURRENCIES]: (state, action) => ({
    ...state,
    rawRates: action.payload
  }),
  [CHANGE_BALANCE]: (state, action) => ({
    ...state,
    rates: { ...action.payload }
  }),
  [CHANGE_FROM_INPUT]: (state, action) => ({
    ...state,
    from: action.payload
  })
}

// ------------------------------------
// Reducer
// ------------------------------------

export default function exchangeReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
