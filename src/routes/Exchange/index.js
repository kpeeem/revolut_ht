import { injectReducer } from '../../store/reducers'

export default store => ({
  path: 'exchange',
  getComponent (nextState, cb) {
    require.ensure(
      [],
      require => {
        const Exchange = require('./containers/ExchangeContainer').default
        const reducer = require('./modules/Exchange').default
        injectReducer(store, { key: 'exchange', reducer })
        /*  Return getComponent   */
        cb(null, Exchange)
        /* Webpack named bundle   */
      },
      'exchange'
    )
  }
})
