import {provideHooks} from "redial";
import React, {PropTypes} from "react";
import {loadUsers} from "../actions";
import {connect} from "react-redux";
import {browserHistory} from "react-router";
import UserListItem from "../components/UserListItem";
import {StyleSheet, css} from "aphrodite";
import Helmet from "react-helmet";
import {fusionUsers} from "../reducer";
import RaisedButton from "material-ui/RaisedButton";
import CircularProgress from "material-ui/CircularProgress";
import {styles} from "../../../style";

const redial = {
  fetch: ({dispatch}) => dispatch(loadUsers())
}

const mapStateToProps = state => ({
  users: fusionUsers(state)
})

export class UserListPage extends React.Component {
  constructor(props, context) {
    super(props, context)
  }

  render() {
    const {users} = this.props
    return (
      <div className={css(styles.list)}>
        <Helmet title='Users'/>
        <RaisedButton
          label='Create User'
          className={css(localStyles.createButton)}
          primary={true}
          onTouchTap={() => {
            console.log('going to create new user page')
            browserHistory.push('/users/new-user')
          }}
        />

        {
          users.loading &&
          <div className={css(styles.loadingContainer)}>
            <h2 className={css(styles.listTitle)}>Loading....</h2>
            <CircularProgress size={90} thickness={5}/>
          </div>
        }

        {
          !users.loading && users.users &&
          users.users.map((user, i) => {
            return (<UserListItem key={user.user_id} user={user}/>)
          })
        }
      </div>
    )
  }
}

UserListPage.PropTypes = {
  users: PropTypes.array.isRequired
}

const localStyles = StyleSheet.create({
  createButton: {
    position: 'relative',
    left: 370
  }
})

export default provideHooks(redial)(connect(mapStateToProps)(UserListPage))
