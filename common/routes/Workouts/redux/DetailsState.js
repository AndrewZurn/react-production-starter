import {Map} from 'immutable';
import {loop, Effects} from 'redux-loop';
import * as WorkoutsService from '../../../api/workoutService';

// Initial state
const initialState = Map({
  workout: null,
  loading: false,
  error: null
});

// ACTIONS
const GET_WORKOUT_BY_ID_REQUEST = 'WORKOUT_DETAIL_STATE/GET_WORKOUT_BY_ID_REQUEST';
const GET_WORKOUT_BY_ID_RESPONSE = 'WORKOUT_DETAIL_STATE/GET_WORKOUT_BY_ID_RESPONSE';

const CREATE_WORKOUT_REQUEST = 'WORKOUT_DETAIL_STATE/CREATE_WORKOUT_REQUEST';
const CREATE_WORKOUT_RESPONSE = 'WORKOUT_DETAIL_STATE/CREATE_WORKOUT_RESPONSE';

const UPDATE_WORKOUT_REQUEST = 'WORKOUT_DETAIL_STATE/UPDATE_WORKOUT_REQUEST';
const UPDATE_WORKOUT_RESPONSE = 'WORKOUT_DETAIL_STATE/UPDATE_WORKOUT_RESPONSE';

export function getWorkoutByIdRequest(workoutId) {
  return {
    type: GET_WORKOUT_BY_ID_REQUEST,
    payload: workoutId
  };
}

async function getWorkoutById(workoutId) {
  return {
    type: GET_WORKOUT_BY_ID_RESPONSE,
    payload: await WorkoutsService.getWorkout(workoutId)
  };
}

export function createWorkoutRequest(workout) {
  return {
    type: CREATE_WORKOUT_REQUEST,
    payload: workout
  };
}

async function createWorkout(workout) {
  return {
    type: CREATE_WORKOUT_RESPONSE,
    payload: await WorkoutsService.createWorkout(workout)
  }
}

export function updateWorkoutRequest(workout) {
  return {
    type: UPDATE_WORKOUT_REQUEST,
    payload: workout
  };
}

async function updateWorkout(workout) {
  return {
    type: UPDATE_WORKOUT_RESPONSE,
    payload: await WorkoutsService.updateWorkout(workout)
  };
}

// REDUCERS
export default function WorkoutDetailsStateReducer(state = initialState, action = {}) {
  switch (action.type) {

    case GET_WORKOUT_BY_ID_REQUEST:
      return loop(
        state.set('loading', true),
        Effects.promise(getWorkoutById, action.payload)
      );

    case GET_WORKOUT_BY_ID_RESPONSE:
      handleSingleScheduledWorkoutReturn(action, state);

    case CREATE_WORKOUT_REQUEST:
      return loop(
        state.set('loading', true),
        Effects.promise(createWorkout, action.payload)
      );

    case CREATE_WORKOUT_RESPONSE:
      handleSingleScheduledWorkoutReturn(action, state);

    case UPDATE_WORKOUT_REQUEST:
      return loop(
        state.set('loading', true),
        Effects.promise(updateWorkout, action.payload)
      );

    case UPDATE_WORKOUT_RESPONSE:
      if (action.payload && action.payload.error) {
        return state
          .set('loading', false)
          .set('error', action.payload.error);
      } else {
        return state.set('loading', false);
      }

    default:
      return state;
  }
}

function handleSingleScheduledWorkoutReturn(action, state) {
  if (action.payload && action.payload.error) {
    return state
      .set('loading', false)
      .set('error', action.payload.error);
  } else {
    return state
      .set('loading', false)
      .set('workout', action.payload);
  }
}
