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

  //=============================================
  // EVENT HANDLERS
  //=============================================

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

  /**
   * Handles a forget password event.
   * Calls the appropriate method to send user instructions to reset his/her password.
   * Also displays appropriate alert messages correspondingly.
   */
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

  /**
   * Handles a user login event.
   * Calls the appropriate method to verify the user's email and password and
   * then routes the user to the dashboard if he/she is indeed authorized.
   * Also displays appropriate alert messages correspondingly.
   */
  handleSubmit(event) {
    // Prevent browser from refreshing the page, so that we can still see input validation alerts
    event.preventDefault();

    // Handles loading screen
    this.props.onSubmit();

    Meteor.loginWithPassword(this.state.email, this.state.password, (error) => {
      if (error) {
        /* ERROR WITH LOGIN INPUT */
        if (error.reason == 'Incorrect password') {
          // Incorrect password entered by user
          let numPasswordTries = this.state.passwordErr + 1;
          this.setState({ passwordErr: numPasswordTries });
          Bert.alert(errorMsgIncorrectPassword(numPasswordTries), 'danger');
          if (numPasswordTries >= 5) {
            this.handleForgetPassword();
          }
        } else if (error.reason == 'User not found') {
          // User's NUS email isn't in the database, mostly because haven't signed up yet
          Bert.alert(errorMsgUnrecognizedEmail(this.state.email), 'danger');
        } else if (error.reason == 'Match failed') {
          // User submitted empty form, we do nothing and don't raise any alerts
          Bert.alert(warningMsgs.WARNING_INPUT_EMAIL_TO_LOGIN, 'danger');
        } else {
          // Other reasons
          Bert.alert(error.reason, 'danger');
        }
        // Close all alert windows after errors have been handled
        this.props.onSuccess();
      } else {
        /* SUCCESSFUL LOGIN */
        // Reset incorrect attempts counter
        this.setState({ passwordErr: 0 });

        if (Meteor.user().profile.accountLock) {
          // Check if the user's account is locked out for security reasons
          Bert.alert(errorLockedAccount(Meteor.user().username), 'danger');
          FlowRouter.go(pathToLogin);
          Meteor.logout();
          this.props.onSuccess();
        } else if (Meteor.user().emails[0].verified) {
          // Check if email is verified or not
          if (!Meteor.user().profile.hasSetup) {
            // Newly-signed-up users without a setup yet
            Bert.alert(warningMsgs.WARNING_SETUP, 'warning');
            FlowRouter.go(pathToAcadDetailsSetup);
          } else {
            // Verified users who have set up their academic profile --> Directed to dashbaord
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
        {/* Site Logo */}
        <div className="gallery-picture">
          <img id="login-logo"
               src="./images/logo/nusOracle-logo-colour.png"
               alt="NUS_Oracle_logo" />
        </div>

        {/* Login Form */}
        <div className="col-md-6 blockui-element-container-default"
             style={{float: 'none', margin: '3.5em auto'}}>
          <form className="form-group" style={{textAlign: 'center'}}
                onSubmit={this.handleSubmit.bind(this)}>

            <FormInput placeholder="NUS E-mail"
                       className="form-control login-email"
                       onChange={this.handleEmailChange.bind(this)} />

            <FormInput type="password" placeholder="Password"
                       className="form-control login-password"
                       onChange={this.handlePasswordChange.bind(this)} />

            <Button buttonClass="btn btn-rounded btn-inline btn-warning-outline login-button"
                    buttonText="LOGIN"
                    type="submit"
                    onButtonClick={this.handleSubmit.bind(this)} />

            <a className="dropdown-item"
               onClick={this.handleClickOnSignUp.bind(this)}>
              Create account
            </a>

            <a className="dropdown-item"
               onClick={this.handleClickOnForgetPassword.bind(this)}>
              Forgot Password?
            </a>
          </form>
        </div>

      </div>
    );
  }
}
