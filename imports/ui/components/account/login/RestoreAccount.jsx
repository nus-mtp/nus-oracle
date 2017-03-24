import { Meteor } from 'meteor/meteor';
import React from 'react';

// Import success and error notifications
import { successMsgs } from '../AccountAlerts.js';
import { errorMsgs } from '../AccountAlerts.js';

// Import React components
import Button from '../../common/Button.jsx';

import { Accounts } from 'meteor/accounts-base';

//import verfification from '../../server/send-verification'
/*
 To delete accounts,
 1) meteor mongo
 2) db.users.remove({_id:db.users.find()[0]._id})
 */

export default class RestoreAccount extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      token: '',
      password: '',
      repassword: ''
    };
  }

  handlePasswordChange(event) {
    this.setState({password: event.target.value});
  }
  handleRePasswordChange(event) {
    this.setState({repassword: event.target.value});
  }
  handleTokenChange(event) {
    this.setState({token: event.target.value});
  }

  handleReset() {
    Meteor.call('nusPasswordVerifier',
                this.state.password,
                this.state.repassword,
                (errorObj, isValidPassword) => {
      if (!isValidPassword) {
        console.log(errorObj.error);
        Bert.alert(errorObj.error, 'danger');
      } else {

        Accounts.resetPassword(this.state.token, this.state.password, error => {
          if (error) {
            Bert.alert(error.reason, 'danger');
          } else {
            Meteor.call('unlockAcc');
            console.log("UNLOCKED");
            Bert.alert(successMsgs.SUCCESS_PASSWORD_CHANGED, 'success');
            this.props.onSuccess();
          }
        });
      }
    });
  }
  render() {
    return (
      <div className="container-fluid">
        <div className="box-typical box-typical-padding" style={{textAlign: 'center'}}>
          <h5 className="m-t-lg">
            <p>Received token from your email?</p>
            <p><strong>Fill in your token and new password below:</strong></p>
          </h5>

          <div className="form-group">
            <div className="form-group">
              <input className="form-control" type="text"
                placeholder="Token" value={this.state.value}
                onChange={this.handleTokenChange.bind(this)} />
            </div>
            <div className="form-group">
              <input className="form-control" type="password"
                placeholder="Password" value={this.state.value}
                onChange={this.handlePasswordChange.bind(this)} />
            </div>
            <div className="form-group">
              <input className="form-control" type="password"
                placeholder="Re-enter Password" value={this.state.value}
                onChange={this.handleRePasswordChange.bind(this)} />
            </div>
            <div className='form-group'>
              <Button buttonClass="btn btn-rounded btn-inline btn-warning-outline"
                      buttonText="RESET PASSWORD"
                      onButtonClick={this.handleReset.bind(this)} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
