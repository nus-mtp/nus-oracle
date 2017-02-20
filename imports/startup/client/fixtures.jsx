
//main.html is not needed anymore
import { Meteor } from 'meteor/meteor';
import React from 'react';
import { render } from 'react-dom';
import {mount} from 'react-mounter';
import App from '../../ui/pages/App';
// Import all entry points needed for rendering the main page
import RegisterAccount from '../../ui/components/RegisterAccount';
import LoginAccount from '../../ui/components/LoginAccount';
import LogoutAccount from '../../ui/components/LogoutAccount';
import ForgetAccount from '../../ui/components/ForgetAccount';
/*
Meteor.startup(() => {
  render(<App/>, global.document.getElementById('render-target'));
});
*/
const LoginButtons = BlazeToReact('loginButtons')
//Routing details should be added inside "../lib/Router.jsx"
//Main Skeleton component for the other components to attach on
MainLayout = React.createClass({
  render() {
    return <div>
      <main>{this.props.content}</main>
      <AccountDebug/>
    </div>;
  }
});

//The main component to show the Study plan
StudyPlanComponent = React.createClass({
  render() {
    return <div>
      <App />
    </div>;
  }
});



//Basic Log in component, should be split up to match
LogInComponent = React.createClass({
  render() {
    return <div>
      <LoginAccount />
      <RegisterAccount />
      <ForgetAccount />
    </div>;
  }
});

//an additional button to see the loginbutton for debugging
AccountDebug = React.createClass({
  render() {
    return (
      <div>
        <LoginButtons />
      </div>
    );
  }
})
