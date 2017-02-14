import { Meteor } from 'meteor/meteor';
import {createModuleCollection} from '../imports/api/database-controller/module';

Meteor.startup(() => {
  // code to run on server at startup
  createModuleCollection();
});
