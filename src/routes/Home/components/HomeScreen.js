import React from 'react'
import styles from './HomeScreen.scss'
import { Link } from 'react-router'
import CSSModules from 'react-css-modules'

export const HomeView = () => (
  <div styleName='start'>
    <Link styleName='link' to='/exchange'>
      <div styleName='logo' />
      <h4 styleName='tap-to-start'>Tap to start...</h4>
    </Link>
  </div>
)

export default CSSModules(HomeView, styles)
