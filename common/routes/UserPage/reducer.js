import * as constants from '../../constants'

// Initial state
const initialState = {
  currentUser: null,
  remainingWorkouts: null,
  loading: false,
  error: null
}

// REDUCERS
export default function user (state = initialState, action) {
  switch (action.type) {

    case constants.GET_USER_BY_ID_REQUEST:
      return defaultLoadingState(state)

    case constants.GET_USER_BY_ID_SUCCESS:
      return defaultSuccessState(state, {currentUser: action.payload})

    case constants.GET_USER_BY_ID_FAILURE:
      return defaultErrorState(state, action)

    case constants.GET_USER_REMAINING_WORKOUTS_REQUEST:
      return defaultLoadingState(state)

    case constants.GET_USER_REMAINING_WORKOUTS_SUCCESS:
      return defaultSuccessState(state, {remainingWorkouts: action.payload})

    case constants.GET_USER_REMAINING_WORKOUTS_FAILURE:
      return defaultErrorState(state, action)

    case constants.CREATE_USER_REQUEST:
      return defaultLoadingState(state)

    case constants.CREATE_USER_SUCCESS:
      return defaultSuccessState(state, {currentUser: null})

    case constants.CREATE_USER_FAILURE:
      return defaultErrorState(state, action)

    case constants.UPDATE_USER_REQUEST:
      return defaultLoadingState(state)

    case constants.UPDATE_USER_SUCCESS:
      return defaultSuccessState(state, {currentUser: null})

    case constants.UPDATE_USER_FAILURE:
      return defaultErrorState(state, action)

    case constants.RESET_USER_STATE:
      return initialState

    // TODO: FUSION API SPECIFIC UPDATE

    default:
      return state
  }
}

export const selectedUser = state => state.user

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
