import { Meteor } from 'meteor/meteor';
import React from 'react';

// Import React components
import Button from '../../common/Button.jsx';
import ModalContainer from '../../common/ModalContainer.jsx';
import LoginAccount from './LoginAccount.jsx';
import RegisterAccount from './RegisterAccount.jsx';
import ForgetAccount from './ForgetAccount.jsx';
import LoadingScreen from './LoadingScreen.jsx';
import RestoreAccount from './RestoreAccount.jsx';
import ChangPassword from '../manage-account/ChangePassword.jsx';
import {loadingMsgs} from './../AccountAlerts.js'

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
  handleLoading() {
    this.setState({
      isLoading: true
    });
  }

  handleHideLoading() {
    this.setState({
      isLoading: false
    });
  }
  handleSignUp() {
    this.setState({
      loadMessage: loadingMsgs.LOAD_REGISTERING,
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
      loadMessage: loadingMsgs.LOAD_FORGET,
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
      loadMessage: loadingMsgs.LOAD_CHANGE,
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
      isRestoreAccount: false,
      isLoading: false,
      loadMessage: loadingMsgs.LOAD_LOGGING_IN
    });
  }

  render() {
    return (
      <div className="container-fluid" style={{width: "70%"}}>
        <div className="page-center page-center-in">
          {this.state.isLoggingIn ?
            <LoginAccount onForgetPassword={this.handleForgetPassword.bind(this)}
                          onSignUp={this.handleSignUp.bind(this)}
                          onSubmit={this.handleLoading.bind(this)}
                          onSuccess={this.handleCloseAllWindows.bind(this)}/> : null}
          {this.state.isSigningUp ?
            <ModalContainer onHidden={this.handleHideSignUp.bind(this)}
                            content={<RegisterAccount onSuccess={this.handleCloseAllWindows.bind(this)}
                            onLoadComplete = {this.handleHideLoading.bind(this)}
                            onSubmit={this.handleLoading.bind(this)}/>} /> : null}
          {this.state.isForgetPassword ?
            <ModalContainer onHidden={this.handleHideForgetPassword.bind(this)}
                            content={<ForgetAccount
                            onSuccess={this.handleCloseAllWindows.bind(this)}
                            onLoadComplete = {this.handleHideLoading.bind(this)}
                            onSubmit={this.handleLoading.bind(this)}/>} /> : null}
          {/* Launches Modal only of the query param in URL matches */}
          {FlowRouter.getQueryParam("acc")=="reset-password" ?
            <ModalContainer onHidden={this.handleHideRestoreAccount.bind(this)}
                            content={<RestoreAccount onSuccess={this.handleCloseAllWindows.bind(this)}
                            onLoadComplete = {this.handleHideLoading.bind(this)}
                            onSubmit={this.handleLoading.bind(this)} />} /> : null}
          {this.state.isLoading ?
            <ModalContainer onHidden={this.handleHideLoading.bind(this)}
                            content={<LoadingScreen onSuccess={this.handleCloseAllWindows.bind(this)}
                            loadText= {this.state.loadMessage}/>} /> : null}
        </div>
      </div>
    );
  }
}
