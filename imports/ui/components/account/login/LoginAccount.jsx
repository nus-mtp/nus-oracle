import React from 'react';
import { Meteor } from 'meteor/meteor';

// Import success and error notifications
import { successMsgs } from './AccountAlerts.js'
import { errorMsgs } from './AccountAlerts.js'
import { successMsgLoginName } from './AccountAlerts.js'
import { errorMsgIncorrectPassword } from './AccountAlerts.js'
import { errorMsgUnverifiedEmail } from './AccountAlerts.js'
import { errorMsgUnrecognizedEmail } from './AccountAlerts.js'
import { errorMsgExceededLoginAttempts } from './AccountAlerts.js'

// Import React components
import Button from '../../common/Button.jsx';

// Import file paths
import { pathToLogin } from '../../../../startup/client/Router.jsx';
import { pathToSignUp } from '../../../../startup/client/Router.jsx';
import { pathToAcadDetailsSetup } from '../../../../startup/client/Router.jsx';
import { pathToUserDashboard } from '../../../../startup/client/Router.jsx';

//import verfification from '../../server/send-verification'
/*
 To delete accounts,
 1) meteor mongo
 2) db.users.remove({_id:db.users.find()[0]._id})

 */

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

  handleEmailChange(event) {
    this.setState({email: event.target.value});
  }

  handlePasswordChange(event) {
    this.setState({password: event.target.value});
  }

  handleSignUp() {
    this.props.onHandleSignUp();
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
      Meteor.call('resetpassword', user._id);
    } else {
      Bert.alert(errorMsgUnrecognizedEmail(email), 'danger');
    }
  }

  handleSubmit() {
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
        } else { // Incorrect email, etc.
          Bert.alert(error.reason, 'danger');
        }
      } else {
        this.setState({ passwordErr: 0 }); // Reset incorrect attempts counter

        if (Meteor.user().emails[0].verified && Meteor.user()._id) {
          // Log only a valid and verified user in
          if (Meteor.user().profile.hasSetup) {
            // Return users
            FlowRouter.go(pathToUserDashboard);
          } else {
            // Newly-signed-up users
            FlowRouter.go(pathToAcadDetailsSetup);
          }
          Bert.alert(successMsgLoginName(Meteor.user().username), 'success');
        } else {
          // Refresh login page if this email isn't verified yet
          Bert.alert(errorMsgUnverifiedEmail(Meteor.user().emails[0]), 'danger' );
          FlowRouter.go(pathToLogin);
          Meteor.logout();
        }
      }
    });
  }

  render() {
    return (
      <div>
        <div className="gallery-picture">
          <img style={{height: '100%', width: '100%', marginTop: '2em'}}
               src="./logo/NUS_Oracle_logo.jpg" alt="NUS_Oracle_logo" />
        </div>

        <div className="col-md-6 blockui-element-container-default"
             style={{float: 'none', margin: '3.5em auto'}}>

          <div className="form-group" style={{textAlign: 'center'}}>
            <div className="form-group">
              <input className="form-control" type="text"
                placeholder="NUS E-mail" value={this.state.value}
                onChange={this.handleEmailChange.bind(this)} />
            </div>

            <div className="form-group">
              <input className="form-control" type="password"
                placeholder="Password" value={this.state.value}
                onChange={this.handlePasswordChange.bind(this)} />
            </div>

            <div className='form-group' style={{margin: '4em'}}>

              <Button buttonClass="btn btn-rounded btn-inline btn-warning-outline"
                      buttonText="LOGIN"
                      onButtonClick={this.handleSubmit.bind(this)} />

              <div className='row'>
                <a className="dropdown-item"
                   onClick={this.handleSignUp.bind(this)}>
                  CREATE ACCOUNT
                </a>
              </div>

              <div className='row'>
                <a className="dropdown-item"
                   onClick={this.handleForgetPassword.bind(this)}>
                  Forgot Password?
                </a>
              </div>

            </div>
          </div>
        </div>
      </div>
    );
  }
}
