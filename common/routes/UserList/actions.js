import { GET_USERS_REQUEST, GET_USERS_SUCCESS, GET_USERS_FAILURE, Auth0JWT, Auth0ApiUrl } from '../../constants'

const headers = {
  'Authorization': `Bearer ${Auth0JWT}`,
  'Content-Type': 'application/json',
  'Accept': 'application/json'
};

export function loadUsers () {
  return (dispatch, getState, { axios }) => {
    dispatch({ type: GET_USERS_REQUEST })
    return axios.get(`${Auth0ApiUrl}/users`, {headers: headers})
      .then(res => {
        dispatch({type: GET_USERS_SUCCESS, payload: res.data})
      })
      .catch(error => {
        console.error(`Error in reducer that handles ${GET_USERS_FAILURE}: `, error)
        dispatch({type: GET_USERS_FAILURE, error})
      })
  }
}