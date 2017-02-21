// for Signin2.jsx
Meteor.methods({
  nusEmailVerifier(email) {
    let emailAddress = email;
    let length = emailAddress.length;
    let domain = emailAddress.slice(-10,length);
    let correctDomain = "@u.nus.edu";
    console.log(domain);
    console.log(correctDomain);
    console.log(correctDomain == domain);
    return correctDomain == domain;
  }
});
