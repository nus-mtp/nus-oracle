import React from 'react';


const LoginButtons = BlazeToReact('loginButtons')


export default function StudyPlan() {
  return (


    <div className="page-content">
      <div className="container-fluid">
        <div className="col-xxl-3 col-md-6">
          Study Plan
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
