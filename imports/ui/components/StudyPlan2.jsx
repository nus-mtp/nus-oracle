import React from 'react';
import SignIn2 from './SignIn2'


const LoginButtons = BlazeToReact('loginButtons')


export default function StudyPlan() {
  return (


    <div className="page-content">
      <div className="container-fluid">
        <div className="col-xxl-3 col-md-6">
          Study Plan
          <SignIn2 />
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
