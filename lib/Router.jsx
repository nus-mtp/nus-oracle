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
FlowRouter.route('/1', {
  action() {
    if (!Meteor.userId()) {
      console.log("User is logged out."); // User is logged out.
      mount(MainLayout, {content: <LogInComponent />});
    } else {
      console.log("User is logged IN."); // User is logged out.
      mount(MainLayout, {content: <AppComponent />});
    }
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
