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
    Meteor.logout(( error ) => {
      if ( error ) {
        console.log('error in logging out  user');
        Bert.alert( error.reason, 'danger' );
        console.log(error.reason);
      } else {
        Bert.alert( 'Thanks for using NUS Oracle' , 'success' );
        FlowRouter.go('/');
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
