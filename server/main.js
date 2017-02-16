import { Meteor } from 'meteor/meteor';
import {createModuleCollection} from '../imports/api/database-controller/module';
import { Planner } from '../imports/api/crud-controller/planner/planner';

Meteor.startup(() => {
  // code to run on server at startup
  createModuleCollection();
});
