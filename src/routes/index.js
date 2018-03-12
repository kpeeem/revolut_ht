import CoreLayout from '../layouts/PageLayout/PageLayout'
import Home from './Home'
import ExchangeRoute from './Exchange'

export const createRoutes = store => ({
  path: '/',
  component: CoreLayout,
  indexRoute: Home,
  childRoutes: [ExchangeRoute(store)]
})

export default createRoutes
