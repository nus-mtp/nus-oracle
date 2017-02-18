import React from 'react';
//import verfification from '../../server/send-verification'
/*
 To delete accounts,
 1) meteor mongo
 2) db.users.remove({_id:db.users.find()[0]._id})

 */


export default class RegisterAccount extends React.Component {
  constructor(props) {
    super(props);
    this.state = {username: '', email: '', password:''};
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleEmailChange(event) {
    this.setState({email: event.target.value});
    this.setState({username: event.target.value});
  }

  handlePasswordChange(event) {
    this.setState({password: event.target.value});
  }
  handleSubmit(event) {
    let user = {
      username: this.state.email,
      email: this.state.email,
      password: this.state.password
    }
    Meteor.call('nusEmailVerifier', this.state.email, (error, validEmail) => {
      console.log(validEmail);
      if (validEmail) {
        Accounts.createUser( user, ( error ) => {
          if ( error ) {
            console.log('error in creating user');
            Bert.alert( error.reason, 'danger' );
            console.log(error.reason);
          } else {
            Meteor.call( 'sendVerificationLink', ( error, response ) => {
              if ( error ) {
                console.log('verification error');
                Bert.alert( error.reason, 'danger' );
              } else {
                Bert.alert( 'Welcome! Please check email to verify before logging in', 'success' );
                Meteor.logout();
              }
            });
          }
        });
      } else {
        Bert.alert( "Invalid nus email, please end your email address with \"@u.nus.edu\"", 'danger' );
      }
    });
    //console.log(validEmail);

    event.preventDefault();
  }

  handleTestSubmit(event) {//change this to handleSubmit to debug
    alert('A name was submitted: ' + this.state.email
          + '\n password: ' + this.state.password);
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Register account below
        </label>
        <label>
          New Email:
          <input type="text" value={this.state.value} onChange={this.handleEmailChange} />
        </label>
        <label>
          Password:
          <input type="password" value={this.state.value} onChange={this.handlePasswordChange} />
        </label>
        <input type="submit" value="Register" />
      </form>
    );
  }
}
