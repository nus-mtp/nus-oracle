import { Meteor } from 'meteor/meteor';
import React from 'react';

// Import success and error notifications
import { successMsgs,
         errorMsgs } from '../AccountAlerts.js'

// Import React components
import Button from '../../common/Button.jsx';
import FormInput from '../../common/FormInput.jsx';
import FormInputErrorBox from '../../common/FormInputErrorBox.jsx';

export default class RegisterAccount extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      email: '',
      password:'',
      repassword:'',
      emailErrorObj: null,
      passwordErrorObj: null,
    };
  }

  handleEmailChange(input) {
    this.setState({
      email: input,
      username: input
    });
  }

  handlePasswordChange(input) {
    this.setState({password: input});
  }

  handleRePasswordChange(input) {
    this.setState({repassword: input});
  }

  handleSubmit() { // to verify registration
    let user = {
      username: this.state.email,
      email: this.state.email,
      password: this.state.password,
      profile:  {
        hasSetup: false,
        accountLock: false
      }
    }

    Meteor.call('nusEmailVerifier', this.state.email, (emailErrorObj, validEmail) => {
      if (validEmail) {
        this.setState({ emailErrorObj: null });

        Meteor.call('nusPasswordVerifier',
                    this.state.password,
                    this.state.repassword,
                   (passwordErrorObj, isValidPassword) => {
          if (isValidPassword) {
            this.setState({ passwordErrorObj: null });

            Accounts.createUser( user, (error) => {
              if (error) {
                // Variety of errors when signing up
                Bert.alert(error.reason, 'danger');
              } else {
                Meteor.call('sendVerificationLink', (error, response) => {
                  if (error) {
                    Bert.alert(error.reason, 'danger');
                  } else {
                    Bert.alert(successMsgs.SUCCESS_SIGNUP, 'success');
                    this.props.onSuccess();
                    Meteor.logout();
                  }
                });
              }
            });
          } else {
            // Prepare state for User Feedback for wrong password entered
            this.setState({ passwordErrorObj: passwordErrorObj.error });
          }
        });
      } else {
        // Prepare state for User Feedback for wrong NUS E-mail entered
        this.setState({ emailErrorObj: emailErrorObj.error });
      }
    });
  }

  /**
   * Renderer for NUS-email input validation
   *
   * @returns {Node} FormInputErrorBox component with the relevant error messages
   *                 passed into it
   */
  renderEmailErrorBlock() {
    let errorObj = this.state.emailErrorObj;
    let emailErrorMsgs = [];

    if (errorObj.incorrectDomain) {
      emailErrorMsgs.push(errorMsgs.ERR_EMAIL_ENTERED_INVALID);
    }

    return (
      <FormInputErrorBox
        title="NUS E-mail Errors" errorMsgList={emailErrorMsgs} />
    );
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
        <div className="box-typical box-typical-padding"
             style={{textAlign: 'center'}}>

          <h4 className="m-t-lg">
            <strong>Sign Up for NUS Oracle</strong>
          </h4>

          <div className="form-group">

            {/* If there are errors in the NUS e-mail input validation, we
                to notify user */}
            {this.state.emailErrorObj ? this.renderEmailErrorBlock() : null}

            <FormInput placeholder="NUS E-mail"
                       onChange={this.handleEmailChange.bind(this)} />

            {/* If there are errors in the password input validation, we
                to notify user */}
            {this.state.passwordErrorObj ? this.renderPasswordErrorBlock() : null}

            <FormInput type="password" placeholder="Password"
                       onChange={this.handlePasswordChange.bind(this)} />

            <FormInput type="password" placeholder="Re-enter Password"
                       onChange={this.handleRePasswordChange.bind(this)} />

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
