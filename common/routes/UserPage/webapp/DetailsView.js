/* @flow weak */

import React from "react";
import Dialog from "material-ui/Dialog";
import FlatButton from "material-ui/FlatButton";
import TextField from "material-ui/TextField";
import * as DetailsState from "../redux/DetailsState";

export default class UserDetailsView extends React.Component {
  constructor(props: any, context) {
    super(props, context);
    this.state = {
      errors: [],
      detailViewIsOpen: false,
      isNewUser: false
    };
  }

  _handleOpen = (isNewUser) => {
    this.setState({
      errors: [],
      detailViewIsOpen: true,
      isNewUser
    });
  };

  _handleOnTouchTapCancel = () => {
    this.setState({
      detailViewIsOpen: false
    });
  };

  _handleOnTouchTapOk = () => {
    if (!this._validateForm()) {
      return;
    }

    let user = {
      connection: 'Username-Password-Authentication',
      email: this.refs.email,
      password: 'PasswordTheyWillHaveToChange',
      user_metadata: {
        firstName: this.refs.firstName,
        lastName: this.refs.lastName,
        programLevel: this.refs.programLevel
      }
    };

    if (this.state.isNewUser) {
      this.props.dispatch(DetailsState.createUserRequest(user));
    } else {
      let auth0Id = this.props.user.auth0Id;
      this.props.dispatch(DetailsState.updateUserRequest({auth0Id, ...user}));
    }

    this.setState({
      Dialog_IsOpen: false
    });
  };

  _validateForm = () => {
    if (this.props.user) {
      this.setState({errors: []});
      if (this.refs.firstName && this.refs.firstName.length == 0) {
        this.setState({errors: this.state.errors.push("Please enter a first name.")});
      }

      if (this.refs.lastName && this.refs.lastName.length == 0) {
        this.setState({errors: this.state.errors.push("Please enter a last name.")});
      }

      if (this.refs.email && this._validEmail(this.refs.email)) {
        this.setState({errors: this.state.errors.push("Please enter a email.")});
      }

      if (this.refs.programLevel
        && ["GOLD", "SILVER", "BRONZE"].includes(this.refs.programLevel.toUpperCase())) {
        this.setState({errors: this.state.errors.push("Please enter a valid program level (GOLD, SILVER, or BRONZE.")});
      }
    }

    return this.state.errors.length > 0;
  };

  _validEmail = (email) => {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  };

  _getFusionUsersName = () => {
    if (this.props.user && this.props.user.firstName && this.props.user.lastName) {
      return this.props.user.firstName + ' ' + this.props.user.lastName;
    } else {
      return 'New User';
    }
  };

  render() {
    return (
      <div>
        <Dialog
          open={ this.state.Dialog_IsOpen }
          title={this._getFusionUsersName()}
          actions={ [
            <FlatButton key="Cancel" label="Cancel" onTouchTap={ this._handleOnTouchTapCancel } />,
            <FlatButton key="OK" label="OK" primary={true} onTouchTap={ this._handleOnTouchTapOk } />,
          ] }
        >
          <TextField
            ref="firstName"
            defaultValue={ this.props.user ? this.props.user.firstName : '' }
            floatingLabelText="First Name"
            fullWidth={ true }
          />
          <TextField
            ref="lastName"
            defaultValue={ this.props.user ? this.props.user.lastName : '' }
            floatingLabelText="Last Name"
            fullWidth={ true }
          />
          <TextField
            ref="email"
            defaultValue={ this.props.user ? this.props.user.email : '' }
            floatingLabelText="Email"
            fullWidth={ true }
          />
          <TextField
            ref="programLevel"
            defaultValue={ this.props.user ? this.props.user.programLevel : '' }
            floatingLabelText="Program Level"
            fullWidth={ true }
          />
        </Dialog>
      </div>
    );
  }
}

UserDetailsView.propTypes = {
  user: React.PropTypes.object.isRequired,
  dispatch: React.PropTypes.func.isRequired
};
