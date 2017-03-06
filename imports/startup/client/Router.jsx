import React from 'react';
import { Meteor } from 'meteor/meteor';
import { mount } from 'react-mounter';

// Import React Components
import MainLayout from '../../ui/components/account/main-layout/MainLayout.jsx';
import AccountManager from '../../ui/components/account/login/AccountManager.jsx';
import LoginAccount from '../../ui/components/account/login/LoginAccount.jsx';
import RegisterAccount from '../../ui/components/account/login/RegisterAccount.jsx';
import SetUpAcadDetail from '../../ui/components/account/acad-details/SetUpAcadDetail.jsx';

// The Main App component
import App from '../../ui/pages/App.jsx';

// Paths to route to
export const pathToLogin = "/";
export const pathToSignUp = "/signup";
export const pathToAcadDetailsSetup = "/acadSetup";
export const pathToUserDashboard = "/userDashboard";

/**
 * Implements routes throughout the project
 *
 * MainLayout represents the skeleton component for all our React components
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

 FlowRouter.route(pathToSignUp,  {
   action()  {
     mount(MainLayout, {content: <RegisterAccount />});
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
