if (typeof require.ensure !== 'function') require.ensure = (d, c) => c(require)
import { injectAsyncReducer } from '../../store'

export default function createRoutes (store) {
  return {
    path: 'workouts',
    getComponents (location, cb) {
      require.ensure([
        './containers/WorkoutList',
        './reducer'
      ], (require) => {
        let WorkoutList = require('./containers/WorkoutList').default
        let workoutReducer = require('./reducer').default
        injectAsyncReducer(store, 'workouts', workoutReducer)
        cb(null, WorkoutList)
      })
    }
  }
}
