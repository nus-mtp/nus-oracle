import { createPlanner } from '../../api/crud-controller/planner/methods';
import { populateModuleFixture } from '../../api/integration-tests/fixtures';
import { Modules,
         createModuleCollection } from '../../api/database-controller/module';
import { Planner } from '../../api/crud-controller/planner/planner';

Meteor.startup(() => {
  createModuleCollection();

  if (Modules.find({}).count() === 0) {
    populateModuleFixture();
  }

  if (Planner.find({}).count() === 0) {
    const userIDs = '9f91pejfj912ras';
    const plannerNames = ['testPlanner', 'testPlannerTwo'];
    const focusAreas = [['Com graphics'], ['Com Graphics', 'Security']];

    const academicYear = ['Y1 AY14/15']

    const plannerIDOne = createPlanner(plannerNames[0], focusAreas[0], userIDs);
    const plannerIDTwo = createPlanner(plannerNames[1], focusAreas[1], userIDs);


  }
});
