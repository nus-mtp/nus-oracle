
//main.html is not needed anymore
import { Meteor } from 'meteor/meteor';
import React from 'react';
import { render } from 'react-dom';
import {mount} from 'react-mounter';
import App from '../../ui/pages/App';

// Import all entry points needed for rendering the Login account
import RegisterAccount from '../../ui/components/login/RegisterAccount';
import LoginAccount from '../../ui/components/login/LoginAccount';
import LogoutAccount from '../../ui/components/login/LogoutAccount';
import ForgetAccount from '../../ui/components/login/ForgetAccount';


//Components for initial set up
import SetUpAcadDetail from '../../ui/components/setup/SetUpAcadDetail';
import SetUpJC from '../../ui/components/setup/SetUpJC';
import SetUpPoly from '../../ui/components/setup/SetUpPoly';
import SetUpConfirm from '../../ui/components/setup/SetUpConfirm';

const LoginButtons = BlazeToReact('loginButtons')

// Routing details should be added inside "../lib/Router.jsx"
// Main Skeleton component for the other components to attach on
MainLayout = React.createClass({
  render() {
    return(
      <div>
        <main>{this.props.content}</main>
        <AccountDebug/>
      </div>
    );
  }
});

//The main component to show the Study plan
AppComponent = React.createClass({
  render() {
    return(
      <div>
        <App />
      </div>
    );
  }
});

//Basic Log in component, should be split up to match
LogInComponent = React.createClass({
  render() {
    return(
      <div>
        <LoginAccount />
        <RegisterAccount />
        <ForgetAccount />
      </div>
    );
  }
});

// An additional button to see the loginbutton for debugging
AccountDebug = React.createClass({
  render() {
    return(
      <div>
        <LoginButtons />
      </div>
    );
  }
})
/////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////  INITIAL SET UP  ///////////////////////////////////////////

// Routing details should be added inside "../lib/Router.jsx"
// Skeleton component for the Setup component
AccountSetUpLayout = React.createClass({
  render() {
    return(
      <div>
        <h1>Account Set Up</h1>
        <main>{this.props.content}</main>
        <button>Cancel</button>
      </div>
    );
  }
});

//Academic Details Component
AcadDetailComponent = React.createClass({
  render() {
    return(
      <div>
        <h2>Academic Details</h2>
        <SetUpAcadDetail />
      </div>
    );
  }
});

//Component to set up JC modules
SetUpJCComponent = React.createClass({
  render() {
    return(
      <div>
        <h2>Academic Details - Junior College</h2>
        <SetUpJC />
      </div>
    );
  }
});

//Component to set up Poly modules
SetUpPolyComponent = React.createClass({
  render() {
    return(
      <div>
        <h2>Poly Details - Polytechnic</h2>
        <SetUpPolyComponent />
      </div>
    );
  }
});

//Component to set up Poly modules
SetUpConfirmComponent = React.createClass({
  render() {
    return(
      <div>
        <h2>Module confirmation</h2>
        <SetUpConfirm />
      </div>
    );
  }
});
