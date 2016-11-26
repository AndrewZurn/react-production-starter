import { GET_WORKOUTS_REQUEST, GET_WORKOUTS_SUCCESS, GET_WORKOUTS_FAILURE, FusionApiUrl } from '../../constants'

const headers = {
  'Accept': 'application/json'
}

export function loadWorkouts () {
  return (dispatch, getState, { axios }) => {
    dispatch({ type: GET_WORKOUTS_REQUEST })
    return axios.get(`${FusionApiUrl}/workouts`, {headers: headers})
      .then(res => {
        dispatch({type: GET_WORKOUTS_SUCCESS, payload: res.data})
      })
      .catch(error => {
        console.error(`Error in reducer that handles ${GET_WORKOUTS_SUCCESS}: `, error)
        dispatch({type: GET_WORKOUTS_FAILURE, error})
      })
  }
}
