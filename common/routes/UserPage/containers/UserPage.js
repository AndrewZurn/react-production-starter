import {provideHooks} from 'redial'
import React, {PropTypes} from 'react'
import {connect} from 'react-redux'
import {loadUser, createUser, updateUser, resetState} from '../actions'
import {StyleSheet, css} from 'aphrodite'
import Helmet from 'react-helmet'
import NotFound from '../../../components/NotFound'
import {selectedUser} from '../reducer'
import Checkbox from 'material-ui/Checkbox'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import {browserHistory} from 'react-router'
import {styles} from '../../../style'

const redial = {
  fetch: ({dispatch, params: {slug}}) => {
    if (slug === 'new-user') {

    } else {
      dispatch(loadUser(slug)) // slug is userId
    }
  }
}

const mapStateToProps = state => selectedUser(state)

export class UserPage extends React.Component {
  constructor (props, context) {
    super(props, context)
    this.state = {
      hasLoadedUser: false,
      firstName: '',
      lastName: '',
      email: '',
      programLevel: '',
      blocked: false,
      errors: []
    }
  }

  _validateForm () {
    let errors = []
    if (this.state.firstName.length === 0) {
      console.warn('Invalid or empty first name')
      errors.push('Please enter a first name.')
    }

    if (this.state.lastName.length === 0) {
      console.warn('Invalid or empty last name')
      errors.push('Please enter a last name.')
    }

    if (!this._validEmail(this.state.email)) {
      console.warn('Invalid or empty email')
      errors.push('Please enter a valid email.')
    }

    if (!['GOLD', 'SILVER', 'BRONZE'].includes(this.state.programLevel.toUpperCase())) {
      console.warn('Invalid or empty program level')
      errors.push('Please enter a valid program level (Gold, Silver, or Bronze).')
    }

    this.setState({...this.state, errors})
    return errors.length > 0
  }

  _validEmail (email) {
    var re = /^(([^<>()\[\]\\.,:\s@']+(\.[^<>()\[\]\\.,:\s@']+)*)|('.+'))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return re.test(email)
  }

  _getUserToSave () {
    return {
      connection: 'Username-Password-Authentication',
      email: this.state.email,
      password: 'PasswordToReset',
      user_metadata: {
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        programLevel: this.state.programLevel
      }
    }
  }

  _getUserToUpdate (currentUser) {
    let user = {
      blocked: this.state.blocked,
      user_metadata: {
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        programLevel: this.state.programLevel
      }
    }

    if (this.state.email !== currentUser.email) {
      user.email = this.state.email
    }

    return user
  }

  _resetAndReturnToUsersList(dispatch) {
    dispatch(resetState())
    browserHistory.push('/users')
  }

  render () {
    const {currentUser, _, loading, error, dispatch} = this.props

    if (currentUser && !this.state.hasLoadedUser) { // load the users state once
      this.setState({
        hasLoadedUser: true,
        firstName: currentUser.user_metadata.firstName,
        lastName: currentUser.user_metadata.lastName,
        email: currentUser.email,
        programLevel: currentUser.user_metadata.programLevel,
        blocked: currentUser.blocked
      })
    }

    if (!error) {
      let title = currentUser ? 'Update User' : 'Create New User'
      let saveUserLabel = currentUser ? 'Update User' : 'Create User'

      let blockUserButton = null
      if (currentUser) {
        blockUserButton = (
          <Checkbox
            checked={this.state.blocked}
            label='Block User Logins'
            onCheck={(e, isChecked) => {
              this.setState({...this.state, blocked: isChecked})
            }}
          />
        )
      }

      let blockedReminderText = <div className={css(styles.warning)}
        hidden={!this.state.blocked}>Warning: User will NOT be allowed to login.</div>

      return (
        <div>
          <Helmet title={title} />
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

            {blockedReminderText}

            <TextField
              id={'create_user_first_name'}
              defaultValue={currentUser && currentUser.user_metadata ? currentUser.user_metadata.firstName : ''}
              floatingLabelText={'First Name'}
              onChange={(event) => this.setState({...this.state, firstName: event.target.value})}
              fullWidth={true}
            />
            <TextField
              id={'create_user_last_name'}
              defaultValue={currentUser && currentUser.user_metadata ? currentUser.user_metadata.lastName : ''}
              floatingLabelText={'Last Name'}
              onChange={(event) => this.setState({...this.state, lastName: event.target.value})}
              fullWidth={true}
            />
            <TextField
              id={'create_user_email'}
              defaultValue={currentUser ? currentUser.email : ''}
              floatingLabelText={'Email'}
              onChange={(event) => this.setState({...this.state, email: event.target.value})}
              fullWidth={true}
            />
            <TextField
              id={'create_user_program_level'}
              defaultValue={currentUser && currentUser.user_metadata ? currentUser.user_metadata.programLevel : ''}
              floatingLabelText={'Program Level (Gold, Silver, or Bronze)'}
              onChange={(event) => this.setState({...this.state, programLevel: event.target.value.toUpperCase()})}
              fullWidth={true}
            />
            {blockUserButton}
            <RaisedButton
              label='Cancel'
              className={css(localStyles.createButton)}
              secondary={true}
              onTouchTap={() => {
                this._resetAndReturnToUsersList(dispatch)
              }}
            />
            <RaisedButton
              label={saveUserLabel}
              className={css(localStyles.createButton)}
              primary={true}
              onTouchTap={ () => {
                console.log('validating create user inputs')
                if (!this._validateForm()) {
                  console.log('saving new user')
                  console.log(`new user - first: ${this.state.firstName} last: ${this.state.lastName} ` +
                    `email: ${this.state.email} programLevel: ${this.state.programLevel}`)
                  if (currentUser) { // editing a current user
                    dispatch(updateUser(this._getUserToUpdate(currentUser), currentUser.user_id, () => {
                      this._resetAndReturnToUsersList(dispatch)
                    }))
                  } else { // new user
                    dispatch(createUser(this._getUserToSave(), () => {
                      this._resetAndReturnToUsersList(dispatch)
                    }))
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

UserPage.propTypes = {
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
    left: 435
  }
})

export default provideHooks(redial)(connect(mapStateToProps)(UserPage))
