import React from 'react'
import Slider from 'react-slick'
import PropTypes from 'prop-types'
import styles from './Currency.scss'
import CSSModules from 'react-css-modules'

var settings = {
  dots: true,
  infinite: true,
  slidesToShow: 1,
  slidesToScroll: 1,
  arrows: false
}

// const currentOneBy = (rawRates) => rawRates

const onlyNumSanitize = value => value.replace('- ', '').replace(/[^0-9.]/, '')

const fitValues = value => {
  let fontSize = 50
  const valueLength = `${value}`.length
  if (valueLength > 7) {
    fontSize = 30
  } else if (valueLength > 4) {
    fontSize = 40
  }
  return `${fontSize}px`
}

const outputUserRate = (from, calculatedRate) => {
  if (+calculatedRate > 0) {
    const resultRate = from * calculatedRate
    return (
      <div styleName='output' style={{ fontSize: fitValues(resultRate.toFixed()) }}>
        {resultRate.toFixed(2) > 0 ? `+ ${resultRate.toFixed(2)}` : ''}
      </div>
    )
  }
  return null
}

const inputUserRate = (onChange, onlyNumSanitize, name, from, i) => (
  <input
    type='input'
    onChange={e => onChange(onlyNumSanitize(e.target.value), name)}
    value={from > 0 ? `- ${from}` : ''}
    className={`input-${i}-currency`}
    styleName='input'
    style={{ fontSize: fitValues(from) }}
    maxLength='10'
  />
)

export const Currency = ({
  onChangeSlide,
  backgroundColor,
  direction,
  rates,
  onChange,
  from,
  rawRates = null,
  activeSlideFrom
}) => (
  <div className={`${styles.main} ${styles[direction]}`}>
    <Slider afterChange={next => onChangeSlide(direction, next)} {...settings}>
      {rates &&
        Object.keys(rates).map((rate, i) => {
          const { title, name, symbol, balance } = rates[rate]
          const calculatedRate = rawRates ? rawRates[rate] : null
          // console.log(title)
          return (
            <div key={`direction-${i}`}>
              <div styleName='row'>
                <div styleName='title'>{title}</div>
                {direction === 'from'
                  ? inputUserRate(onChange, onlyNumSanitize, name, from, i)
                  : outputUserRate(from, calculatedRate)}
              </div>

              <div styleName='row'>
                <div styleName='balance'>
                  You have: <span styleName='symbol'>{symbol}</span>
                  {balance}
                </div>
                {direction !== 'from' &&
                  rawRates[rate] && (
                    <div styleName='rate'>
                      <span styleName='symbol'>{symbol}</span>
                      1 =
                      <span styleName='symbol'>{rates[activeSlideFrom].symbol}</span>
                      {(1 / rawRates[rate]).toFixed(2)}
                    </div>
                  )}
              </div>
            </div>
          )
        })}
    </Slider>
  </div>
)

Currency.propTypes = {
  onChangeSlide: PropTypes.func,
  backgroundColor: PropTypes.string,
  direction: PropTypes.string,
  rates: PropTypes.object,
  onChange: PropTypes.func,
  from: PropTypes.number,
  rawRates: PropTypes.object,
  activeSlideFrom: PropTypes.string
}

export default CSSModules(Currency, styles, { allowMultiple: true })
