import * as constants from '../../constants'
import {browserHistory} from "react-router";

export function loadUser (slug) {
  return (dispatch, getState, { axios }) => {
    dispatch({ type: constants.GET_USER_BY_ID_REQUEST })
    return axios.get(`${constants.Auth0ApiUrl}/users/${slug}`, {headers: {'Authorization': `Bearer ${constants.Auth0JWT}`}})
      .then(res => {
        dispatch({type: constants.GET_USER_BY_ID_SUCCESS, payload: res.data})
      })
      .catch(error => {
        console.error(`Error in reducer that handles ${constants.GET_USER_BY_ID_FAILURE}: `, error)
        dispatch({type: constants.GET_USER_BY_ID_FAILURE, error})
      })
  }
}

export function getUserRemainingWorkouts (id) {
  return (dispatch, getState, { axios }) => {
    dispatch({ type: constants.GET_USER_REMAINING_WORKOUTS_REQUEST })
    return axios.get(`${constants.FusionApiUrl}/users/${id}`)
      .then(res => {
        dispatch({type: constants.GET_USER_REMAINING_WORKOUTS_SUCCES, payload: res.data})
      })
      .catch(error => {
        console.error(`Error in reducer that handles ${constants.GET_USER_REMAINING_WORKOUTS_FAILURE}: `, error)
        dispatch({type: constants.GET_USER_REMAINING_WORKOUTS_FAILURE, error})
      })
  }
}

export function createUser (user) {
  return (dispatch, getState, { axios }) => {
    dispatch({ type: constants.CREATE_USER_REQUEST })
    return axios.post(`${constants.Auth0ApiUrl}/users`, user, {headers: {'Authorization': `Bearer ${constants.Auth0JWT}`}})
      .then(res => {
        dispatch({type: constants.CREATE_USER_SUCCESS, payload: res.data})
      })
      .then(res => browserHistory.push('/users'))
      .catch(error => {
        console.error(`Error in reducer that handles ${constants.CREATE_USER_FAILURE}: `, error)
        dispatch({type: constants.CREATE_USER_FAILURE, error})
      })
  }
}

export function updateUser (user, id) {
  return (dispatch, getState, { axios }) => {
    dispatch({ type: constants.UPDATE_USER_REQUEST })
    return axios.patch(`${constants.Auth0ApiUrl}/users/${id}`, user, {headers: {'Authorization': `Bearer ${constants.Auth0JWT}`}})
      .then(res => {
        dispatch({type: constants.UPDATE_USER_SUCCESS, payload: res.data})
      })
      .catch(error => {
        console.error(`Error in reducer that handles ${constants.UPDATE_USER_FAILURE}: `, error)
        dispatch({type: constants.UPDATE_USER_FAILURE, error})
      })
  }
}

// TODO: FUSION API SPECIFIC UPDATE