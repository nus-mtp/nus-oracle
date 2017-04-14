// for loginaccount.jsx to unlock account for logging in again after changing password
Meteor.methods({
  unlockAcc() {
    const userId = Meteor.userId();
    Meteor.users.update(userId, {
      $set: { "profile.accountLock" : false }
    });
    return userId;
  }
});
