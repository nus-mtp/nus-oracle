import React from 'react';
import { render } from 'react-dom';
import { Meteor } from 'meteor/meteor';

/* Import for FlowRouter */
import { mount } from 'react-mounter';

// Import all entry points needed for rendering the Login account
import RegisterAccount from '../../ui/components/login/RegisterAccount';
import LoginAccount from '../../ui/components/login/LoginAccount';
import LogoutAccount from '../../ui/components/login/LogoutAccount';
import ForgetAccount from '../../ui/components/login/ForgetAccount';

// Components for the Initial Set Up Phase
import SetUpAcadDetail from '../../ui/components/setup/SetUpAcadDetail';

// The Main App component
import App from '../../ui/pages/App';

/**
 * Implements routes throughout the project
 *
 * MainLayout represents the skeleton component for all our React components
 * found in fixtures.jsx in ./fixtures.jsx
 */

/**
 * Routes to only the dashboard
 */
FlowRouter.route('/', {
  action() {
    mount(MainLayout, { content: <LoginAccount /> });
  }
});

FlowRouter.route('/setupPage', {
  action() {
    mount(MainLayout, { content: <RegisterAccount /> });
  }
});


/**
 * Routes to the main index page with login + initial setup + dashboard
 */
FlowRouter.route('/LogIn', {
  action() {
    console.log(Meteor.user()); //TODO: a123@u.nus.edu hello
    if (!Meteor.userId()) {
      console.log("User is logged out."); // User is logged out.
      mount(MainLayout, {content: <LogInComponent />});
    } else if (true) { //placeholder to redirect to InitialSetUp
      console.log("User is logged IN."); // User is logged out.
      mount(MainLayout, {content: <AppComponent />});
    } else {
      //Redirect to setup
    }
  }
});

/**
 * Routes to the initial setup
 */
FlowRouter.route('/setup', {
  action() {
    console.log("User is logged out."); // User is logged out.
    mount(AccountSetUpLayout, {content: <AcadDetailComponent />});
  }
});

/**
 * Routes to the user dashboard
 */
 FlowRouter.route('/userDashboard', {
   action() {
     console.log("User enters dashboard."); // User is logged out.
     mount(AccountSetUpLayout, {content: <DashboardContainer />});
   }
 });

/**
 * A template for anyone to redirect if you want to have html extension
 */
FlowRouter.route('/:postId', {
  action(params) {
    mount(MainLayout, {content: <BlogPost {...params} />});
  }
});
