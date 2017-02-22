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
FlowRouter.route('/setup1', {
  action() {
    console.log("User is logged out."); // User is logged out.
    mount(AccountSetUpLayout, {content: <AcadDetailComponent />});
  }
});

/**
 * Routes to the Setup flor for JC to select Modules passed
 */
FlowRouter.route('/setup2JC', {
  action() {
    console.log("User is logged out."); // User is logged out.
    mount(AccountSetUpLayout, {content: <SetUpJCComponent />});
  }
});


/**
 * Routes to the Setup flor for Poly to select diploma
 */
FlowRouter.route('/setup2Poly', {
  action() {
    console.log("User is logged out."); // User is logged out.
    mount(AccountSetUpLayout, {content: <SetUpPolyComponent />});
  }
});

/**
 * Routes to the confirmation of specific modules waived and exempted
 */
FlowRouter.route('/setup3', {
  action() {
    console.log("User is logged out."); // User is logged out.
    mount(AccountSetUpLayout, {content: <SetUpConfirmComponent />});
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
