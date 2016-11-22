import * as types from '../../constants'
import {Map} from 'immutable';

// Initial state
const initialState = Map({
  users: [],
  loading: false,
  error: null
});

// REDUCERS
export default function users (state = initialState, action) {
  switch (action.type) {

    case types.GET_USERS_REQUEST:
      return defaultLoadingState(state);

    case types.GET_USERS_SUCCESS:
      return defaultSuccessState(state, {users: action.payload});

    case types.GET_USERS_FAILURE:
      return defaultErrorState(state, action);

    default:
      return state;
  }
}

export const fusionUsers = state => state.users;

function defaultLoadingState(state) {
  return {
    ...state,
    loading: true,
    error: null
  };
}

function defaultSuccessState(state, result) {
  return {
    ...state,
    ...result,
    loading: false
  }
}

function defaultErrorState(state, action) {
  return {
    ...state,
    loading: false,
    error: action.error
  }
}