import React from 'react';
import { Meteor } from 'meteor/meteor';

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

  resetUserPassword() {
    this.props.onForgetPassword(this.state.email);
  }

  handleSubmit() {
    Meteor.loginWithPassword(this.state.email, this.state.password, (error) => {
      if (error) { //Log in error
        if (error.reason == 'Incorrect password') { //Incorrect password
          Bert.alert( error.reason, 'danger');
          this.state.passwordErr += 1;
          if (this.state.passwordErr >=5) {
            this.resetUserPassword();
          }
        } else {//Incorrect email, etc.
          Bert.alert( error.reason, 'danger' );
        }
      } else {
        this.state.passwordErr = 0;
        if (Meteor.user().emails[0].verified && Meteor.user()._id) {
          if (Meteor.user().profile.hasSetup) {
            FlowRouter.go(pathToUserDashboard);
          } else {
            FlowRouter.go(pathToAcadDetailsSetup);
          }
          Bert.alert('Welcome back, ' + Meteor.user().username + '!', 'success' );
        } else {
          Bert.alert('Email is not verified, please check email, ' + Meteor.user().emails[0] , 'danger' );
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
                <a className="dropdown-item">
                  CREATE ACCOUNT
                </a>
              </div>

              <div className='row'>
                <a className="dropdown-item">
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
