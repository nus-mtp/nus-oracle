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
    this.state = {email: '', password:'', passwordErr: 0};

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
    Meteor.loginWithPassword(this.state.email, this.state.password, ( error ) => {
      if ( error ) { //Log in error
        if (error.reason == 'Incorrect password') { //Incorrect password
          Bert.alert( error.reason, 'danger');
          this.state.passwordErr += 1;
          console.log(this.state.passwordErr);
          if (this.state.passwordErr >=5) {
            this.handleReset();
          }
        } else {//Incorrect email, etc.
          console.log('error in logging in user');
          Bert.alert( error.reason, 'danger' );
          console.log(error.reason);
        }
      } else {
        console.log(Meteor.user().emails[0].verified);
        this.state.passwordErr = 0;
        if (Meteor.user().emails[0].verified) {
          if (!Meteor.user().profile.hasSetup)  {
            FlowRouter.go('/setup');
          } else {
            FlowRouter.go('/userDashboard');
          }
          //FlowRouter.reload();
          Bert.alert('Welcome back, ' + Meteor.user().username + '!', 'success' );
        } else {
          Bert.alert('Email is not verified, please check email, ' + Meteor.user().emails[0] , 'danger' );
          Meteor.logout();
        }
      }
    });
    event.preventDefault();
  }

  handleReset(event) {
    console.log(this.state.email);
    const options ={};
    options.email = this.state.email;
    Accounts.forgotPassword(options, ( error ) => {
      if ( error ) {
        console.log('error in resetting password');
        Bert.alert( error.reason, 'danger' );
        console.log(error.reason);
      } else {
        Bert.alert('Exceeded log in attempt, password has been reset. Please check email to set new password', 'danger' );
      }
    });
    const userId = Accounts.users.findOne({username: this.state.email})._id;
    console.log(userId);
    Meteor.call('resetpassword', userId)
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
