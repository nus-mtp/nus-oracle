/**
 * Notification functions for displaying accounts-related user feedback,
 * such as success or failure messages for logging in, logging out,
 * signing in and forgetting password.
 */

const MAX_PASSWORD_TRIES = 5;

export const successMsgs = {
  SUCCESS_LOGIN: "Welcome back!",
  SUCCESS_LOGOUT: "Thanks for using NUS Oracle",
  SUCCESS_SIGNUP: "Thanks for signing up! Please check your e-mail to verify your NUS Oracle account!",
  SUCCESS_SETUP: "Setup is all done. Welcome to NUS Oracle!",
  SUCCESS_PASSWORD_CHANGED: "New password successfully changed!",
  SUCCESS_NEW_PASSWORD_SENT: "A password restoration has been sent, please use token to reset!"
}

export const warningMsgs = {
  WARNING_INPUT_EMAIL_TO_LOGIN: "Please enter your NUS e-mail address & password to log in!",
  WARNING_CANCEL_SETUP: "Click again to leave this page",
  WARNING_SETUP: "Please complete setup before proceeding"
}

export const errorMsgs = {
  ERR_INCORRECT_PASSWORD: "Incorrect password entered",
  ERR_PASSWORDS_GET_ON_MY_LEVEL: "Password needs upper and lower case letters, numbers, non-alphanumeric characters and no whitespace",
  ERR_PASSWORDS_NOT_MATCH: "Passwords do not match",
  ERR_PASSWORDS_IS_NOT_MIX_CASE: "Must have a mix of upper and lower case letters",
  ERR_PASSWORDS_HAS_NO_NUMERIC: "Must have at least 1 digit",
  ERR_PASSWORDS_HAS_NO_LETTER: "Must have at least 1 letter",
  ERR_PASSWORDS_TOO_SHORT: "Must have at least 6 characters",
  ERR_PASSWORDS_HAS_WHITESPACE: "Must not have any whitespace",
  ERR_EXCEEDED_LOGIN_ATTEMPTS: "Password reset. Too many login attempts. Please check",
  ERR_EMAIL_UNRECOGNIZED: "is not recognized. Have you created an account yet?",
  ERR_EMAIL_UNVERIFIED: "Your e-mail has not been verified. Please check",
  ERR_EMAIL_FIELD_EMPTY: "Please input your NUS E-mail",
  ERR_EMAIL_USER_NOT_FOUND: "This e-mail isn't recognized. Did you enter your NUS e-mail address correctly?",
  ERR_ACCOUNT_LOCK: "Your account has been locked. Please check",
  ERR_EMAIL_ENTERED_INVALID_DOMAIN: "Invalid NUS e-mail. Remember to end your e-mail address with '@u.nus.edu'",
  ERR_EMAIL_ENTERED_INVALID_FORMAT:"Invalid email format. Please check if there are invalid puncutations in your email",
  ERR_SETUP_INCOMPLETE: "Please enter all three fields before continuing"
}
export const loadingMsgs = {
  LOAD_LOGGING_IN: "Logging you in",
  LOAD_LOGGING_OUT: "Thank you for using NUS Oracle",
  LOAD_REGISTERING: "Creating account",
  LOAD_INITIALISING: "Do you know, there are over 7000 unique modules in the past 5 years?",
  LOAD_FORGET: "Launching Token to your email",
  LOAD_CHANGE: "Changing password"
}

//=====================================================
// CUSTOM SUCCESS MESSAGES
//=====================================================
/**
 * SUCCESSFUL Login Message
 * @param  {[String]} username   User's username
 * @return {[String]}    Welcome message
 */
export const successMsgLoginName = function(username) {
  return successMsgs.SUCCESS_LOGIN + " " + username;
}

//=====================================================
// CUSTOM ERROR MESSAGES
//=====================================================
/**
 * ERROR Incorrect Password with Number of Tries Message
 * @param  {[String]} numOfTries   Number of times the user has tried
 * @return {[String]}   Error message counting down number of tries left
 */
export const errorMsgIncorrectPassword = function(numOfTries) {
  let numTriesMsg = "You've got " + (MAX_PASSWORD_TRIES - numOfTries) + " tries left.";
  return errorMsgs.ERR_INCORRECT_PASSWORD + ". " + numTriesMsg;
}

/**
 * ERROR Warning when user exceeded the max number of login attempts Message
 * @param  {[String]} email   User's email address
 * @return {[String]}    Error message
 */
export const errorMsgExceededLoginAttempts = function(email) {
  return errorMsgs.ERR_EXCEEDED_LOGIN_ATTEMPTS + " " + email;
}

/**
 * ERROR Warning when user hasn't verified email Message
 * @param  {[String]} email   User's email address
 * @return {[String]}    Error message
 */
export const errorMsgUnverifiedEmail = function(email) {
  return errorMsgs.ERR_EMAIL_UNVERIFIED + " " + email;
}

/**
 * ERROR Warning when's account has been locked
 * @param  {[String]} email   User's email address
 * @return {[String]}    Error message
 */
export const errorLockedAccount = function(email) {
  return errorMsgs.ERR_ACCOUNT_LOCK + " " + email;
}

/**
 * ERROR Warning when the email the user entered isn't a recognized in our
 * database Message
 * @param  {[String]} email   User's email address
 * @return {[String]}    Error message
 */
export const errorMsgUnrecognizedEmail = function(email) {
  return email + " " + errorMsgs.ERR_EMAIL_UNRECOGNIZED;
}
