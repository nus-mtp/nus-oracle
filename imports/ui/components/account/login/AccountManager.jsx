import { Meteor } from 'meteor/meteor';
import React from 'react';

// Import React components
import Button from '../../common/Button.jsx';
import ModalContainer from '../../common/ModalContainer.jsx';
import LoginAccount from './LoginAccount.jsx';
import RegisterAccount from './RegisterAccount.jsx';
import ForgetAccount from './ForgetAccount.jsx';
import RestoreAccount from './RestoreAccount.jsx';
import ChangPassword from '../manage-account/ChangePassword.jsx';

export default class AccountManager extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggingIn: true,
      isSigningUp: false,
      isForgetPassword: false,
      isRestoreAccount: false
    }
  }

  handleSignUp() {
    this.setState({
      isSigningUp: true
    });
  }

  handleHideSignUp() {
    this.setState({
      isSigningUp: false
    });
  }

  handleForgetPassword() {
    this.setState({
      isForgetPassword: true
    });
  }

  handleHideForgetPassword() {
    this.setState({
      isForgetPassword: false
    });
  }
  handleRestoreAccount() {
    this.setState({
      isRestoreAccount: true
    });
  }

  handleHideRestoreAccount() {
    this.setState({
      isRestoreAccount: false
    });
  }
  handleCloseAllWindows() {
    this.setState({
      isSigningUp: false,
      isForgetPassword: false,
      isRestoreAccount: false
    });
  }

  render() {
    return (
      <div className="container-fluid" style={{width: "70%"}}>
        <div className="page-center page-center-in">
          {this.state.isLoggingIn ?
            <LoginAccount onForgetPassword={this.handleForgetPassword.bind(this)}
                          onSignUp={this.handleSignUp.bind(this)} /> : null}
          {this.state.isSigningUp ?
            <ModalContainer onHidden={this.handleHideSignUp.bind(this)}
                            content={<RegisterAccount onSuccess={this.handleCloseAllWindows.bind(this)}/>} /> : null}
          {this.state.isForgetPassword ?
            <ModalContainer onHidden={this.handleHideForgetPassword.bind(this)}
                            content={<ForgetAccount onSuccess={this.handleCloseAllWindows.bind(this)} />} /> : null}

          {/* Launches Modal only of the query param in URL matches */}
          {FlowRouter.getQueryParam("acc")=="reset-password" ?
            <ModalContainer onHidden={this.handleHideRestoreAccount.bind(this)}
                            content={<RestoreAccount onSuccess={this.handleCloseAllWindows.bind(this)} />} /> : null}
        </div>
      </div>
    );
  }
}
