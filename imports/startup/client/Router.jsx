import React from 'react';
import { Meteor } from 'meteor/meteor';
import { mount } from 'react-mounter';

// Import React Components
import MainLayout from '../../ui/components/account/main-layout/MainLayout.jsx';
import LoginAccount from '../../ui/components/account/login/LoginAccount.jsx';
import RegisterAccount from '../../ui/components/account/login/RegisterAccount.jsx';

import AcadDetailComponent from '../../ui/components/account/acad-details/AcadDetail.jsx';
import SetUpAcadDetail from '../../ui/components/account/acad-details/SetUpAcadDetail.jsx';

// The Main App component
import App from '../../ui/pages/App.jsx';

/**
 * Implements routes throughout the project
 *
 * MainLayout represents the skeleton component for all our React components
 * found in fixtures.jsx in ./fixtures.jsx
 */

 /**
  * Routes to the main index page with login + initial setup + dashboard
  */
 FlowRouter.route('/', {
   action() {
     mount(MainLayout, {
       content:
       <div>
         <LoginAccount />
         <RegisterAccount />
       </div>
     });
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
