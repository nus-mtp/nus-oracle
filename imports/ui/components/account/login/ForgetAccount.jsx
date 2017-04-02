import { Meteor } from 'meteor/meteor';
import React from 'react';

// Import success and error notifications
import { successMsgs } from '../AccountAlerts.js';
import { errorMsgs } from '../AccountAlerts.js';

// Import React components
import Button from '../../common/Button.jsx';
import FormInput from '../../common/FormInput.jsx';

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

  handleSendResetEmail() {
    Accounts.forgotPassword({
      email: this.state.email
    }, (error) => {
      if (error) {
        // Variety of errors when entering email
        Bert.alert(error.reason, 'danger');
      } else {
        let userName = this.state.email;

        user = Meteor.call('lockAcc', userName);

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

          <div className="form-group">

            <FormInput placeholder="NUS E-mail"
                       onChange={this.handleEmailChange.bind(this)} />

            <div className='form-group'>
              <Button buttonClass="btn btn-rounded btn-inline btn-warning-outline"
                      buttonText="SEND EMAIL"
                      onButtonClick={this.handleSendResetEmail.bind(this)} />
            </div>

          </div>
        </div>

      </div>
    );
  }
}
