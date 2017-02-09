import { assert, expect } from 'meteor/practicalmeteor:chai';
import { Random } from 'meteor/random';
import { Planner } from './planner';
import { createPlanner,
         getPlannerFocusArea,
         getPlannerName,
         removePlanner,
         insertNewSemesterInPlanner,
         getSemesterInPlanner,
         deleteSemesterInPlanner } from './methods';

describe('planner', function () {
  const testPlannerName = 'testPlanner';
  const focusArea = [
    'Computer Graphics And Games',
     'Parallel Computing'
  ];
  const testPlannerID = createPlanner(testPlannerName, focusArea);

  it('create new planner document in mongo collection', function () {
    const planner = Planner.findOne(testPlannerID);
    expect(planner._id).to.be.a('string');
    assert.equal(planner._id, testPlannerID);
  });

  it ('get planner in mongo object form', function () {
    const retrievedFocusArea = getPlannerFocusArea(testPlannerID);
    assert.equal(retrievedFocusArea[0], 'Computer Graphics And Games');
    assert.equal(retrievedFocusArea[1], 'Parallel Computing');
  });

  it ('get planner name', function ()  {
    const plannerName = getPlannerName(testPlannerID);
    assert.equal(plannerName, testPlannerName);
  });

  it ('insert semester into planner', function () {
    const semesterNum = 1;
    const numOfDocumentsUpdatedWithSemester = insertNewSemesterInPlanner(semesterNum, testPlannerID);

    const planner = Planner.findOne(testPlannerID);
    const retrievedSemesters = planner.semesters;

    assert.equal(Object.keys(retrievedSemesters).length, 1);
    assert.equal(numOfDocumentsUpdatedWithSemester, 1);
  });

  it ('get semester in planner', function () {
    const semesterNum = 1;
    const modules = getSemesterInPlanner(semesterNum, testPlannerID);
    expect(modules).to.be.a('object');
  });

  it ('delete semester in planner', function () {
    const semesterNum = 1;
    const numOfDocumentsUpdatedWithSemester = deleteSemesterInPlanner(semesterNum, testPlannerID);

    const planner = Planner.findOne(testPlannerID);
    const retrievedSemesters = planner.semesters;

    assert.equal(Object.keys(retrievedSemesters).length, 0);
    assert.equal(numOfDocumentsUpdatedWithSemester, 1);
  });

  it ('remove planner document in mongo collection', function () {
    const beforeRemovedPlanner = Planner.findOne(testPlannerID);

    removePlanner(testPlannerID);
    const afterRemovedPlanner = Planner.findOne(testPlannerID);
    expect(afterRemovedPlanner).to.be.an('undefined');
  });
});
