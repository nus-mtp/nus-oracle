//Method to ensure Email is a valid NUS email
Meteor.methods({
  nusEmailVerifier(email) {
    const emailAddress = email;
    const length = emailAddress.length;

    //Domain: to check if domain matches "@u.nus.edu"
    const domain = emailAddress.slice(-10,length);
    const correctDomain = "@u.nus.edu";

    //Regex to check if it contains the correct format of Rfc5322
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    //Object to check the reason of error
     // If all fields here are false, there isn't an error
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
