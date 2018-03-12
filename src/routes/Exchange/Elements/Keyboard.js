import React from 'react'
import styles from './Keyboard.scss'
import CSSModules from 'react-css-modules'
import PropTypes from 'prop-types'

export const Keyboard = ({ keyboardIsVisible, toggleKeyboard }) => (
  <div styleName='keyboard'>
    <button styleName='num-key'>1</button>
    <button styleName='num-key'>2</button>
    <button styleName='num-key'>3</button>
    <button styleName='num-key'>4</button>
    <button styleName='num-key'>5</button>
    <button styleName='num-key'>6</button>
    <button styleName='num-key'>7</button>
    <button styleName='num-key'>8</button>
    <button styleName='num-key'>9</button>
    <button styleName='num-key'>.</button>
    <button styleName='num-key'>0</button>
    <button styleName='num-key'>x</button>
    <button styleName='toggle-keyboard' onClick={toggleKeyboard}>
      Toggle keyboard
    </button>
  </div>
)

Keyboard.propTypes = {
  keyboardIsVisible: PropTypes.bool,
  toggleKeyboard: PropTypes.func
}

export default CSSModules(Keyboard, styles, { allowMultiple: true })
