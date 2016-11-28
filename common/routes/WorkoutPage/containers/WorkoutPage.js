import {provideHooks} from "redial";
import React, {PropTypes} from "react";
import update from "react-addons-update";
import {connect} from "react-redux";
import {loadWorkout, createWorkout, updateWorkout, resetState} from "../actions";
import {StyleSheet, css} from "aphrodite";
import Helmet from "react-helmet";
import NotFound from "../../../components/NotFound";
import {selectedWorkout} from "../reducer";
import TextField from "material-ui/TextField";
import Divider from "material-ui/Divider";
import Paper from "material-ui/Paper";
import RaisedButton from "material-ui/RaisedButton";
import FlatButton from "material-ui/FlatButton";
import {browserHistory} from "react-router";
import {styles} from "../../../style";

const redial = {
  fetch: ({dispatch, params: {slug}}) => {
    if (slug === 'new-workout') {

    } else {
      dispatch(loadWorkout(slug)) // slug is workoutId
    }
  }
}

const mapStateToProps = state => selectedWorkout(state)

export class WorkoutPage extends React.Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      hasLoadedWorkout: false,
      workoutName: '',
      workoutType: '',
      instructions: '', // optional
      input: '', // optional
      duration: '', // optional
      exercises: [],
      errors: []
    }
  }

  _validateForm() {
    let errors = []
    if (this.state.workoutName.length === 0) {
      console.warn('Invalid or empty workout name')
      errors.push('Please enter a workout name.')
    }

    if (this.state.workoutType.length === 0) {
      console.warn('Workout type not selected.')
      errors.push('Please selected a workout type.')
    }

    this.state.exercises.forEach(exercise => {
      if (exercise.name.length === 0) {
        console.warn('Exercise name empty.')
        errors.push('Please enter a name for the exercise.')
      }

      if (exercise.amount.length == 0) {
        console.warn('Exercise amount empty.')
        errors.push('Please enter an amount for the exercise.')
      }
    })

    this.setState({...this.state, errors})
    return errors.length > 0
  }

  _getWorkoutToSave() {
    let workout = {
      name: this.state.workoutName,
      workoutType: this.state.workoutType,
      exercises: this.state.exercises.map(ex => {
        let exercise = {name: ex.name, amount: ex.amount};

        if (ex.description.length > 0) exercise.push({description: ex.description})
        if (ex.input.length > 0) exercise.push({input: ex.input})
        return exercise;
      })
    };

    if (this.state.instructions.length > 0) workout.push({instructions: this.state.instructions})
    if (this.state.input.length > 0) workout.push({input: this.state.input})

    return workout;
  }

  render() {
    const {currentWorkout, _, loading, error, dispatch} = this.props

    if (currentWorkout && !this.state.hasLoadedWorkout) { // load the workout state once
      this.setState({
        hasLoadedWorkout: true,
        workoutName: currentWorkout.name,
        workoutType: currentWorkout.workoutType,
        instructions: currentWorkout.instructions,
        input: currentWorkout.input,
        duration: currentWorkout.duration,
        exercises: currentWorkout.exercises
      })
    }

    // create the exercise inputs to display
    let exerciseInputs = []
    for (const [index, exercise] of this.state.exercises.entries()) {
      let randomId = Math.random()
      exerciseInputs.push(
        <div key={`exercise_div_${Math.random()}`}>
          <Paper key={`exercise_input_container_${Math.random()}`} className={css(localStyles.exerciseContainer)}>
            <TextField key={`exercise_name_${randomId}`}
                       hintText="Exercise Name*"
                       defaultValue={exercise && exercise.name ? exercise.name : ''}
                       className={css(localStyles.exerciseField)}
                       underlineShow={false}/>
            <Divider key={`exercise_divider_1_${randomId}`}/>
            <TextField key={`exercise_description_${randomId}`}
                       hintText="Exercise Description"
                       defaultValue={exercise && exercise.description ? exercise.description : ''}
                       className={css(localStyles.exerciseField)}
                       underlineShow={false}/>
            <Divider key={`exercise_divider_2_${randomId}`}/>
            <TextField key={`exercise_amount_${randomId}`}
                       hintText="Exercise Amount*"
                       defaultValue={exercise && exercise.amount ? exercise.amount : ''}
                       className={css(localStyles.exerciseField)}
                       underlineShow={false}/>
            <Divider key={`exercise_divider_3_${randomId}`}/>
            <TextField key={`exercise_input_${randomId}`}
                       hintText="Exercise Input"
                       defaultValue={exercise && exercise.input ? exercise.input : ''}
                       className={css(localStyles.exerciseField)}
                       underlineShow={false}/>
            <Divider key={`exercise_divider_4_${randomId}`}/>
            <FlatButton
              key={`move_exercise_up_${randomId}`}
              label='Move Up'
              className={css(localStyles.exerciseMoveUpDownButton)}
              secondary={true}
              onTouchTap={() => {
                let toIndex = index - 1
                if (toIndex >= 0 && toIndex < this.state.exercises.length) {
                  let element = this.state.exercises[index]
                  this.setState({
                    exercises: update(this.state.exercises, {$splice: [[index, 1], [toIndex, 0, element]]})
                  })
                }
              }
              }
            />
            <FlatButton
              key={`move_exercise_down_${randomId}`}
              label='Move Down'
              className={css(localStyles.exerciseMoveUpDownButton)}
              secondary={true}
              onTouchTap={() => {
                let toIndex = index + 1
                if (toIndex >= 0 && toIndex < this.state.exercises.length) {
                  let element = this.state.exercises[index]
                  this.setState({
                    exercises: update(this.state.exercises, {$splice: [[index, 1], [toIndex, 0, element]]})
                  })
                }
              }}
            />
            <FlatButton
              key={`remove_exercise_${randomId}`}
              label='Remove'
              className={css(localStyles.exerciseMoveUpDownButton)}
              onTouchTap={() => {
                console.log('removing exercise at position: ' + index)
                this.setState({exercises: update(this.state.exercises, {$splice: [[index, 1]]})})
              }}
            />
          </Paper>
        </div>
      );
    }

    if (!error) {
      let title = currentWorkout ? 'Update Workout' : 'Create New Workout'
      let saveWorkoutLabel = currentWorkout ? 'Update Workout' : 'Create Workout'

      return (
        <div>
          <Helmet title={title}/>
          {loading &&
          <div>
            <h2 className={css(styles.pageLoading)}>Loading....</h2>
          </div>}
          {!loading &&
          <div>
            <h2 className={css(styles.pageListItemTitle)}>{title}</h2>

            <div className={css(styles.pageErrorContainer)}>
              {this.state.errors.map(e =>
                <strong key={`error-${e}`}
                        className={css(styles.pageErrorMessage)}>{e}<br /></strong>)}
            </div>

            <TextField
              id={'workout_name'}
              defaultValue={currentWorkout && currentWorkout.name ? currentWorkout.name : ''}
              floatingLabelText={'Workout Name*'}
              onChange={(event) => this.setState({...this.state, workoutName: event.target.value})}
              fullWidth={true}
            />
            <TextField
              id={'workout_type'}
              defaultValue={currentWorkout && currentWorkout.workoutType ? currentWorkout.workoutType : ''}
              floatingLabelText={'Workout Type*'}
              onChange={(event) => this.setState({...this.state, workoutType: event.target.value})}
              fullWidth={true}
            />
            <TextField
              id={'instructions'}
              defaultValue={currentWorkout && currentWorkout.instructions ? currentWorkout.instructions : ''}
              floatingLabelText={'Instructions'}
              onChange={(event) => this.setState({...this.state, instructions: event.target.value})}
              fullWidth={true}
            />
            <TextField
              id={'input'}
              defaultValue={currentWorkout && currentWorkout.input ? currentWorkout.input : ''}
              floatingLabelText={'Input'}
              onChange={(event) => this.setState({...this.state, input: event.target.value})}
              fullWidth={true}
            />
            <TextField
              id={'duration'}
              defaultValue={currentWorkout && currentWorkout.duration ? currentWorkout.duration : ''}
              floatingLabelText={'Duration'}
              onChange={(event) => this.setState({...this.state, duration: event.target.value})}
              fullWidth={true}
            />
            <br /><br />

            {/*Exercise Inputs*/}
            <span className={css(localStyles.subheaderText)}>Exercises</span>
            <FlatButton
              label='Add Exercise'
              className={css(localStyles.createButton, localStyles.createExerciseButton)}
              primary={true}
              onTouchTap={() => {
                this.setState({exercises: update(this.state.exercises, {$push: [{}]})})
              }}
            />
            <br /><br />
            {exerciseInputs}

            <RaisedButton
              label='Cancel'
              className={css(localStyles.createButton)}
              secondary={true}
              onTouchTap={() => {
                dispatch(resetState())
                browserHistory.push('/workouts')
              }}
            />
            <RaisedButton
              label={saveWorkoutLabel}
              className={css(localStyles.createButton)}
              primary={true}
              onTouchTap={() => {
                console.log('validating create workout inputs')
                if (!this._validateForm()) {
                  console.log('saving new workout')
                  console.log(`new workout - name: ${this.state.workoutName} type: ${this.state.workoutType} ` +
                    `instructions: ${this.state.instructions} input: ${this.state.input} duration: ${this.state.duration}`)
                  if (currentWorkout) { // editing a current workout
                    dispatch(updateWorkout(this._getWorkoutToSave(), currentWorkout.id, () => browserHistory.push('/workouts')))
                  } else { // new workout
                    dispatch(createWorkout(this._getWorkoutToSave(), () => browserHistory.push('/workouts')))
                  }
                }
              }}
            />
          </div>}
        </div>
      )
    } else {
      // maybe check for different types of errors and display appropriately
      return <NotFound />
    }
  }
}

WorkoutPage.propTypes = {
  title: PropTypes.string,
  content: PropTypes.string,
  isLoading: PropTypes.bool,
  error: PropTypes.object
}

const localStyles = StyleSheet.create({
  createButton: {
    borderWidth: 1,
    position: 'relative',
    marginTop: 15,
    marginRight: 15,
    left: 400
  },
  createExerciseButton: {
    left: 443
  },
  exerciseMoveUpDownButton: {
    marginTop: 5,
    marginBottom: 5,
    marginRight: 0,
    left: 350
  },
  exerciseField: {
    marginLeft: 20
  },
  exerciseContainer: {
    marginBottom: 5
  },
  subheaderText: {
    fontSize: 20,
    color: '#00BCD4',
    fontWeight: 'bold'
  }
})

export default provideHooks(redial)(connect(mapStateToProps)(WorkoutPage))
