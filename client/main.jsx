import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';

import App from '../imports/ui/App';

import './main.html';

Meteor.startup(() => {
  render(
    <App />, global.document.getElementById('render-target'));
});
