// for loginaccount.jsx to reset wrong password
Meteor.methods({
  resetpassword(userId) {
      return Accounts.setPassword(userId, newPassword);
  }
});
