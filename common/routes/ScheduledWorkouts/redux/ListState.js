import {Map} from 'immutable';
import {loop, Effects} from 'redux-loop';
import * as ScheduledWorkoutsService from '../../../api/scheduledWorkoutService';

// Initial state
const initialState = Map({
  scheduledWorkouts: [],
  loading: false,
  error: null
});

// ACTIONS
const GET_SCHEDULED_WORKOUTS_REQUEST = 'SCHEDULED_WORKOUT_LIST_STATE/GET_SCHEDULED_WORKOUTS_REQUEST';
const GET_SCHEDULED_WORKOUTS_RESPONSE = 'SCHEDULED_WORKOUT_LIST_STATE/GET_SCHEDULED_WORKOUTS_RESPONSE';

const GET_SCHEDULED_WORKOUT_FOR_WEEK_REQUEST = 'SCHEDULED_WORKOUT_LIST_STATE/GET_SCHEDULED_WORKOUT_FOR_WEEK_REQUEST';
const GET_SCHEDULED_WORKOUT_FOR_WEEK_RESPONSE = 'SCHEDULED_WORKOUT_LIST_STATE/GET_SCHEDULED_WORKOUT_FOR_WEEK_RESPONSE';

export function getScheduledWorkoutsRequest() {
  return {type: GET_SCHEDULED_WORKOUTS_REQUEST};
}

async function getScheduledWorkouts() {
  return {
    type: GET_SCHEDULED_WORKOUTS_RESPONSE,
    payload: await ScheduledWorkoutsService.getScheduledWorkouts()
  };
}

export function getScheduledWorkoutsForWeekRequest() {
  return {type: GET_SCHEDULED_WORKOUT_FOR_WEEK_REQUEST};
}

async function getScheduledWorkoutsForWeek() {
  return {
    type: GET_SCHEDULED_WORKOUT_FOR_WEEK_RESPONSE,
    payload: await ScheduledWorkoutsService.getWeeksRemainingScheduledWorkouts()
  };
}

// REDUCERS
export default function ScheduledWorkoutListStateReducer(state = initialState, action = {}) {
  switch (action.type) {

    case GET_SCHEDULED_WORKOUTS_REQUEST:
      return loop(
        state.set('loading', true),
        Effects.promise(getScheduledWorkouts)
      );

    case GET_SCHEDULED_WORKOUTS_RESPONSE:
      handleScheduledWorkouts(action, state);

    case GET_SCHEDULED_WORKOUT_FOR_WEEK_REQUEST:
      return loop(
        state.set('loading', true),
        Effects.promise(getScheduledWorkoutsForWeek)
      );

    case GET_SCHEDULED_WORKOUT_FOR_WEEK_RESPONSE:
      handleScheduledWorkouts(action, state);

    default:
      return state;
  }
}

function handleScheduledWorkouts(action, state) {
  if (action.payload && action.payload.error) {
    return state
      .set('loading', false)
      .set('error', action.payload.error);
  } else {
    return state
      .set('loading', false)
      .set('scheduledWorkouts', action.payload);
  }
}
