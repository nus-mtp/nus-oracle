import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';

// Import all entry points needed for rendering the main page
import App from '../imports/ui/pages/App';
import './main.html';

// React components to render immediately on start up
Meteor.startup(() => {
  render(<App />, global.document.getElementById('render-target'));
});
