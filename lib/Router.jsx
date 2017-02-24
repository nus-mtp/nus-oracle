import React from 'react';
import { render } from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { mount } from 'react-mounter';

/**
 * Implements routes throughout the project
 *
 * MainLayout represents the skeleton component for all our React components
 * found in fixtures.jsx in ./imports/startup/client/fixtures.jsx
 */

/**
 * Routes to only the dashboard
 */
FlowRouter.route('/', {
  action() {
    mount(MainLayout, {content: <AppComponent />});
  }
});

/**
 * Routes to the main index page with login + initial setup + dashboard
 */
FlowRouter.route('/LogIn', {
  action() {
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
