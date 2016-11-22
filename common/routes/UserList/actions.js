import { GET_USERS_REQUEST, GET_USERS_SUCCESS, GET_USERS_FAILURE, Auth0JWT, Auth0ApiUrl } from '../../constants'

export function loadUsers () {
  return (dispatch, getState, { axios }) => {
    dispatch({ type: GET_USERS_REQUEST })
    return axios.get(`${Auth0ApiUrl}/users`, {headers: {'Authorization': `Bearer ${Auth0JWT}`}})
      .then(res => {
        dispatch({type: GET_USERS_SUCCESS, payload: res.data})
      })
      .catch(error => {
        console.error(`Error in reducer that handles ${GET_USERS_FAILURE}: `, error);
        dispatch({type: GET_USERS_FAILURE, error})
      })
  }
}