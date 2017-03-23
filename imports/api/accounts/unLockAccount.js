// for loginaccount.jsx to reset wrong password
Meteor.methods({
  unlockAcc() {
    //let userAccount = Accounts.users.findOne({username: });
    const userId = Meteor.userId();
    console.log("asd");
    Meteor.users.update(userId, {
      $set: { "profile.accountLock" : false }
    });
    return userId;
      //return Accounts.setPassword(userId, newPassword);
  }
});
