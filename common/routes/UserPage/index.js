if (typeof require.ensure !== 'function') require.ensure = (d, c) => c(require)
import { injectAsyncReducer } from '../../store'

export default function createRoutes (store) {
  return {
    path: 'users/:slug',
    getComponents (location, cb) {
      require.ensure([
        './containers/UserPage',
        './reducer'
      ], (require) => {
        let UserPage = require('./containers/UserPage').default
        let userReducer = require('./reducer').default
        injectAsyncReducer(store, 'user', userReducer)
        cb(null, UserPage)
      })
    }
  }
}
