import { Meteor } from 'meteor/meteor';
import React from 'react';
import { render } from 'react-dom';

// Import all entry points needed for rendering the main page
import App from '../../ui/pages/App';
import '../../../client/main.html';

Meteor.startup(() => {
  render(<App />, global.document.getElementById('render-target'));
});
