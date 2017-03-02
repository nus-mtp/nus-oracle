import { Meteor } from 'meteor/meteor';
import React from 'react';

import LoginAccount from './LoginAccount';
import RegisterAccount from './RegisterAccount';
import ForgetAccount from './ForgetAccount';

//Basic Log in component, should be split up to match
export class LogInComponent extends React.Component {
  render() {
    return(
      <div>
        <LoginAccount />
        <RegisterAccount />
        <ForgetAccount />
      </div>
    );
  }
}
