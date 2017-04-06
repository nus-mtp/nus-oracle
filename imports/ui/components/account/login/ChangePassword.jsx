import { Meteor } from 'meteor/meteor';
import React from 'react';

// Import success and error notifications
import { successMsgs } from '../AccountAlerts.js';
import { errorMsgs } from '../AccountAlerts.js';

// Import React components
import Button from '../../common/Button.jsx';
import FormInput from '../../common/FormInput.jsx';
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

  //=============================================
  // EVENT HANDLERS
  //=============================================

  handleoldPasswordChange(input) {
    this.setState({oldPassword: input});
  }

  handlenewPasswordChange(input) {
    this.setState({newPassword: input});
  }

  handlenewConfirmPasswordChange(input) {
    this.setState({newConfirmPassword: input});
  }

  handleSubmit(event) {
    // Prevent browser from refreshing the page, so that we can still see input validation alerts
    event.preventDefault();

    // include check for verifier
    Meteor.call('nusPasswordVerifier',
                this.state.newPassword,
                this.state.newConfirmPassword,
                (passwordErrorObj, isValidPassword) => {
      if (isValidPassword) {
        this.setState({ passwordErrorObj: null });

        // Spin loading bar while checking if old password and new password are valid
        this.props.onSubmit();

        // Valid password entered, let Meteor Accounts handle the password change
        Accounts.changePassword(this.state.oldPassword, this.state.newPassword, (error) => {
          if (error) {
            // Variety of Meteor Account errors when signing up
            if (error.reason == "Match failed") {
              Bert.alert(errorMsgs.ERR_PASSWORD_NOT_ENTERED, 'danger');
            } else if (error.reason == "Incorrect password") {
              Bert.alert(errorMsgs.ERR_INCORRECT_OLD_PASSWORD, 'danger');
            } else {
              Bert.alert(error.reason, 'danger');
            }
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
        title="Errors for new passwords" errorMsgList={passwordErrorMsgs} />
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

          <form className="form-group"
                onSubmit={this.handleSubmit.bind(this)}>

            <FormInput type="password" placeholder="Old Password"
                       onChange={this.handleoldPasswordChange.bind(this)} />

            {/* Password Input Validation */}
            {this.state.passwordErrorObj ? this.renderPasswordErrorBlock() : null}

            <FormInput type="password" placeholder="New Password"
                       onChange={this.handlenewPasswordChange.bind(this)} />

            <FormInput type="password" placeholder="Re-enter New Password"
                       onChange={this.handlenewConfirmPasswordChange.bind(this)} />

            {/* Button Confirmation to Change Password */}
            <Button buttonClass="btn btn-rounded btn-inline btn-warning-outline"
                    buttonText="Change Password"
                    onButtonClick={this.handleSubmit.bind(this)} />
          </form>

        </div>
      </div>
    );
  }
}
