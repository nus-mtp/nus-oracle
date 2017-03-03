import { Meteor } from 'meteor/meteor';
import React from 'react';

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
    this.state = {username: '', email: '', password:'', repassword:''};
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
  handleSubmit(event) {// to verify registration
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
                  Bert.alert('Welcome! Please log in with your new account below!', 'success');
                  //Bert.alert( 'Welcome! Please check email to verify before logging in', 'success' );
                  Meteor.logout();
                }
              });
            }
          });
        } else {
            Bert.alert("Password does not match re-entered password", 'danger');
        }
      } else {
        Bert.alert("Invalid nus email, please end your email address with \"@u.nus.edu\"", 'danger');
      }
    });
  }


  render() {
    return (
        <div className="container-fluid">
          <div className="box-typical box-typical-padding">
            <h5 className="m-t-lg with-border">
              <strong>SIGN UP</strong>
            </h5>

            Hello

            <button type="button" className="btn btn-rounded"
                    onClick={ this.saveAndContinue.bind(this) } >
              SIGN UP
            </button>
          </div>
        </div>
    );
  }
}
