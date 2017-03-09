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
 * found in fixtures.jsx in ./fixtures.jsx
 */
 function checkLoggedIn (ctx, redirect) {
   if (!Meteor.userId()) {
     redirect(pathToLogin);
   }
 }

 function redirectIfLoggedIn (ctx, redirect) {
   if (Meteor.userId()) {
     if (Meteor.user().profile.hasSetup) {
        redirect(pathToUserDashboard)
     } else {
       redirect(pathToAcadDetailsSetup)
     }
   }
 }
 // The routes before logging n
 publicRouterGroup = FlowRouter.group({
   name: 'private',
   triggersEnter: [
     redirectIfLoggedIn
   ]
 });

 publicRouterGroup.route(pathToLogin, {
   action() {
     mount(MainLayout, {content: <AccountManager />});
   }
 });

// The routes after logging in
 loggedinRouterGroup = FlowRouter.group({
   name: 'private',
   triggersEnter: [
     checkLoggedIn
   ]
   /*
   triggersEnter: [() =>
     unless Meteor.loggingIn() or Meteor.userId()
       route = FlowRouter.current()
       unless route.route.name is 'login'
         Session.set 'redirectAfterLogin', route.path
       FlowRouter.go ‘login’
   ]
   */
 });


 loggedinRouterGroup.route(pathToAcadDetailsSetup,  {
   action()  {
     mount(MainLayout, {content: <SetUpAcadDetail />});
   }
 });

 loggedinRouterGroup.route(pathToUserDashboard,  {
   name: 'dashboard',
   triggersEnter: [checkLoggedIn],
   action()  {
     mount(MainLayout, {content: <App />});
   }
 });
