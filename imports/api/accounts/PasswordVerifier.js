import {successMsgs,
        errorMsgs } from './../../ui/components/account/AccountAlerts.js'

//Method to ensure Email is a valid domain
Meteor.methods({
  nusPasswordVerifier(password, repassword) {
    if (password != repassword) {// Password does not match
      console.log(errorMsgs.ERR_PASSWORDS_NOT_MATCH);
      throw new Meteor.Error(errorMsgs.ERR_PASSWORDS_NOT_MATCH);
      return false;
    } else {//matching passwords
      const smallPassword = password.toLowerCase();
      const bigPassword = password.toUpperCase();
      const isMixCase = smallPassword != password || bigPassword != password;
      const hasNumber = /\d/;
      const hasWhitespace = /\s/;
      const hasCharacter = /[a-zA-Z]/;
      const isSecureEnough =  isMixCase &&
                              hasNumber.test(password) &&
                              hasCharacter.test(password) &&
                              !hasWhitespace.test(password);
        if (!isSecureEnough) {// password is not secure
          throw new Meteor.Error(errorMsgs.ERR_PASSWORDS_GET_ON_MY_LEVEL);
          return false;
        }
    }
    return true;
  }
});
