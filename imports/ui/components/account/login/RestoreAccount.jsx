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

/*
 This component loads the ModalContainer to restore the account with the use of token
 accessible via the /#/?acc=reset-password directory
 */

export default class RestoreAccount extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      token: '',
      password: '',
      repassword: '',
      passwordErrorObj: null,
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
                (passwordErrorObj, isValidPassword) => {
      if (!isValidPassword) {
        this.setState({ passwordErrorObj: passwordErrorObj.error });
        this.props.onLoadComplete();
      } else {
        this.setState({ passwordErrorObj: null });
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
            <p>Received token from your email?</p>
            <p><strong>Fill in your token and new password below:</strong></p>
          </h5>

          <div className="form-group">

            <FormInput placeholder="Token"
                       onChange={this.handleTokenChange.bind(this)} />
           {/* Password Input Validation */}
           {this.state.passwordErrorObj ? this.renderPasswordErrorBlock() : null}
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
