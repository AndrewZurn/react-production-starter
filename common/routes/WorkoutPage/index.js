if (typeof require.ensure !== 'function') require.ensure = (d, c) => c(require)
import { injectAsyncReducer } from '../../store'

export default function createroutes (store) {
  return {
    path: 'workouts/:slug',
    getComponents (location, cb) {
      require.ensure([
        './containers/WorkoutPage',
        './reducer'
      ], (require) => {
        let WorkoutPage = require('./containers/WorkoutPage').default
        let workoutReducer = require('./reducer').default
        injectAsyncReducer(store, 'workout', workoutReducer)
        cb(null, WorkoutPage)
      })
    }
  }
}
