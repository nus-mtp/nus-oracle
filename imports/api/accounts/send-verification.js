// for Signin2.jsx
Meteor.methods({
  sendVerificationLink() {
    let userId = Meteor.userId();
    if ( userId ) {
      // immediately make email verfied without email server
      //Meteor.users.update(userId, { $set: { "emails.0.verified" : true } } );
      return Accounts.sendVerificationEmail( userId );
    }
  }
});
