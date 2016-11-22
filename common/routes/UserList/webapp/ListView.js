/* @flow weak */

import React from "react";
import Relay from "react-relay";
import IconButton from "material-ui/IconButton";
import IconMenu from "material-ui/IconMenu";
import {List, ListItem} from "material-ui/List";
import MenuItem from "material-ui/MenuItem";
import NavigationMoreVert from "material-ui/svg-icons/navigation/more-vert";
import UserDetailsView from "./DetailsView";
import * as UsersListState from "../redux/ListState";
import dispatch from "redux";

class UsersListView extends React.Component {
  _handleOnItemTouchTap = (e, item) => {
    switch (item.ref) {
      case 'edit':
        this.refs.userDetails._handleOpen(false);
        break;
      case 'updateStatus':
        this._updateUserStatus(item.value, true); // TODO: FIGURE ME OUT
        break;
      default:
        break;
    }
  };

  _updateUserStatus(auth0Id, status) {
    dispatch(UsersListState.updateUserStatusRequest(auth0Id, status));
  }

  renderDetails() {
    if (this.props.users) {
      return this.props.users.map(user => {
          let button = (
            <IconMenu
              iconButtonElement={<IconButton><NavigationMoreVert/></IconButton>}
              onItemTouchTap={ this._handleOnItemTouchTap }>
              <MenuItem ref="edit" value={ 0 }>Edit</MenuItem>
              <MenuItem ref="updateStatus"
                        value={ user.auth0Id }>Activate/Deactivate</MenuItem> // TODO: activate/deactivate
            </IconMenu>
          );
          return (
            <div>
              <ListItem
                primaryText={ user.firstName + ' ' + user.lastName }
                rightIconButton={ button }/>
              <UserDetailsView
                ref="userDetails"
                user={user}/>
            </div>
          );
        }
      );
    }
    return null;
  }

  render() {
    return (
      <div>
        <p>texthere blah blah blah</p>
        {/*<List>*/}
          {/*{ this.renderDetails() }*/}
        {/*</List>*/}
      </div>
    );
  }
}

UsersListView.propTypes = {
  users: React.PropTypes.array
};

export default Relay.createContainer(UsersListState, {fragments: {}});
