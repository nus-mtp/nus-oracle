//Method to ensure Email is a valid domain
Meteor.methods({
  nusEmailVerifier(email) {
    const emailAddress = email;
    const length = emailAddress.length;
    const domain = emailAddress.slice(-10,length);
    const correctDomain = "@u.nus.edu";

    let errorObj = {
      incorrectDomain: false,
    }

    let errorExists = false;
    if (correctDomain != domain) {
      errorObj.incorrectDomain = true;
      errorExists = true;
    }

    if (errorExists) {
      throw new Meteor.Error(errorObj);
    } else {
      return true;
    }
  }
});
