//Defines the template that will be sent to users' email while verifying accounts
//this sample
Accounts.emailTemplates.siteName = "nusOracle";
Accounts.emailTemplates.from     = "nusOracle <admin@nusOracle.com>";

  Accounts.emailTemplates.resetPassword = {
    subject() {
      return "[nusOracle] Reset Your Password";
    },
    text( user, url ) {
      let emailAddress   = user.emails[0].address,
          supportEmail   = "support@nusOracle.com",
          key = "reset-password/",
          indexOfToken = url.indexOf(key),
          token = url.slice(indexOfToken + key.length ,url.length),
          resetURL   = url.slice(0, indexOfToken) + "?acc=reset-password",
          emailBody      = `To reset your password, please visit (${resetURL}) and place this token to the following link:\n\n Token: ${token}\n\n `;
      return emailBody;
    }
  };
