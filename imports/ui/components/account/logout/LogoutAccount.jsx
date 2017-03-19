// Logic and UI for logging out

/*
 To delete accounts,
 1) meteor mongo
 2) db.users.remove({_id:db.users.find()[0]._id})

 */
import React from 'react';
import {successMsgs} from '../AccountAlerts.js'

export const logout = function logoutAccountFromMeteor() {
    Meteor.logout(( error ) => {
       if ( error ) {
         Bert.alert( error.reason, 'danger' );
       } else {
         //Successful log out, redirects to login page
         Bert.alert( successMsgs.SUCCESS_LOGOUT , 'success' );
         FlowRouter.go('/');
       }
     })
 }

export default class LogoutAccount extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  //Handler when Logout is clicked
  handleSubmit(event) {
    logout();
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit} style={this.props.style}>
        <input type="submit" value="Logout"/>
      </form>
    );
  }
}
