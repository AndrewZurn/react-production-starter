// polyfill webpack require.ensure
if (typeof require.ensure !== 'function') require.ensure = (d, c) => c(require)

import App from '../components/App'
import Home from './Home'

export default function createRoutes (store) {
  const root = {
    path: '/',
    component: App,
    getChildRoutes (location, cb) {
      require.ensure([], (require) => {
        cb(null, [
          require('./UserList').default(store),
          require('./UserPage').default(store),
          // require('./Workouts').default(store),
          // require('./ScheduledWorkouts').default(store),
          require('./NotFound').default
        ])
      })
    },

    indexRoute: {
      component: Home
    }
  }

  return root
}
