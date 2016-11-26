import * as types from '../../constants'
import {Map} from 'immutable'

// Initial state
const initialState = Map({
  workouts: [],
  loading: false,
  error: null
})

// REDUCERS
export default function workouts (state = initialState, action) {
  switch (action.type) {

    case types.GET_WORKOUTS_REQUEST:
      return defaultLoadingState(state)

    case types.GET_WORKOUTS_SUCCESS:
      return defaultSuccessState(state, {workouts: action.payload})

    case types.GET_WORKOUTS_FAILURE:
      return defaultErrorState(state, action)

    default:
      return state
  }
}

export const fusionWorkouts = state => state.workouts

function defaultLoadingState (state) {
  return {
    ...state,
    loading: true,
    error: null
  }
}

function defaultSuccessState (state, result) {
  return {
    ...state,
    ...result,
    loading: false
  }
}

function defaultErrorState (state, action) {
  return {
    ...state,
    loading: false,
    error: action.error
  }
}
