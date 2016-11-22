import {Map} from 'immutable';
import {loop, Effects} from 'redux-loop';
import * as WorkoutsService from '../../../api/workoutService';

// Initial state
const initialState = Map({
  workouts: [],
  loading: false,
  error: null
});

// ACTIONS
const GET_WORKOUTS_REQUEST = 'WORKOUT_LIST_STATE/GET_WORKOUTS_REQUEST';
const GET_WORKOUTS_RESPONSE = 'WORKOUT_LIST_STATE/GET_WORKOUTS_RESPONSE';

export function getWorkoutsRequest() {
  return {type: GET_WORKOUTS_REQUEST};
}

async function getWorkouts() {
  return {
    type: GET_WORKOUTS_RESPONSE,
    payload: await WorkoutsService.getWorkouts()
  };
}

// REDUCERS
export default function WorkoutsListStateReducer(state = initialState, action = {}) {
  switch (action.type) {

    case GET_WORKOUTS_REQUEST:
      return loop(
        state.set('loading', true),
        Effects.promise(getWorkouts)
      );

    case GET_WORKOUTS_RESPONSE:
      if (action.payload && action.payload.error) {
        return state
          .set('loading', false)
          .set('error', action.payload.error);
      } else {
        return state
          .set('loading', false)
          .set('workouts', action.payload);
      }

    default:
      return state;
  }
}
