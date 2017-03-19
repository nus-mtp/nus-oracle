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
* Help to triggersEnter to authenticate and redirect if user acccess dashbaord
*/
function redirectFromDashboard (ctx, redirect) {
  if (!Meteor.userId()){// || !Meteor.user().emails[0].verified) {
    FlowRouter.go(pathToLogin);
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
* Help to triggersEnter to authenticate and redirect if user acccess acadSetup
*/
function redirectFromSetup (ctx, redirect) {
  if (!Meteor.userId()){// || !Meteor.user().emails[0].verified) {
    FlowRouter.go(pathToLogin);
    } else {
      Meteor.subscribe("user-profile", {
        onReady: function() {
          if (Meteor.user().profile.hasSetup) {
            //console.log("I am in hacker voice")
              FlowRouter.go(pathToUserDashboard);
          }
        }
      });
  }
}
/*
* Help to triggersEnter to authenticate and redirect if user acccess index
*/
function redirectFromLogIn (ctx, redirect) {
  Meteor.subscribe("user-profile", {
    onReady: function() {
      if (Meteor.user()) {
        if (!Meteor.user().profile.hasSetup) {
          FlowRouter.go(pathToAcadDetailsSetup);
        } else {
          FlowRouter.go(pathToUserDashboard);
        }
      }
    }
  });
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
   redirectFromLogIn
 ]
});

publicRouterGroup.route(pathToLogin, {
 action() {
   mount(MainLayout, {content: <AccountManager />});
 }
});

// The private routes after logging in, will be redirected to log in page if no account is present
loggedinRouterGroup = FlowRouter.group({
 name: 'private'
});


loggedinRouterGroup.route(pathToAcadDetailsSetup,  {
 name: 'acadSetup',
 triggersEnter: [
   redirectFromSetup
 ],
 action()  {
   mount(MainLayout, {content: <SetUpAcadDetail />});
 }
});

loggedinRouterGroup.route(pathToUserDashboard,  {
 name: 'dashboard',
 triggersEnter: [
   redirectFromDashboard
 ],
 action()  {
   mount(MainLayout, {content: <App />});
 }
});
