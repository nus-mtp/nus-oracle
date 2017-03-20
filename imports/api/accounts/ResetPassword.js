// for loginaccount.jsx to reset wrong password
Meteor.methods({
  resetpassword(email) {
    let userAccount = Accounts.users.findOne({username: email});
    const userId = userAccount._id;
    console.log("asd");
    Meteor.users.update(userId, {
      $set: { "profile.accountLock" : true }
    });
    return userId;
      //return Accounts.setPassword(userId, newPassword);
  }
});
