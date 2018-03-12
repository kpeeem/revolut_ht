import React from 'react'
import CSSModules from 'react-css-modules'
import styles from './Settings.scss'
import PropTypes from 'prop-types'

const Settings = ({ toggleKeyboard, rates, rawRates, from, randomizeBalance, settingsHandler }) => (
  <div styleName='window'>
    <div styleName='title'>Settings</div>
    {Object.keys(rates).map((rate, i) => (
      <div key={i} styleName='currency'>
        {rate}: {rawRates[rate] || 'base'}, balance: {rates[rate].balance}{' '}
      </div>
    ))}
    <button styleName='button' onClick={randomizeBalance}>
      Randomize balances
    </button>
    <button styleName='button' onClick={toggleKeyboard}>
      Toggle keyboard
    </button>
    <button styleName='button' onClick={settingsHandler}>
      Close settings
    </button>
  </div>
)

Settings.propTypes = {
  toggleKeyboard: PropTypes.func,
  rates: PropTypes.object,
  rawRates: PropTypes.object,
  from: PropTypes.number,
  randomizeBalance: PropTypes.func,
  settingsHandler: PropTypes.func
}

export default CSSModules(Settings, styles)
