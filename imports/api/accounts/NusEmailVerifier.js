//Method to ensure Email is a valid domain
Meteor.methods({
  nusEmailVerifier(email) {
    const emailAddress = email;
    const length = emailAddress.length;
    const domain = emailAddress.slice(-10,length);
    const correctDomain = "@u.nus.edu";
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    let errorObj = {
      incorrectDomain: false,
      incorrectFormat: false,
    }

    let errorExists = false;
    if (correctDomain != domain) {
      errorObj.incorrectDomain = true;
      errorExists = true;
    }
    if (!re.test(email)) {
        errorObj.incorrectFormat = true;
        errorExists = true;
    }

    if (errorExists) {
      throw new Meteor.Error(errorObj);
    } else {
      return true;
    }
  }
});
