import { Meteor } from 'meteor/meteor';
import React from 'react';

import { successMsgs } from './AccountAlerts.js';
import { errorMsgs } from './AccountAlerts.js';

//import verfification from '../../server/send-verification'
/*
 To delete accounts,
 1) meteor mongo
 2) db.users.remove({_id:db.users.find()[0]._id})

 */

export default class ForgetAccount extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: ''
    };

    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handleReset = this.handleReset.bind(this);
  }

  handleEmailChange(event) {
    this.setState({email: event.target.value});
  }


  handleReset(event) {
    console.log(this.state.email);
    const options ={};
    options.email = this.state.email;
    Accounts.forgotPassword(options, ( error ) => {
      if ( error ) {
        console.log('error in resetting password');
        Bert.alert( error.reason, 'danger' );
        console.log(error.reason);
      } else {
        Bert.alert('New password sent', 'success' );
      }
    });
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleReset}>
        <label>
          Forgot your email? Fill in your email below
        </label>
        <label>
          Email:
          <input type="text" value={this.state.value} onChange={this.handleEmailChange} />
        </label>
        <input type="submit" value="Reset" />
      </form>
    );
  }
}
