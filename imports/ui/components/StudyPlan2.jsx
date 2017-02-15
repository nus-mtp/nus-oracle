import React from 'react';
import RegisterAccount from './RegisterAccount'
import LoginAccount from './LoginAccount'


const LoginButtons = BlazeToReact('loginButtons')


export default function StudyPlan() {
  return (


    <div className="page-content">
      <div className="container-fluid">
        <div className="col-xxl-3 col-md-6">
          Study Plan
          <RegisterAccount />
          <LoginAccount />
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
