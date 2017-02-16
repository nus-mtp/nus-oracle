import React from 'react';
import RegisterAccount from './RegisterAccount'
import LoginAccount from './LoginAccount'
import LogoutAccount from './LogoutAccount'


const LoginButtons = BlazeToReact('loginButtons')


export default function StudyPlan() {
  return (


    <div className="page-content">
      <div className="container-fluid">
        <div className="col-xxl-3 col-md-6">
          Study Plan
          <RegisterAccount />
          <LoginAccount />
          <LogoutAccount />
          <App />
        </div>
      </div>
    </div>


  );
}

App = React.createClass({
  render() {
    return (
      <div>
        <LoginButtons />
      </div>
    );
  }
})
