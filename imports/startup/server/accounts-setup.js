import '../../api/profile/accounts/emailverifytemplate';
import './../../api/profile/accounts/emailResetPasswordTemplate';
import '../../api/profile/accounts/NusEmailVerifier';
import '../../api/profile/accounts/PasswordVerifier';
import '../../api/profile/accounts/unLockAccount';
import '../../api/profile/accounts/LockAccount';
import '../../api/profile/accounts/send-verification';


Meteor.publish('user-profile', function() {
  //'console.log(Meteor.users.find({_id : this.userId}, {fields : {profile : 1}}).fetch()[0]);
  return Meteor.users.find({_id : this.userId}, {fields : {profile : 1}});
});

Meteor.publish("allUsers", function () {
  return Meteor.users.find({});
});
