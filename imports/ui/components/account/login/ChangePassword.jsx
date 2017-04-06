import { Meteor } from 'meteor/meteor';
import React from 'react';

// Import success and error notifications
import { successMsgs } from '../AccountAlerts.js';
import { errorMsgs } from '../AccountAlerts.js';

// Import React components
import Button from '../../common/Button.jsx';
import FormInputErrorBox from '../../common/FormInputErrorBox.jsx';

import { Accounts } from 'meteor/accounts-base';

export default class ChangePassword extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      oldPassword: '',
      newPassword: '',
      newConfirmPassword: '',
      passwordErrorObj: null,
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
    // include check for verifier
    Meteor.call('nusPasswordVerifier',
                this.state.newPassword,
                this.state.newConfirmPassword,
                (passwordErrorObj, isValidPassword) => {
      if (isValidPassword) {
        // Spin loading bar while checking if old password and new password are valid
        this.props.onSubmit();

        // Valid password entered, let Meteor Accounts handle the password change
        Accounts.changePassword(this.state.oldPassword, this.state.newPassword, (error) => {
          if (error) {
            // Variety of Meteor Account errors when signing up
            Bert.alert(error.reason, 'danger');
            this.props.onLoadComplete();
          } else {
            Bert.alert(successMsgs.SUCCESS_PASSWORD_CHANGED, 'success');
            this.props.onSuccess();
          }
        });
      } else {
        this.setState({ passwordErrorObj: passwordErrorObj.error });
      }
    });
  }

  /**
   * Renderer for password input validation
   *
   * @returns {Node} FormInputErrorBox component with the relevant error messages
   *                 passed into it
   */
  renderPasswordErrorBlock() {
    let errorObj = this.state.passwordErrorObj;
    let passwordErrorMsgs = [];

    if (errorObj.hasNoLetter) {
      passwordErrorMsgs.push(errorMsgs.ERR_PASSWORDS_HAS_NO_LETTER);
    }
    if (errorObj.hasNoNumeric) {
      passwordErrorMsgs.push(errorMsgs.ERR_PASSWORDS_HAS_NO_NUMERIC);
    }
    if (errorObj.isNotMixCase) {
      passwordErrorMsgs.push(errorMsgs.ERR_PASSWORDS_IS_NOT_MIX_CASE);
    }
    if (errorObj.isLessThanSixChars) {
      passwordErrorMsgs.push(errorMsgs.ERR_PASSWORDS_TOO_SHORT);
    }
    if (errorObj.hasWhitespace) {
      passwordErrorMsgs.push(errorMsgs.ERR_PASSWORDS_HAS_WHITESPACE);
    }
    if (errorObj.passwordsNotMatch) {
      passwordErrorMsgs.push(errorMsgs.ERR_PASSWORDS_NOT_MATCH);
    }

    return (
      <FormInputErrorBox
        title="Password Errors" errorMsgList={passwordErrorMsgs} />
    );
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

            {/* Password Input Validation */}
            {this.state.passwordErrorObj ? this.renderPasswordErrorBlock() : null}

            <div className="form-group">
              <input className="form-control" type="password"
                placeholder="New Password" value={this.state.value}
                onChange={this.handlenewPasswordChange.bind(this)} />
            </div>

            <div className="form-group">
              <input className="form-control" type="password"
                placeholder="Re-enter New Password" value={this.state.value}
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
