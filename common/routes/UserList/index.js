if (typeof require.ensure !== 'function') require.ensure = (d, c) => c(require)
import { injectAsyncReducer } from '../../store'

export default function createRoutes (store) {
  return {
    path: 'users',
    getComponents (location, cb) {
      require.ensure([
        './containers/UserList',
        './reducer'
      ], (require) => {
        let UserList = require('./containers/UserList').default
        let userReducer = require('./reducer').default
        injectAsyncReducer(store, 'users', userReducer)
        cb(null, UserList)
      })
    }
  }
}
