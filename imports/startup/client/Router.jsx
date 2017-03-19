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

var profile;
//Tracker.autorun(function () {

    //profile = Meteor.user();
    //console.log("Tracker");
    //console.log(profile);

//});
/*
* Help to triggersEnter to authenticate and redirect if user is not logged in
*/
function checkLoggedIn (ctx, redirect) {
  if (!Meteor.userId()){// || !Meteor.user().emails[0].verified) {
    FlowRouter.go(pathToLogin);
  /*} else if (!Meteor.user().emails[0].verified) {
      redirect(pathToLogin);
    } else if (!Meteor.user().profile.hasSetup) {
      redirect(pathToAcadDetailsSetup)*/
    } else {
      Meteor.subscribe("user-profile", {
        onReady: function() {
          if (!Meteor.user().profile.hasSetup) {
            //console.log("I am in hacker voice")
              FlowRouter.go(pathToAcadDetailsSetup);
          }
        }
      });
  }
}
/*
* Help to triggersEnter to authenticate and redirect if user is logged in and have an account already set up
*/
function redirectIfLoggedIn (ctx, redirect) {
  console.log(profile);
  if (Meteor.userId()) {
//    const userdetails = Meteor.users.find( { "_id": Meteor.userId()});
    Meteor.subscribe("user-profile", {
      onReady: function() {
        if (!Meteor.user().profile.hasSetup) {
          FlowRouter.go(pathToAcadDetailsSetup);
        } else {
          FlowRouter.go(pathToUserDashboard);
        }
      }
    });

    //console.log(Meteor.user().profile.hasSetup);
    //if (Meteor.user().profile.hasSetup) {
    /* if (Meteor.user().profile.hasSetup) {
       redirect(pathToUserDashboard)
    } else {
      redirect(pathToAcadDetailsSetup)
    }*/
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
 name: 'public',
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
 name: 'acadSetup',
 triggersEnter: [checkLoggedIn],
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
