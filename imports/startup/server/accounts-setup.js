import '../../api/accounts/emailverifytemplate';
import '../../api/accounts/NusEmailVerifier';
import '../../api/accounts/ResetPassword';
import '../../api/accounts/send-verification';

Meteor.publish('user-profile', function() {
  //'console.log(Meteor.users.find({_id : this.userId}, {fields : {profile : 1}}).fetch()[0]);
  return Meteor.users.find({_id : this.userId}, {fields : {profile : 1}});
});
