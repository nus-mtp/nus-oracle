import React from 'react';
import { Meteor } from 'meteor/meteor';

// Import success and error notifications
import { successMsgLoginName,
         errorLockedAccount,
         errorMsgIncorrectPassword,
         errorMsgUnverifiedEmail,
         errorMsgUnrecognizedEmail,
         errorMsgExceededLoginAttempts,
         warningMsgs } from '../AccountAlerts.js';

// Import React components
import Button from '../../common/Button.jsx';
import FormInput from '../../common/FormInput.jsx';

// Import file paths
import { pathToLogin } from '../../../../startup/client/Router.jsx';
import { pathToAcadDetailsSetup } from '../../../../startup/client/Router.jsx';
import { pathToUserDashboard } from '../../../../startup/client/Router.jsx';

const MAX_PASSWORD_TRIES = 5;

export default class LoginAccount extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      passwordErr: 0
    };
  }

  handleEmailChange(input) {
    this.setState({email: input});
  }

  handlePasswordChange(input) {
    this.setState({password: input});
  }

  handleClickOnSignUp() {
    this.props.onSignUp();
  }

  handleClickOnForgetPassword() {
    this.props.onForgetPassword();
  }

  handleForgetPassword() {
    let email = this.state.email;

    Accounts.forgotPassword({
      email: email
    }, (error) => {
      if (error) {
        Bert.alert(error.reason, 'danger');
      } else {
        Bert.alert(errorMsgExceededLoginAttempts(email), 'danger');
      }
    });

    let user = Accounts.users.findOne({ username: email });
    if (user) { // In case the user can't be found
      //Meteor.call('resetpassword', user._id);
    } else {
      Bert.alert(errorMsgUnrecognizedEmail(email), 'danger');
    }
  }

  handleSubmit() {
    this.props.onSubmit();
    console.log("loggingin");
    Meteor.loginWithPassword(this.state.email, this.state.password, (error) => {
      if (error) { // Login error
        if (error.reason == 'Incorrect password') {
          // Incorrect password entered by user
          let numPasswordTries = this.state.passwordErr + 1;
          this.setState({ passwordErr: numPasswordTries });
          Bert.alert(errorMsgIncorrectPassword(numPasswordTries), 'danger');
          if (numPasswordTries >= 5) {
            this.handleForgetPassword();
          }
        } else if (error.reason == 'User not found') {
          Bert.alert(errorMsgUnrecognizedEmail(this.state.email), 'danger');
        } else { // Incorrect email, etc.
          Bert.alert(error.reason, 'danger');
        }
        this.props.onSuccess();
      } else {
        this.setState({ passwordErr: 0 }); // Reset incorrect attempts counter

        let isVerified = Meteor.user().emails[0].verified;

        if (Meteor.user().profile.accountLock) {
          Bert.alert(errorLockedAccount(Meteor.user().username), 'danger');
          FlowRouter.go(pathToLogin);
          Meteor.logout();
          this.props.onSuccess();
        } else if (isVerified) {
          // Log only a valid and verified user in
          if (!Meteor.user().profile.hasSetup) {
            // Newly-signed-up users
            Bert.alert(warningMsgs.WARNING_SETUP, 'warning');
            FlowRouter.go(pathToAcadDetailsSetup);
          } else {
            //Actual redirect to dashbaord
            Bert.alert(successMsgLoginName(Meteor.user().username), 'success');
            FlowRouter.go(pathToUserDashboard);
          }

        } else {
          // Refresh login page if this email isn't verified yet
          Bert.alert(errorMsgUnverifiedEmail(Meteor.user().username), 'danger');
          FlowRouter.go(pathToLogin);
          Meteor.logout();
          this.props.onSuccess();
        }
      }
    });

  }

  render() {
    return (
      <div>
        <div className="gallery-picture">
          <img id="login-logo"
               src="./images/logo/nusOracle-logo-colour.png"
               alt="NUS_Oracle_logo" />
        </div>

        <div className="col-md-6 blockui-element-container-default"
             style={{float: 'none', margin: '3.5em auto'}}>
          <div className="form-group" style={{textAlign: 'center'}}>

            <FormInput placeholder="NUS E-mail"
                       onChange={this.handleEmailChange.bind(this)} />

            <FormInput type="password" placeholder="Password"
                       onChange={this.handlePasswordChange.bind(this)} />

            <Button buttonClass="btn btn-rounded btn-inline btn-warning-outline"
                    buttonText="LOGIN"
                    onButtonClick={this.handleSubmit.bind(this)} />

            <a className="dropdown-item"
               onClick={this.handleClickOnSignUp.bind(this)}>
              Create account
            </a>

            <a className="dropdown-item"
               onClick={this.handleClickOnForgetPassword.bind(this)}>
              Forgot Password?
            </a>


          </div>
        </div>
      </div>
    );
  }
}
