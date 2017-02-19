import { createPlanner } from '../../api/crud-controller/planner/methods';
import { insertNewSemesterInPlanner } from '../../api/crud-controller/semester/methods';
import { insertOneModuleInSemester } from '../../api/crud-controller/module/methods';
import { populateModuleFixture } from '../../api/integration-tests/fixtures';
import { Modules } from '../../api/database-controller/module/module';
import { Planner } from '../../api/crud-controller/planner/planner';

Meteor.startup(() => {
  if (Modules.find({}).count() === 0) {
    populateModuleFixture();
  }

  if (Planner.find({}).count() === 0) {
    const userIDs = '9f91pejfj912ras';
    const plannerNames = ['testPlanner', 'testPlannerTwo'];
    const focusAreas = [['Com graphics'], ['Com Graphics', 'Security']];

    const academicYear = ['AY14/15', 'AY14/15', 'AY15/16', 'AY15/16', 'AY16/17', 'AY16/17', 'AY17/18', 'AY17/18'];
    const semesterNum = [1, 2, 1, 2, 1, 2, 1, 2];
    const semesterIndex = [0, 1, 2, 3, 4, 5, 6, 7];

    const modules = ['CS1010', 'CS1020', 'CS2010', 'CS3230'];
    const modulesTwo = ['CS1010X', 'CS1020', 'CS2010'];

    const plannerIDOne = createPlanner(plannerNames[0], focusAreas[0], userIDs);
    const plannerIDTwo = createPlanner(plannerNames[1], focusAreas[1], userIDs);

    // create semesters
    for (var i=0; i< semesterIndex.length; i++) {
      insertNewSemesterInPlanner(academicYear[i], semesterNum[i], plannerIDOne);
    }

    for (var i=0; i< semesterIndex.length; i++) {
      insertNewSemesterInPlanner(academicYear[i], semesterNum[i], plannerIDTwo);
    }

    // for each semester, insert a module into the semester
    for (var i = 0; i< semesterIndex.length; i++) {
      for (var j = 0; j < modules.length; j++)  {
        insertOneModuleInSemester(i, modules[j], plannerIDOne);
      }
    }

    // for each semester, insert a module into the semester
    for (var i = 0; i< semesterIndex.length; i++) {
      for (var j = 0; j < modulesTwo.length; j++)  {
        insertOneModuleInSemester(i, modulesTwo[j], plannerIDTwo);
      }
    }
  }
});
