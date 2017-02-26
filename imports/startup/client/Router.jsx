import React from 'react';
import { render } from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { mount } from 'react-mounter';

import { MainLayout } from '../../ui/components/account/main-layout/MainLayout';
import { LogInComponent } from '../../ui/components/account/login/LogInComponent';
import { AcadDetailComponent } from '../../ui/components/account/acad-details/AcadDetail';
import { App } from '../../ui/pages/App';

/**
 * Implements routes throughout the project
 *
 * MainLayout represents the skeleton component for all our React components
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
