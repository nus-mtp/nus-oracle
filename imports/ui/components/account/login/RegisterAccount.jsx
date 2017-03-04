import { Meteor } from 'meteor/meteor';
import React from 'react';

// Import success and error notifications
import { successMsgs } from './AccountAlerts.js'
import { errorMsgs } from './AccountAlerts.js'

// Import React components
import Button from '../../common/Button.jsx';

//import verfification from '../../server/send-verification'
/*
 To delete accounts,
 1) meteor mongo
 2) db.users.remove({_id:db.users.find()[0]._id})
 db.users.find({username:"3@gmail.com"}).userId
 */

export default class RegisterAccount extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      email: '',
      password:'',
      repassword:''};
  }

  handleEmailChange(event) {
    this.setState({email: event.target.value});
    this.setState({username: event.target.value});
  }

  handlePasswordChange(event) {
    this.setState({password: event.target.value});
  }

  handleRePasswordChange(event) {
    this.setState({repassword: event.target.value});
  }

  handleSubmit() {// to verify registration
    console.log("CLICKED ON SIGN UP IN RegisterAccount");
    let user = {
      username: this.state.email,
      email: this.state.email,
      password: this.state.password,
      profile:  {
        hasSetup: false,
      }
    }

    Meteor.call('nusEmailVerifier', this.state.email, (error, validEmail) => {
      console.log(validEmail);

      if (validEmail) {
        if (this.state.password == this.state.repassword) {
          Accounts.createUser( user, (error) => {
            if (error) {
              console.log('error in creating user');
              Bert.alert(error.reason, 'danger');
              console.log(error.reason);
            } else {
              Meteor.call('sendVerificationLink', (error, response) => {
                if (error) {
                  console.log('verification error');
                  Bert.alert(error.reason, 'danger');
                } else {
                  Bert.alert(successMsgs.SUCCESS_SIGNUP, 'success');
                  // Bert.alert( 'Welcome! Please check email to verify before logging in', 'success' );
                  Meteor.logout();
                }
              });
            }
          });
        } else {
            Bert.alert(errorMsgs.ERR_PASSWORDS_NOT_MATCH, 'danger');
        }
      } else {
        Bert.alert(errorMsgs.ERR_EMAIL_ENTERED_INVALID, 'danger');
      }
    });
  }


  render() {
    return (
        <div className="container-fluid">
          <div className="box-typical box-typical-padding">
            <h4 className="m-t-lg with-border" style={{textAlign: 'center'}}>
              <strong>SIGN UP</strong>
            </h4>

            <div className="form-group" style={{textAlign: 'center'}}>
              <div className="form-group">
                <input className="form-control" type="text"
                  placeholder="NUS E-mail" value={this.state.value}
                  onChange={this.handleEmailChange.bind(this)} />
              </div>

              <div className="form-group">
                <input className="form-control" type="password"
                  placeholder="Password" value={this.state.value}
                  onChange={this.handlePasswordChange.bind(this)} />
              </div>

              <div className="form-group">
                <input className="form-control" type="password"
                  placeholder="Re-enter Password" value={this.state.value}
                  onChange={this.handleRePasswordChange.bind(this)} />
              </div>
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
