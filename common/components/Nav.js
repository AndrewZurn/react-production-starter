import React from 'react'
import IndexLink from 'react-router/lib/IndexLink'
import Link from 'react-router/lib/Link'
import { StyleSheet, css } from 'aphrodite'

const Nav = () => (
  <div>
    <IndexLink to='/' className={css(styles.link)} activeClassName={css(styles.link, styles.activeLink)}>Home</IndexLink>
    <Link to='/posts' className={css(styles.link)} activeClassName={css(styles.link, styles.activeLink)}>Example Feed</Link>
    <Link to='/users' className={css(styles.link)} activeClassName={css(styles.link, styles.activeLink)}>Users</Link>
    <Link to='/workouts' className={css(styles.link)} activeClassName={css(styles.link, styles.activeLink)}>Workouts</Link>
    <Link to='/scheduled-workouts' className={css(styles.link)} activeClassName={css(styles.link, styles.activeLink)}>Scheduled Workouts</Link>
  </div>
)

const styles = StyleSheet.create({
  link: {
    maxWidth: 700,
    color: '#999',
    margin: '1.5rem 1rem 1.5rem 0',
    display: 'inline-block',
    textDecoration: 'none',
    fontWeight: 'bold',
    transition: '.2s opacity ease',
    ':hover': {
      opacity: 0.6
    }
  },
  activeLink: {
    color: '#000'
  }
})

export default Nav
