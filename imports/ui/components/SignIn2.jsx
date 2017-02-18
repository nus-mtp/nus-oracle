import React from 'react';
//import verfification from '../../server/send-verification'



export default class SignIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {email: '', password:''};

    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleEmailChange(event) {
    this.setState({email: event.target.value});
  }

  handlePasswordChange(event) {
    this.setState({password: event.target.value});
  }
  handleSubmit(event) {
    let user = {
      email: this.state.email,
      password: this.state.password
    }
    Accounts.createUser( user, ( error ) => {
      if ( error ) {
        console.log('error in creating user');
        alert( error.reason, 'danger' );
      } else {
        Meteor.call( 'sendVerificationLink', ( error, response ) => {
          if ( error ) {
            console.log('verification error');
            alert( error.reason, 'danger' );
          } else {
            alert( 'Welcome!', 'success' );
          }
        });
      }
    });
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
          New Email:
          <input type="text" value={this.state.value} onChange={this.handleEmailChange} />
        </label>
        <label>
          Password:
          <input type="password" value={this.state.value} onChange={this.handlePasswordChange} />
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}
