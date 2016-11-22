import {Map} from 'immutable';
import {loop, Effects} from 'redux-loop';
import * as ScheduledWorkoutsService from '../../../api/scheduledWorkoutService';

// Initial state
const initialState = Map({
  scheduledWorkout: null,
  loading: false,
  error: null
});

// ACTIONS
const GET_SCHEDULED_WORKOUT_BY_ID_REQUEST = 'SCHEDULED_WORKOUT_DETAIL_STATE/GET_SCHEDULED_WORKOUT_BY_ID_REQUEST';
const GET_SCHEDULED_WORKOUT_BY_ID_RESPONSE = 'SCHEDULED_WORKOUT_DETAIL_STATE/GET_SCHEDULED_WORKOUT_BY_ID_RESPONSE';

const GET_SCHEDULED_WORKOUT_BY_DATE_REQUEST = 'SCHEDULED_WORKOUT_DETAIL_STATE/GET_SCHEDULED_WORKOUT_BY_DATE_REQUEST';
const GET_SCHEDULED_WORKOUT_BY_DATE_RESPONSE = 'SCHEDULED_WORKOUT_DETAIL_STATE/GET_SCHEDULED_WORKOUT_BY_DATE_RESPONSE';

const CREATE_SCHEDULED_WORKOUT_REQUEST = 'SCHEDULED_WORKOUT_DETAIL_STATE/CREATE_SCHEDULED_WORKOUT_REQUEST';
const CREATE_SCHEDULED_WORKOUT_RESPONSE = 'SCHEDULED_WORKOUT_DETAIL_STATE/CREATE_SCHEDULED_WORKOUT_RESPONSE';

const UPDATE_SCHEDULED_WORKOUT_STATUS_REQUEST = 'SCHEDULED_WORKOUT_DETAIL_STATE/UPDATE_SCHEDULED_WORKOUT_STATUS_REQUEST';
const UPDATE_SCHEDULED_WORKOUT_STATUS_RESPONSE = 'SCHEDULED_WORKOUT_DETAIL_STATE/UPDATE_SCHEDULED_WORKOUT_STATUS_RESPONSE';

export function getScheduledWorkoutByIdRequest(scheduledWorkoutId) {
  return {
    type: GET_SCHEDULED_WORKOUT_BY_ID_REQUEST,
    payload: scheduledWorkoutId
  };
}

async function getScheduledWorkoutById(scheduledWorkoutId) {
  return {
    type: GET_SCHEDULED_WORKOUT_BY_ID_RESPONSE,
    payload: await ScheduledWorkoutsService.getScheduledWorkout(scheduledWorkoutId)
  };
}

export function getScheduledWorkoutByDateRequest(date) {
  return {
    type: GET_SCHEDULED_WORKOUT_BY_ID_REQUEST,
    payload: date
  };
}

async function getScheduledWorkoutByDate(date) {
  return {
    type: GET_SCHEDULED_WORKOUT_BY_ID_RESPONSE,
    payload: await ScheduledWorkoutsService.getScheduledWorkoutByDate(date)
  };
}

export function createScheduledWorkoutRequest(scheduledWorkout) {
  return {
    type: CREATE_SCHEDULED_WORKOUT_REQUEST,
    payload: scheduledWorkout
  };
}

async function createScheduledWorkout(scheduledWorkout) {
  return {
    type: CREATE_SCHEDULED_WORKOUT_RESPONSE,
    payload: await ScheduledWorkoutsService.createScheduledWorkout(scheduledWorkout)
  }
}

export function updateScheduledWorkoutStatusRequest(scheduledWorkoutId) {
  return {
    type: UPDATE_SCHEDULED_WORKOUT_STATUS_REQUEST,
    payload: scheduledWorkoutId
  };
}

async function updateScheduledWorkoutStatus(scheduledWorkoutId) {
  return {
    type: UPDATE_SCHEDULED_WORKOUT_STATUS_RESPONSE,
    payload: await ScheduledWorkoutsService.updateScheduledWorkoutStatus(scheduledWorkoutId)
  };
}

// REDUCERS
export default function ScheduledWorkoutDetailsStateReducer(state = initialState, action = {}) {
  switch (action.type) {

    case GET_SCHEDULED_WORKOUT_BY_ID_REQUEST:
      return loop(
        state.set('loading', true),
        Effects.promise(getScheduledWorkoutById, action.payload)
      );

    case GET_SCHEDULED_WORKOUT_BY_ID_RESPONSE:
      handleSingleScheduledWorkoutReturn(action, state);

    case GET_SCHEDULED_WORKOUT_BY_DATE_REQUEST:
      return loop(
        state.set('loading', true),
        Effects.promise(getScheduledWorkoutByDate, action.payload)
      );

    case GET_SCHEDULED_WORKOUT_BY_DATE_RESPONSE:
      handleSingleScheduledWorkoutReturn(action, state);

    case CREATE_SCHEDULED_WORKOUT_REQUEST:
      return loop(
        state.set('loading', true),
        Effects.promise(createScheduledWorkout, action.payload)
      );

    case CREATE_SCHEDULED_WORKOUT_RESPONSE:
      handleSingleScheduledWorkoutReturn(action, state);

    case UPDATE_SCHEDULED_WORKOUT_STATUS_REQUEST:
      return loop(
        state.set('loading', true),
        Effects.promise(updateScheduledWorkoutStatus, action.payload)
      );

    case UPDATE_SCHEDULED_WORKOUT_STATUS_RESPONSE:
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
      .set('scheduledWorkout', action.payload);
  }
}
