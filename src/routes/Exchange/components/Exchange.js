import React, { Component } from 'react'
import autobind from 'autobind-decorator'
import PropTypes from 'prop-types'
import styles from './Exchange.scss'
import { Link } from 'react-router'
import CurrencyConverter from '../Elements/Currency'
import Settings from '../Elements/Settings'
import Keyboard from '../Elements/Keyboard'
import CSSModules from 'react-css-modules'

const Particles = () => (
  <div className={styles['particle-container']}>
    {[...Array(10).keys()].map((val, i) => <div className={styles.particle} key={i} />)}
  </div>
)

@CSSModules(styles, { allowMultiple: true })
export default class Exchange extends Component {
  componentDidMount () {
    const { pollCurrencies } = this.props
    const { activeSlideFrom } = this.state
    pollCurrencies()
    let timer = setInterval(pollCurrencies(activeSlideFrom), 10000)
    this.setState({ timer })
    this.setFocusOnActiveInput()
  }

  @autobind
  setFocusOnActiveInput (i = 0) {
    const visibleInput = document.querySelectorAll(`.slick-slide.slick-active .input-${i}-currency`)

    visibleInput && visibleInput[0].focus()
  }

  @autobind
  rateConversion (currencyNameFrom, currencyNameTo, rawRates, rates) {
    const symbolFrom = rates[currencyNameFrom].symbol
    const symbolTo = rates[currencyNameTo].symbol
    const rateToValue = rawRates[currencyNameTo]

    return `${symbolFrom}1 = ${symbolTo}${rateToValue}`
  }

  componentWillUnmount () {
    clearInterval(this.state.timer)
  }
  @autobind
  settingsHandler () {
    this.setState({
      isSettingsVisible: !this.state.isSettingsVisible
    })
  }
  @autobind
  onChangeSlideHandler (type, i) {
    const { props, props: { pollCurrencies }, setFocusOnActiveInput } = this

    const currencyToSet = Object.keys(props.rates)[i]
    if (type === 'from') {
      pollCurrencies(currencyToSet)
      this.setState({
        activeSlideFrom: currencyToSet
      })

      setFocusOnActiveInput(i)
    } else {
      this.setState({
        activeSlideTo: currencyToSet
      })
    }
  }

  render () {
    const {
      state,
      props: {
        changeBalance,
        toggleKeyboard,
        keyboardIsVisible,
        changeFromInput,
        rates,
        from,
        rawRates,
        randomizeBalance
      },
      settingsHandler,
      rateConversion
    } = this
    return (
      <div styleName='wrapper'>
        {!state.isSettingsVisible ? (
          <div styleName='settingToggle' onClick={this.settingsHandler}>
            Settings
          </div>
        ) : (
          <Settings
            {...{
              toggleKeyboard,
              rates,
              rawRates,
              from,
              settingsHandler,
              randomizeBalance
            }}
          />
        )}
        <div styleName='main'>
          <Particles />
          <div styleName='controls'>
            <div styleName='col'>
              <Link styleName='button' to='/'>
                <button styleName='cancel-button'>Cancel</button>
              </Link>
            </div>
            <div styleName='col'>
              <button styleName='topCurrency'>
                {rateConversion(state.activeSlideFrom, state.activeSlideTo, rawRates, rates)}
              </button>
            </div>
            <div styleName='col'>
              <button
                styleName='button'
                style={{ justifyContent: 'flex-end' }}
                onClick={() =>
                  changeBalance({
                    currencyFrom: state.activeSlideFrom,
                    currencyTo: state.activeSlideTo,
                    changeValueFrom: from,
                    changeValueTo: rawRates[state.activeSlideTo]
                  })
                }
              >
                Exchange
              </button>
            </div>
          </div>
          <CurrencyConverter
            backgroundColor={'#2a64e3'}
            direction='from'
            rates={rates}
            onChange={changeFromInput}
            from={from}
            onChangeSlide={this.onChangeSlideHandler}
          />
          <CurrencyConverter
            backgroundColor={'#2450a8'}
            direction='to'
            rates={rates}
            from={from}
            rawRates={rawRates}
            onChangeSlide={this.onChangeSlideHandler}
            activeSlideFrom={this.state.activeSlideFrom}
          />
          {keyboardIsVisible && <Keyboard {...{ toggleKeyboard }} />}
        </div>
      </div>
    )
  }
  state = {
    timer: null,
    activeSlideFrom: 'EUR',
    activeSlideTo: 'EUR',
    isSettingsVisible: false
  }
}

Exchange.propTypes = {
  pollCurrencies: PropTypes.func,
  changeBalance: PropTypes.func,
  toggleKeyboard: PropTypes.func,
  keyboardIsVisible: PropTypes.bool,
  changeFromInput: PropTypes.func,
  rates: PropTypes.object,
  from: PropTypes.number,
  rawRates: PropTypes.object,
  randomizeBalance: PropTypes.func
}

// export default connect(state => ({
//   val: state.val
// }))(Exchange)
