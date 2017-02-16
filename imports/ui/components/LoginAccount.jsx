import React from 'react';
//import verfification from '../../server/send-verification'
/*
 To delete accounts,
 1) meteor mongo
 2) db.users.remove({_id:db.users.find()[0]._id})

 */


export default class LoginAccount extends React.Component {
  constructor(props) {
    super(props);
    this.state = {username: '', email: '', password:''};

    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleUsernameChange(event) {
    this.setState({username: event.target.value});
  }

  handleEmailChange(event) {
    this.setState({email: event.target.value});
  }

  handlePasswordChange(event) {
    this.setState({password: event.target.value});
  }
  handleSubmit(event) {
    Meteor.loginWithPassword(this.state.email, this.state.password, ( error ) => {
      if ( error ) {
        console.log('error in logging in user');
        Bert.alert( error.reason, 'danger' );
        console.log(error.reason);
      } else {
        console.log(Meteor.user().emails[0].verified);
        if (Meteor.user().emails[0].verified) {
          Bert.alert('Welcome back, ' + Meteor.user().username + '!', 'success' );
        } else {
          Bert.alert('Email is not verified, please check email, ' + Meteor.user().emails[0] , 'danger' );
          Meteor.logout();
        }
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
          Log in below
        </label>
        <label>
          Email:
          <input type="text" value={this.state.value} onChange={this.handleEmailChange} />
        </label>
        <label>
          Password:
          <input type="password" value={this.state.value} onChange={this.handlePasswordChange} />
        </label>
        <input type="submit" value="Login" />
      </form>
    );
  }
}
