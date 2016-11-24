import {provideHooks} from "redial";
import React, {PropTypes} from "react";
import {connect} from "react-redux";
import {loadUser, createUser, updateUser} from "../actions";
import {StyleSheet, css} from "aphrodite";
import Helmet from "react-helmet";
import NotFound from "../../../components/NotFound";
import {selectedUser} from "../reducer";
import TextField from "material-ui/TextField";
import RaisedButton from "material-ui/RaisedButton";
import {browserHistory} from "react-router";

const redial = {
  fetch: ({dispatch, params: {slug}}) => {
    if (slug === 'new-user') {

    } else {
      dispatch(loadUser(slug)); // slug is userId
    }
  }
};

const mapStateToProps = state => selectedUser(state)

export class UserPage extends React.Component {
  constructor(props: any, context) {
    super(props, context);
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      programLevel: '',
      errors: []
    };
  }

  _validateForm() {
    let errors = [];
    if (this.state.firstName.length == 0) {
      console.warn('Invalid or empty first name');
      errors.push("Please enter a first name.");
    }

    if (this.state.lastName.length == 0) {
      console.warn('Invalid or empty last name');
      errors.push("Please enter a last name.");
    }

    if (!this._validEmail(this.state.email)) {
      console.warn('Invalid or empty email');
      errors.push("Please enter a valid email.");
    }

    if (!["GOLD", "SILVER", "BRONZE"].includes(this.state.programLevel.toUpperCase())) {
      console.warn('Invalid or empty program level');
      errors.push("Please enter a valid program level (Gold, Silver, or Bronze).");
    }

    this.setState({...this.state, errors});
    return errors.length > 0;
  }

  _validEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

  _getUserToSave() {
    return {
      connection: "Username-Password-Authentication",
      email: this.state.email,
      password: 'PasswordToReset',
      user_metadata: {
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        programLevel: this.state.programLevel
      }
    }
  }

  render() {
    const {currentUser, remainingWorkouts, loading, error, dispatch} = this.props;
    if (!error) {
      let title = currentUser ? currentUser.email : 'Create New User';
      return (
        <div>
          <Helmet title={title}/>
          {loading &&
          <div>
            <h2 className={css(styles.loading)}>Loading....</h2>
          </div>}
          {!loading &&
          <div>
            <h2 className={css(styles.title)}>{title}</h2>

            <div className={css(styles.errorStates)}>
              {this.state.errors.map(e => <strong key={`error-${e}`} className={css(styles.errorMessage)}>{e}<br/></strong>)}
            </div>

            <TextField
              id={'create_user_first_name'}
              defaultValue={ currentUser && currentUser.user_metadata ? currentUser.user_metadata.firstName : '' }
              floatingLabelText={"First Name"}
              onChange={(event) => this.setState({...this.state, firstName: event.target.value})}
              fullWidth={ true }
            />
            <TextField
              id={'create_user_last_name'}
              defaultValue={ currentUser && currentUser.user_metadata ? currentUser.user_metadata.lastName : '' }
              floatingLabelText={"Last Name"}
              onChange={(event) => this.setState({...this.state, lastName: event.target.value})}
              fullWidth={ true }
            />
            <TextField
              id={'create_user_email'}
              defaultValue={ currentUser ? currentUser.email : '' }
              floatingLabelText={"Email"}
              onChange={(event) => this.setState({...this.state, email: event.target.value})}
              fullWidth={ true }
            />
            <TextField
              id={'create_user_program_level'}
              defaultValue={ currentUser && currentUser.user_metadata ? currentUser.user_metadata.programLevel : '' }
              floatingLabelText={"Program Level (Gold, Silver, or Bronze)"}
              onChange={(event) => this.setState({...this.state, programLevel: event.target.value.toUpperCase()})}
              fullWidth={ true }
            />
            <RaisedButton
              label="Cancel"
              className={css(styles.createButton)}
              primary={true}
              onTouchTap={ () => {
                browserHistory.push('/users');
              }}
            />
            <RaisedButton
              label="Create User"
              className={css(styles.createButton)}
              primary={true}
              onTouchTap={ () => {
                console.log('validating create user inputs');
                if (!this._validateForm()) {
                  console.log('saving new user');
                  console.log(`new user - first: ${this.state.firstName} last: ${this.state.lastName} ` +
                   `email: ${this.state.email} programLevel: ${this.state.programLevel}`)
                  if (currentUser) { // editing a current user
                    dispatch(updateUser(this._getUserToSave(), currentUser.user_id));
                  } else { // new user
                    dispatch(createUser(this._getUserToSave()));
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
};

const styles = StyleSheet.create({
  title: {
    fontSize: 28,
    margin: '0 auto',
    color: '#000'
  },
  loading: {
    fontSize: 28,
    margin: '0 auto 1.5rem',
    color: '#b7b7b7'
  },
  createButton: {
    borderWidth: 1,
    position: 'relative',
    marginTop: 15,
    marginRight: 15,
    left: 435,
  },
  errorMessage: {
    fontSize: 16,
    margin: '6 0',
    color: '#e60000'
  },
  errorStates: {
    marginTop: 15
  }
})

export default provideHooks(redial)(connect(mapStateToProps)(UserPage))
