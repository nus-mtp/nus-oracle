import { Meteor } from 'meteor/meteor';
import React from 'react';

// Import success and error notifications
import { successMsgs } from '../AccountAlerts.js';
import { errorMsgs } from '../AccountAlerts.js';

// Import React components
import Button from '../../common/Button.jsx';
import FormInput from '../../common/FormInput.jsx';

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

  handlePasswordChange(input) {
    this.setState({password: input});
  }
  handleRePasswordChange(input) {
    this.setState({repassword: input});
  }
  handleTokenChange(input) {
    this.setState({token: input});
  }

  handleReset() {
    this.props.onSubmit();
    Meteor.call('nusPasswordVerifier',
                this.state.password,
                this.state.repassword,
                (errorObj, isValidPassword) => {
      if (!isValidPassword) {
        Bert.alert(errorObj.error, 'danger');
        this.props.onLoadComplete();
      } else {

        Accounts.resetPassword(this.state.token, this.state.password, error => {
          if (error) {
            Bert.alert(error.reason, 'danger');
            this.props.onLoadComplete();
          } else {
            Meteor.call('unlockAcc');
            Bert.alert(successMsgs.SUCCESS_PASSWORD_CHANGED, 'success');
            this.props.onSuccess();
            FlowRouter.reload();
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

            <FormInput placeholder="Token"
                       onChange={this.handleTokenChange.bind(this)} />

            <FormInput type="password" placeholder="Password"
                       onChange={this.handlePasswordChange.bind(this)} />

            <FormInput type="password" placeholder="Re-enter Password"
                       onChange={this.handleRePasswordChange.bind(this)} />

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
