import React from 'react'
import { Link } from 'react-router'
import { StyleSheet, css } from 'aphrodite'

const UserListItem = ({ user }) => (
  <div className={css(styles.root)}>
    <h3><Link to={`/users/${user.user_id}`} className={css(styles.title)}>User: {getUsersName(user)}</Link></h3>
  </div>
);

function getUsersName (user) {
  if (user && user.user_metadata && user.user_metadata.firstName && user.user_metadata.lastName) {
    return user.user_metadata.firstName + ' ' + user.user_metadata.lastName;
  } else if (user && user.nickname) {
    return user.nickname;
  } else {
    return user.email;
  }
}

const styles = StyleSheet.create({
  root: {
    margin: '0 auto 1.5rem'
  },
  title: {
    fontSize: 28,
    textDecoration: 'none',
    lineHeight: '1.2',
    margin: '0 0 1.5rem',
    color: '#000',
    transition: '.3s opacity ease',
    ':hover': {
      opacity: 0.5
    }
  }
})

export default UserListItem
