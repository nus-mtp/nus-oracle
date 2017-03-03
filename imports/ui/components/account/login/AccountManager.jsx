import { Meteor } from 'meteor/meteor';
import React from 'react';

// Import React components
import Button from '../../common/Button.jsx';
import ModalContainer from '../../common/ModalContainer.jsx';
import LoginAccount from './LoginAccount.jsx';
import RegisterAccount from './RegisterAccount.jsx';
import ForgetAccount from './ForgetAccount.jsx';

export default class AccountManager extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggingIn: true,
      isSigningUp: false,
      isForgetPassword: false
    }
  }

  handleForgetPassword(email) {
    console.log("handleForgetPassword: " + email);

    Accounts.forgotPassword({
      email: email
    }, (error) => {
      if (error) {
        Bert.alert(error.reason, 'danger');
      } else {
        Bert.alert('Exceeded 5 login attempts. Password has been reset. ' +
                   'Please check your email to reset your password.',
                   'danger');
      }
    });
    let userId = Accounts.users.findOne({ username: email })._id;
    Meteor.call('resetpassword', userId)
  }

  render() {
    console.log("isLoggingIn: " + this.state.isLoggingIn);
    console.log("isSigningUp: " + this.state.isSigningUp);
    console.log("isForgetPassword: " + this.state.isForgetPassword);

    return (
      <div className="container-fluid" style={{width: "70%"}}>
        <div className="page-center page-center-in">
          {this.state.isLoggingIn ?
            <LoginAccount onForgetPassword={this.handleForgetPassword.bind(this)}/> : null}
          {this.state.isSigningUp ?
            <ModalContainer content={<RegisterAccount />} /> : null}
          {this.state.isForgetPassword ? <ForgetAccount /> : null}
        </div>
      </div>
    );
  }
}
