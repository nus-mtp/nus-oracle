import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import {mount} from 'react-mounter';

//The main index page with no further html extension to load the specific component
FlowRouter.route('/', {
  action() {
    if (!Meteor.userId()) {
      console.log("User is logged out."); // User is logged out.
      mount(MainLayout, {content: <LogInComponent />});
    } else {
       console.log("User is logged IN."); // User is logged out.
       mount(MainLayout, {content: <StudyPlanComponent />});
    }

  }
});

FlowRouter.route('/ui', {
  action() {
    mount(MainLayout, {content: <StudyPlanComponent />});
  }
});

//A template for anyone to redirect if you want to have html extension
FlowRouter.route('/:postId', {
  action(params) {
    mount(MainLayout, {content: <BlogPost {...params} />});
  }
});
