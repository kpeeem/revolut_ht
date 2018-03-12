import { connect } from 'react-redux'
import { changeFromInput, toggleKeyboard, pollCurrencies, changeBalance, randomizeBalance } from '../modules/Exchange'

import Exchange from '../components/Exchange'

const mapDispatchToProps = {
  changeFromInput,
  toggleKeyboard,
  pollCurrencies,
  changeBalance,
  randomizeBalance
}

const mapStateToProps = state => state.exchange

export default connect(mapStateToProps, mapDispatchToProps)(Exchange)
