import { Meteor } from 'meteor/meteor';
import React from 'react';

// Import success and error notifications
import { successMsgs } from '../AccountAlerts.js';
import { errorMsgs } from '../AccountAlerts.js';

// Import React components
import Button from '../../common/Button.jsx';

import { Accounts } from 'meteor/accounts-base';

export default class ChangePassword extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      oldPassword: '',
      newPassword: '',
      newConfirmPassword: ''
    };
  }

  handleoldPasswordChange(event) {
    this.setState({oldPassword: event.target.value});
  }

  handlenewPasswordChange(event) {
    this.setState({newPassword: event.target.value});
  }

  handlenewConfirmPasswordChange(event) {
    this.setState({newConfirmPassword: event.target.value});
  }

  handleSubmit() {
    this.props.onSubmit();
    
    // include check for verifier
    Meteor.call('nusPasswordVerifier',
                this.state.newPassword,
                this.state.newConfirmPassword,
                (errorObj, isValidPassword) => {
      if (!isValidPassword) {
        Bert.alert(errorObj.error.reason, 'danger');
      } else {
        if (this.state.newPassword == this.state.newConfirmPassword) {
          Accounts.changePassword(this.state.oldPassword, this.state.newPassword, (error) => {
            if (error) {
              // Variety of errors when signing up
              Bert.alert(error.reason, 'danger');
              this.props.onLoadComplete();
            } else {
              Bert.alert(successMsgs.SUCCESS_PASSWORD_CHANGED, 'success');
              this.props.onSuccess();
            }
          });
        } else {
            Bert.alert(errorMsgs.ERR_PASSWORDS_NOT_MATCH, 'danger');
            this.props.onLoadComplete();
        }
      }
    });
  }

  render() {
    return (
      <div className="container-fluid">
        <div className="box-typical box-typical-padding" style={{textAlign: 'center'}}>

          <h5 className="m-t-lg">
            <p>Changing password</p>
            <p><strong>Fill in your password details below:</strong></p>
          </h5>

          <div className="form-group">
            <div className="form-group">
              <input className="form-control" type="password"
                placeholder="Old Password" value={this.state.value}
                onChange={this.handleoldPasswordChange.bind(this)} />
            </div>


            <div className="form-group">
              <input className="form-control" type="password"
                placeholder="New Password" value={this.state.value}
                onChange={this.handlenewPasswordChange.bind(this)} />
            </div>

            <div className="form-group">
              <input className="form-control" type="password"
                placeholder="New Confirmed Password" value={this.state.value}
                onChange={this.handlenewConfirmPasswordChange.bind(this)} />
            </div>

            <div className='form-group'>
              <Button buttonClass="btn btn-rounded btn-inline btn-warning-outline"
                      buttonText="Change Password"
                      onButtonClick={this.handleSubmit.bind(this)} />
            </div>
          </div>

        </div>
      </div>
    );
  }
}
