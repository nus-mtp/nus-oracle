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

export default class ForgetAccount extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
    };
  }

  handleEmailChange(input) {
    this.setState({email: input});
  }

  /**
   * Handles a user forget password event.
   * Calls the appropriate method to reset the user's password and locks the
   * user's account when password is confirmed to be reset.
   * Also displays appropriate alert messages.
   */
  handleSendResetEmail(event) {
    // Prevent browser from refreshing the page, so that we can still see
    // input validation alerts
    event.preventDefault();
    this.props.onSubmit();

    Accounts.forgotPassword({
      email: this.state.email
    }, (error) => {
      if (error) {
        if (error.reason == "Must pass options.email") {
          // When the user did not input anything into the email field
          Bert.alert(errorMsgs.ERR_EMAIL_FIELD_EMPTY, 'danger');
        } else if (error.reason == "User not found") {
          // When the user inputs an incorrect NUS email address
          Bert.alert(errorMsgs.ERR_EMAIL_USER_NOT_FOUND, 'danger');
        } else {
          // Variety of errors when entering email
          Bert.alert(error.reason, 'danger');
        }
        this.props.onLoadComplete();
      } else {
        let userName = this.state.email;
        Meteor.call('lockAcc', userName); // Locks user account
        Bert.alert(successMsgs.SUCCESS_NEW_PASSWORD_SENT, 'success');
        this.props.onSuccess();
      }
    });
  }

  render() {
    return (
      <div className="container-fluid">
        <div className="box-typical box-typical-padding" style={{textAlign: 'center'}}>

          <h5 className="m-t-lg">
            <p>Forgot your password?</p>
            <p><strong>Fill in your NUS E-mail below:</strong></p>
          </h5>

          <form className="form-group"
                onSubmit={this.handleSendResetEmail.bind(this)}>

            <FormInput placeholder="NUS E-mail"
                       onChange={this.handleEmailChange.bind(this)} />

            <div className='form-group'>
              <Button buttonClass="btn btn-rounded btn-inline btn-warning-outline"
                      buttonText="SEND EMAIL"
                      type="submit"
                      onButtonClick={this.handleSendResetEmail.bind(this)} />
            </div>

          </form>
        </div>

      </div>
    );
  }
}
