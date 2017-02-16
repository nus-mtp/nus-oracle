import React from 'react';
//import verfification from '../../server/send-verification'
/*
 To delete accounts,
 1) meteor mongo
 2) db.users.remove({_id:db.users.find()[0]._id})

 */


export default class LogoutAccount extends React.Component {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    Meteor.loginWithPassword(this.state.email, this.state.password);
    let user = {
      username: this.state.username,
      email: this.state.email,
      password: this.state.password
    }
    Meteor.loginWithPassword(this.state.email, this.state.password, ( error ) => {
      if ( error ) {
        console.log('error in logging in user');
        Bert.alert( error.reason, 'danger' );
        console.log(error.reason);
      } else {
        Bert.alert( 'Welcome back!' + Meteor.user().username, 'success' );
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
        <input type="submit" value="Logout" />
      </form>
    );
  }
}
