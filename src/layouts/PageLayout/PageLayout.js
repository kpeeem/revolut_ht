import React from 'react'
import { IndexLink, Link } from 'react-router'
import RevolutLogo from './assets/revolut.png'
import PropTypes from 'prop-types'
import styles from './PageLayout.scss'
import CSSModules from 'react-css-modules'
import 'bootstrap/dist/css/bootstrap.css'

export const PageLayout = ({ children }) => (
  <div className='container text-center'>
    <div styleName='content'>
      <div className={`row hide-on-mobile ${styles.animate}`}>
        <div className='col-md-4'>
          <IndexLink to='/' activeClassName={styles['nav-item-active']}>
            <img alt='Revolut Logo' styleName='logo' src={RevolutLogo} />
          </IndexLink>
        </div>
        <div className={`col-md-4 ${styles['vm']}`}>
          <h1 styleName='title'>Web Development Home Task</h1>
        </div>
        <div className={`col-md-4 ${styles['vm']}`} style={{ paddingTop: '20px' }}>
          <IndexLink to='/' activeClassName={styles['nav-item-active']}>
            Start screen
          </IndexLink>
          {' · '}
          <Link to='/exchange' activeClassName={styles['nav-item-active']}>
            Exchange screen
          </Link>
        </div>
      </div>

      <div styleName='viewport'>
        <div styleName='status-bar' />
        {children}
        <div styleName='iphone' />
      </div>
    </div>

    <div styleName='autor'>
      👨‍💻
      <a href='https://github.com/kpeeem' target='_blank' styleName='link'>
        Железников Андрей
      </a>
      <a href='https://github.com/kpeeem' target='_blank' styleName='link'>
        github@kpeeem
      </a>
      🤔
      <a href='https://github.com/kpeeem/revolut_ht' target='_blank' styleName='link'>
        Source code
      </a>
    </div>
  </div>
)
PageLayout.propTypes = {
  children: PropTypes.node
}

export default CSSModules(PageLayout, styles, { allowMultiple: true })
