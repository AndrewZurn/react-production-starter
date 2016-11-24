import React from 'react'
import { Link } from 'react-router'
import { StyleSheet, css } from 'aphrodite'

const UserListItem = ({ user }) => (
  <div className={css(styles.root)}>
    <Link
      to={`/users/${user.user_id}`}
      className={css(styles.title)}><h3>{getUsersName(user)} - {getProgramLevel(user)}</h3>
    </Link>
  </div>
);

function getUsersName (user) {
  let userMetadata = getUserMetaData(user);
  if (userMetadata && userMetadata.firstName && userMetadata.lastName) {
    return userMetadata.firstName + ' ' + userMetadata.lastName;
  } else if (user && user.nickname) {
    return user.nickname;
  } else {
    return user.email;
  }
}

function getProgramLevel (user) {
  let userMetadata = getUserMetaData(user);
  return userMetadata && userMetadata.programLevel ? userMetadata.programLevel : 'No Program Level Set';
}

function getUserMetaData (user) {
  return user && user.user_metadata ? user.user_metadata : null;
}

const styles = StyleSheet.create({
  root: {
    margin: '15px auto',
    borderRadius: '0',
    borderBottomStyle: 'solid',
    borderBottomWidth: 3,
    borderColor: '#00BCD4',
    padding: 3,
    transition: '.2s opacity ease',
    ':hover': {
      opacity: 0.5
    }
  },
  title: {
    fontSize: 16,
    textDecoration: 'none',
    lineHeight: '1.2',
    margin: '0 0 1.5rem',
    color: '#000'
  }
})

export default UserListItem
