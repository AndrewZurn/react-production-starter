import * as constants from '../../constants'

// Initial state
const initialState = {
  currentWorkout: null,
  loading: false,
  error: null
}

// REDUCERS
export default function workout (state = initialState, action) {
  switch (action.type) {

    case constants.GET_WORKOUT_BY_ID_REQUEST:
      return defaultLoadingState(state)

    case constants.GET_WORKOUT_BY_ID_SUCCESS:
      return defaultSuccessState(state, {currentWorkout: action.payload})

    case constants.GET_WORKOUT_BY_ID_FAILURE:
      return defaultErrorState(state, action)

    case constants.CREATE_WORKOUT_REQUEST:
      return defaultLoadingState(state)

    case constants.CREATE_WORKOUT_SUCCESS:
      return defaultSuccessState(state, {currentWorkout: null})

    case constants.CREATE_WORKOUT_FAILURE:
      return defaultErrorState(state, action)

    case constants.UPDATE_WORKOUT_REQUEST:
      return defaultLoadingState(state)

    case constants.UPDATE_WORKOUT_SUCCESS:
      return defaultSuccessState(state, {currentWorkout: null})

    case constants.UPDATE_WORKOUT_FAILURE:
      return defaultErrorState(state, action)

    case constants.RESET_WORKOUT_STATE:
      return initialState

    // TODO: FUSION API SPECIFIC UPDATE

    default:
      return state
  }
}

export const selectedWorkout = state => state.workout

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
