import { Meteor } from 'meteor/meteor';
import { createPlanner } from '../../api/crud-controller/planner/methods';
import { populateModuleFixture } from '../api/integrations-tests/fixtures';
import { Modules } from '../api/database-controller/module';
import { Planner } from '../api/crud-controller/planner/planner';

Meteor.startup(() => {
  if (Modules.find({}).count() === 0) {
    populateModuleFixture();
  }

  if (Planner.find({}).count() === 0) {
    const plannerIDs = [];

    const userIDs = '9f91pejfj912ras';
    const plannerNames = ['testPlanner', 'testPlannerTwo'];
    const focusAreas = [['Com graphics'], ['Com Graphics', 'Security']];

    plannerIDs.push(createPlanner(plannerNames[0], focusAreas[0], userIDs));
    plannerIDs.push(createPlanner(plannerNames[1], focusAreas[1], userIDs[0]));
  }

});
