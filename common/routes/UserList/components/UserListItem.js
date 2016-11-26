import React from 'react'
import { Link } from 'react-router'
import { css } from 'aphrodite'
import { styles } from '../../../style'

const UserListItem = ({ user }) => (
  <div className={css(styles.listItem)}>
    <Link
      to={`/users/${user.user_id}`}
      className={css(styles.listItemTitle)}><h3>{getUsersName(user)} - {getProgramLevel(user)}</h3>
    </Link>
  </div>
)

function getUsersName (user) {
  let userMetadata = getUserMetaData(user)
  if (userMetadata && userMetadata.firstName && userMetadata.lastName) {
    return userMetadata.firstName + ' ' + userMetadata.lastName
  } else if (user && user.nickname) {
    return user.nickname
  } else {
    return user.email
  }
}

function getProgramLevel (user) {
  let userMetadata = getUserMetaData(user)
  return userMetadata && userMetadata.programLevel ? userMetadata.programLevel : 'No Program Level Set'
}

function getUserMetaData (user) {
  return user && user.user_metadata ? user.user_metadata : null
}

export default UserListItem
