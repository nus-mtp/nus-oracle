// for loginaccount.jsx to reset wrong password
Meteor.methods({
  resetpassword(userId) {
    let newPassword = generatePassword();
    //console.log(newPassword);
      return Accounts.setPassword(userId, newPassword);
  }
});

const generatePassword = function generatePassword() {
    var length = 50,
        charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()-_=+[{}],.<>?/|~",
        retVal = "";
    for (var i = 0, n = charset.length; i < length; ++i) {
        retVal += charset.charAt(Math.floor(Math.random() * n));
    }
    return retVal;
};
