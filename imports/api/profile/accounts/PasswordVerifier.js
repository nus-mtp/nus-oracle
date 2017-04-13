import { successMsgs,
         errorMsgs } from './../../../ui/components/account/AccountAlerts.js'

//Method to ensure Email is a valid domain
Meteor.methods({
  nusPasswordVerifier(password, repassword) {
    const smallPassword = password.toLowerCase();
    const bigPassword = password.toUpperCase();

    // Validity checks
    const isSameCase = smallPassword == password || bigPassword == password;
    const hasNumber = (/\d/).test(password);
    const hasCharacter = (/[a-zA-Z]/).test(password);
    const hasWhitespace = (/\s/).test(password);
    const isLessThanSixChars = password.length < 6;

    let errorObj = { // If all fields here are false, there isn't an error
      passwordsNotMatch: false,
      isNotMixCase: false,
      hasNoNumeric: false,
      hasNoLetter: false,
      hasWhitespace: false,
      isLessThanSixChars: false,
    }

    let errorExists = false;
    if (password != repassword) {
      errorObj.passwordsNotMatch = true;
      errorExists = true;
    }
    if (isSameCase) {
      errorObj.isNotMixCase = true;
      errorExists = true;
    }
    if (!hasNumber) {
      errorObj.hasNoNumeric = true;
      errorExists = true;
    }
    if (!hasCharacter) {
      errorObj.hasNoLetter = true;
      errorExists = true;
    }
    if (isLessThanSixChars) {
      errorObj.isLessThanSixChars = true;
      errorExists = true;
    }
    if (hasWhitespace) {
      errorObj.hasWhitespace = true;
      errorExists = true;
    }

    if (errorExists) {
      throw new Meteor.Error(errorObj);
    } else {
      return true;
    }
  }
});
