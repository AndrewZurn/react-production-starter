import { provideHooks } from 'redial'
import React, { PropTypes } from 'react'
import { loadWorkouts } from '../actions'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router';
import WorkoutListItem from '../components/WorkoutListItem'
import { StyleSheet, css } from 'aphrodite'
import Helmet from 'react-helmet'
import { fusionWorkouts } from '../reducer'
import RaisedButton from 'material-ui/RaisedButton';
import { styles } from '../../../style'

const redial = {
  fetch: ({ dispatch }) => dispatch(loadWorkouts())
};

const mapStateToProps = state => ({
  workouts: fusionWorkouts(state),
});

const WorkoutListPage = ({ workouts }) => (
  <div className={css(styles.list)}>
    <Helmet title='Workouts' />
    <RaisedButton
      label="Create Workout"
      className={css(localStyles.createButton)}
      primary={true}
      onTouchTap={ () => {
        console.log('going to create new workout page');
        browserHistory.push('/workouts/new-workout');
      }}
    />

    {workouts.loading &&
    <div>
      <h2 className={css(styles.listTitle)}>Loading....</h2>
    </div>}
    {!workouts.loading && workouts.workouts &&
    workouts.workouts.map((workout, i) => {
      return (<WorkoutListItem key={workout.id} workout={workout} />);
    })}
  </div>
)

WorkoutListPage.PropTypes = {
  workouts: PropTypes.array.isRequired
};

const localStyles = StyleSheet.create({
  createButton: {
    position: 'relative',
    left: 370,
  }
})

export default provideHooks(redial)(connect(mapStateToProps)(WorkoutListPage))
