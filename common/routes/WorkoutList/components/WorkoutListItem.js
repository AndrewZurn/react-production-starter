import React from 'react'
import { Link } from 'react-router'
import { css } from 'aphrodite'
import { styles } from '../../../style'

const WorkoutListItem = ({ workout }) => (
  <div className={css(styles.listItem)}>
    <Link
      to={`/workouts/${workout.id}`}
      className={css(styles.listItemTitle)}><h3>{workout.workoutType} - {workout.name}</h3>
    </Link>
  </div>
)

export default WorkoutListItem
