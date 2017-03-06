import React from 'react';
import { Meteor } from 'meteor/meteor';
import { mount } from 'react-mounter';

// Import React Components
import App from '../../ui/pages/App.jsx';
import MainLayout from '../../ui/components/account/main-layout/MainLayout.jsx';
import AccountManager from '../../ui/components/account/login/AccountManager.jsx';
import SetUpAcadDetail from '../../ui/components/account/acad-details/SetUpAcadDetail.jsx';

// Paths to route to
export const pathToLogin = "/";
export const pathToAcadDetailsSetup = "/acadSetup";
export const pathToUserDashboard = "/userDashboard";

/**
 * Implements routes throughout the project
 *
 * MainLayout represents the skeleton component for all our React components
<<<<<<< HEAD
 * found in fixtures.jsx in ./fixtures.jsx
 */

 /**
  * Routes to the main index page with login + initial setup + dashboard
  */
 FlowRouter.route(pathToLogin, {
   action() {
     mount(MainLayout, {content: <AccountManager />});
   }
 });

 FlowRouter.route(pathToAcadDetailsSetup,  {
   action()  {
     mount(MainLayout, {content: <SetUpAcadDetail />});
   }
 });

 FlowRouter.route(pathToUserDashboard,  {
   action()  {
     mount(MainLayout, {content: <App />});
   }
 })
=======
 */

/**
 * Routes to the main index page with login + initial setup + dashboard
 */
FlowRouter.route('/', {
  action() {
    mount(MainLayout, {content: <LogInComponent />});
  }
});

FlowRouter.route('/acadDetails',  {
  action()  {
    mount(MainLayout, {content: <AcadDetailComponent />});
  }
});

FlowRouter.route('/app',  {
  action()  {
    mount(MainLayout, {content: <App />});
  }
})
>>>>>>> 31d321190195dd08a616ba662bfdd6537e7a71b5
