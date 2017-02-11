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

  const testAcademicYear = '14/15';
  const testSemesterNum = 1;

  const testPlannerID = createPlanner(testPlannerName, focusArea);

  it('create new planner document in mongo collection', function () {
    const planner = Planner.findOne(testPlannerID);
    expect(planner.semesters).to.be.an('array');
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
    const semesterIndex = insertNewSemesterInPlanner(testAcademicYear, testSemesterNum, testPlannerID);

    const planner = Planner.findOne(testPlannerID);
    const retrievedSemesters = planner.semesters;

    assert.equal(retrievedSemesters.length, 1);
    assert.equal(semesterIndex, 0);
  });

  it ('get semester in planner', function () {
    const semesterIndex = 0;
    const semesterModules = getSemesterInPlanner(semesterIndex, testPlannerID);
    expect(semesterModules).to.be.a('object');
  });

  it ('delete semester in planner', function () {
    const semesterIndex = 0;
    const numOfSemesters = deleteSemesterInPlanner(semesterIndex, testPlannerID);

    const planner = Planner.findOne(testPlannerID);
    const retrievedSemesters = planner.semesters;

    assert.equal(retrievedSemesters.length, 0);
    assert.equal(numOfSemesters, 0);
  });

  it ('remove planner document in mongo collection', function () {
    const beforeRemovedPlanner = Planner.findOne(testPlannerID);

    removePlanner(testPlannerID);
    const afterRemovedPlanner = Planner.findOne(testPlannerID);
    expect(afterRemovedPlanner).to.be.an('undefined');
  });
});