//Template that users will receive in their email address when they register a new account
Accounts.emailTemplates.siteName = "nusOracle";
Accounts.emailTemplates.from     = "nusOracle <admin@nusOracle.com>";

Accounts.emailTemplates.verifyEmail = {
    //used to modify subject of email
  subject() {
    return "[nusOracle] Verify Your Email Address";
  },
  //used to modify message of email
  text( user, url ) {
    let emailAddress   = user.emails[0].address,
        supportEmail   = "support@nusOracle.com",
        emailBody      = `To verify your email address (${emailAddress}) visit the following link:\n\n${url}\n\n If you did not request this verification, please ignore this email. If you feel something is wrong, please contact our support team: ${supportEmail}.`;
    return emailBody;
  }
};
