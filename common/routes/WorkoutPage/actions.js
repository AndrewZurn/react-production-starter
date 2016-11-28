import * as constants from '../../constants'

const headers = {
  'Content-Type': 'application/json',
  'Accept': 'application/json'
}

export function loadWorkout (slug) {
  return (dispatch, getState, { axios }) => {
    dispatch({ type: constants.GET_WORKOUT_BY_ID_REQUEST })
    return axios.get(`${constants.FusionApiUrl}/workouts/${slug}`, {headers: headers})
      .then(res => {
        dispatch({type: constants.GET_WORKOUT_BY_ID_SUCCESS, payload: res.data})
      })
      .catch(error => {
        console.error(`Error in reducer that handles ${constants.GET_WORKOUT_BY_ID_SUCCESS}: `, error)
        dispatch({type: constants.GET_WORKOUT_BY_ID_FAILURE, error})
      })
  }
}

export function createWorkout (workout, onSuccess) {
  return (dispatch, getState, { axios }) => {
    dispatch({ type: constants.CREATE_WORKOUT_REQUEST })
    return axios.post(`${constants.FusionApiUrl}/workouts`, workout, {headers: headers})
      .then(res => {
        dispatch({type: constants.CREATE_WORKOUT_SUCCESS, payload: res.data})
      })
      .then(onSuccess())
      .catch(error => {
        console.error(`Error in reducer that handles ${constants.CREATE_WORKOUT_SUCCESS}: `, error)
        dispatch({type: constants.CREATE_WORKOUT_FAILURE, error})
      })
  }
}

export function updateWorkout (workout, id, onSuccess) {
  return (dispatch, getState, { axios }) => {
    dispatch({ type: constants.UPDATE_WORKOUT_REQUEST })
    return axios.patch(`${constants.FusionApiUrl}/workouts/${id}`, user, {headers: headers})
      .then(res => {
        dispatch({type: constants.UPDATE_WORKOUT_SUCCESS, payload: res.data})
      })
      .then(onSuccess())
      .catch(error => {
        console.error(`Error in reducer that handles ${constants.UPDATE_WORKOUT_SUCCESS}: `, error)
        dispatch({type: constants.UPDATE_WORKOUT_FAILURE, error})
      })
  }
}

export function resetState () {
  return (dispatch) => dispatch({ type: constants.RESET_WORKOUT_STATE })
}

// TODO: FUSION API SPECIFIC UPDATE
