import { provideHooks } from 'redial'
import React, { PropTypes } from 'react'
import { loadUsers } from '../actions'
import { connect } from 'react-redux'
import UserListItem from '../components/UserListItem'
import { StyleSheet, css } from 'aphrodite'
import Helmet from 'react-helmet'
import { fusionUsers } from '../reducer'
import RaisedButton from 'material-ui/RaisedButton';

const redial = {
  fetch: ({ dispatch }) => dispatch(loadUsers())
}

const mapStateToProps = state => ({
  users: fusionUsers(state)
})

const UserListPage = ({ users }) => (
  <div className={css(styles.root)}>
    <Helmet title='Users' />
    <RaisedButton label="Create User" primary={true}/>
    {users.loading &&
      <div>
        <h2 className={css(styles.title)}>Loading....</h2>
      </div>}
    {!users.loading && users.users &&
      users.users.map((user, i) => {
        return (<UserListItem key={user.user_id} user={user} />);
      })}
  </div>
)

UserListPage.PropTypes = {
  users: PropTypes.array.isRequired
}

const styles = StyleSheet.create({
  root: {
    maxWidth: 500
  },
  title: {
    fontSize: 28,
    margin: '0 auto 1.5rem',
    color: '#b7b7b7'
  },
  createButton: {
    marginBottom: 10,
    float: 'right'
  }
})

export default provideHooks(redial)(connect(mapStateToProps)(UserListPage))
