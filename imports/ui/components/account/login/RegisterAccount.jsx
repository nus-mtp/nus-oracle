import { Meteor } from 'meteor/meteor';
import React from 'react';

// Import success and error notifications
import {successMsgs,
        errorMsgs } from '../AccountAlerts.js'

// Import React components
import Button from '../../common/Button.jsx';
var Loader = require('../../common/halogen/PulseLoader');
//import verfification from '../../server/send-verification'
/*
 To delete accounts,
 1) meteor mongo
 2) db.users.remove({_id:db.users.find()[0]._id})
 db.users.find({username:"3@gmail.com"}).userId
 */

export default class RegisterAccount extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      email: '',
      password:'',
      repassword:''};
  }


  handleEmailChange(event) {
    this.setState({email: event.target.value});
    this.setState({username: event.target.value});
  }

  handlePasswordChange(event) {
    this.setState({password: event.target.value});
  }

  handleRePasswordChange(event) {
    this.setState({repassword: event.target.value});
  }
  handleCloseLoader() {
    this.props.onLoadComplete();
  }
  handleSubmit() { // to verify registration
    this.props.onSubmit();
    let user = {
      username: this.state.email,
      email: this.state.email,
      password: this.state.password,
      profile:  {
        hasSetup: false,
        accountLock: false
      }
    }


    Meteor.call('nusEmailVerifier', this.state.email, (error, validEmail) => {
      if (validEmail) {
        Meteor.call('nusPasswordVerifier',
                    this.state.password,
                    this.state.repassword,
                    (errorObj, isValidPassword) => {
            if (isValidPassword) {
            Accounts.createUser( user, (error) => {
              if (error) {
                // Variety of errors when signing up
                Bert.alert(error.reason, 'danger');
                this.handleCloseLoader();
              } else {
                Meteor.call('sendVerificationLink', (error, response) => {
                  if (error) {
                    Bert.alert(error.reason, 'danger');
                    this.handleCloseLoader();
                  } else {
                    Bert.alert(successMsgs.SUCCESS_SIGNUP, 'success');
                    Meteor.logout();
                    this.props.onSuccess();
                  }
                });
              }
            });
          } else {
              Bert.alert(errorObj.error, 'danger');
              this.handleCloseLoader();
          }
        });
      } else {
        Bert.alert(errorMsgs.ERR_EMAIL_ENTERED_INVALID, 'danger');
        this.handleCloseLoader();
      }
    });

  }


  render() {
    return (
      <div className="container-fluid">
        <div className="box-typical box-typical-padding"
             style={{textAlign: 'center'}}>

          <h4 className="m-t-lg">
            <strong>Sign Up for NUS Oracle</strong>
          </h4>

          <div className="form-group">
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

            <div className="form-group">
              <input className="form-control" type="password"
                placeholder="Re-enter password" value={this.state.value}
                onChange={this.handleRePasswordChange.bind(this)} />
            </div>
          </div>

          <div className='form-group'>
            <Button buttonClass="btn btn-rounded btn-inline btn-warning-outline"
                    buttonText="SIGN UP"
                    onButtonClick={this.handleSubmit.bind(this)} />
          </div>

        </div>
      </div>
    );
  }
}
