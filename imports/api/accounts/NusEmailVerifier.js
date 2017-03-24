//Method to ensure Email is a valid domain
Meteor.methods({
  nusEmailVerifier(email) {
    const emailAddress = email;
    const length = emailAddress.length;
    const domain = emailAddress.slice(-10,length);
    const correctDomain = "@u.nus.edu";
    return correctDomain == domain;
  }
});
