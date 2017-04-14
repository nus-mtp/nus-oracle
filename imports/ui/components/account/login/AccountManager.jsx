import { Meteor } from 'meteor/meteor';
import React from 'react';

// Import React components
import Button from '../../common/Button.jsx';
import ModalContainer from '../../common/ModalContainer.jsx';
import LoadingScreen from './LoadingScreen.jsx';
import LoginAccount from './LoginAccount.jsx';
import RegisterAccount from './RegisterAccount.jsx';
import ForgetAccount from './ForgetAccount.jsx';
import RestoreAccount from './RestoreAccount.jsx';

// Import constants
import { loadingMsgs } from './../AccountAlerts.js'

export default class AccountManager extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggingIn: true,
      isSigningUp: false,
      isForgetPassword: false,
      isRestoreAccount: false,
      isLoading: false,
      loadMessage: loadingMsgs.LOAD_LOGGING_IN
    }
  }

  //======================================================
  // EVENT HANDLERS FOR OPENING AND CLOSING MODAL WINDOWS
  //======================================================
  handleLoading() {
    this.setState({ isLoading: true });
  }

  handleHideLoading() {
    this.setState({ isLoading: false });
  }

  handleSignUp() {
    this.setState({
      loadMessage: loadingMsgs.LOAD_REGISTERING,
      isSigningUp: true
    });
  }

  handleHideSignUp() {
    this.setState({
      loadMessage: loadingMsgs.LOAD_LOGGING_IN,
      isSigningUp: false
    });
  }

  handleForgetPassword() {
    this.setState({
      loadMessage: loadingMsgs.LOAD_FORGET,
      isForgetPassword: true
    });
  }

  handleHideForgetPassword() {
    this.setState({
      loadMessage: loadingMsgs.LOAD_LOGGING_IN,
      isForgetPassword: false
    });
  }
  handleRestoreAccount() {
    this.setState({
      loadMessage: loadingMsgs.LOAD_CHANGE,
      isRestoreAccount: true
    });
  }

  handleHideRestoreAccount() {
    this.setState({
      loadMessage: loadingMsgs.LOAD_LOGGING_IN,
      isRestoreAccount: false
    });
  }

  handleCloseAllWindows() {
    this.setState({
      isSigningUp: false,
      isForgetPassword: false,
      isRestoreAccount: false,
      isLoading: false,
      loadMessage: loadingMsgs.LOAD_LOGGING_IN
    });
  }

  render() {
    return (
      <div className="container-fluid">
        <div className="page-center page-center-in">
          {/* Log In Form */}
          {this.state.isLoggingIn ?
            <LoginAccount
              onForgetPassword={this.handleForgetPassword.bind(this)}
              onSignUp={this.handleSignUp.bind(this)}
              onSubmit={this.handleLoading.bind(this)}
              onSuccess={this.handleCloseAllWindows.bind(this)}
            /> :
            null}

          {/* Launch Modal for Sign Up form */}
          {this.state.isSigningUp ?
            <ModalContainer
              onHidden={this.handleHideSignUp.bind(this)}
              content={
                <RegisterAccount
                  onSuccess={this.handleCloseAllWindows.bind(this)}
                  onLoadComplete = {this.handleHideLoading.bind(this)}
                  onSubmit={this.handleLoading.bind(this)}
                />}
            /> :
            null}

          {/* Launch Modal for Forget Password form */}
          {this.state.isForgetPassword ?
            <ModalContainer
              onHidden={this.handleHideForgetPassword.bind(this)}
              content={
                <ForgetAccount
                  onSuccess={this.handleCloseAllWindows.bind(this)}
                  onLoadComplete = {this.handleHideLoading.bind(this)}
                  onSubmit={this.handleLoading.bind(this)}
                />}
            /> :
            null}

          {/* Forget Password reroute back to site after email verification */}
          {/* Launches Modal only of the query param in URL matches */}
          {FlowRouter.getQueryParam("acc")=="reset-password" ?
            <ModalContainer
              onHidden={this.handleHideRestoreAccount.bind(this)}
              content={
                <RestoreAccount
                  onSuccess={this.handleCloseAllWindows.bind(this)}
                  onLoadComplete = {this.handleHideLoading.bind(this)}
                  onSubmit={this.handleLoading.bind(this)}
                />}
            /> :
            null}

          {/* Launching Modal for Loading screen */}
          {this.state.isLoading ?
            <ModalContainer
              disableHide={true}
              content={
                <LoadingScreen
                  onSuccess={this.handleCloseAllWindows.bind(this)}
                  loadText= {this.state.loadMessage}
                />}
            /> :
            null}
        </div>
      </div>
    );
  }
}
