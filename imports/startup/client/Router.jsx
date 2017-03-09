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

/*
* Help to triggersEnter to authenticate and redirect if user is not logged in
*/
function checkLoggedIn (ctx, redirect) {
  if (!Meteor.userId() || !Meteor.user().username.verified) {
    redirect('pathToLogin');
  }
}


/*
* Help to triggersEnter to authenticate and redirect if user is logged in and have an account already set up
*/
function redirectIfLoggedIn (ctx, redirect) {
  if (Meteor.userId()) {
    if (Meteor.user().profile.hasSetup) {
       redirect(pathToUserDashboard)
    } else {
      redirect(pathToAcadDetailsSetup)
    }
  }
}

/**
 * Implements routes throughout the project
 *
 * MainLayout represents the skeleton component for all our React components
 * found in fixtures.jsx in ./fixtures.jsx
 */

 // The routes before logging in, will be redirected accordingly if account has been previously logged in
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

// The private routes after logging in, will be redirected to log in page if no account is present
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
