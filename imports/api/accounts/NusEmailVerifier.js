//Method to ensure Email is a valid domain
Meteor.methods({
  nusEmailVerifier(email) {
    let emailAddress = email;
    let length = emailAddress.length;
    let domain = emailAddress.slice(-10,length);
    let correctDomain = "@u.nus.edu";
    return correctDomain == domain;
  }
});
