// for loginaccount.jsx to lock account of user to prevent from logging in
Meteor.methods({
  lockAcc(email) {
    let userAccount = Accounts.users.findOne({username: email});
    const userId = userAccount._id;
    Meteor.users.update(userId, {
      $set: { "profile.accountLock" : true }
    });
    return userId;
      //return Accounts.setPassword(userId, newPassword);
  }
});
