import { assert, expect } from 'meteor/practicalmeteor:chai';
import { Planner } from '../planner/planner';
import { createPlanner,
         removePlanner,
         getPlannerIDs } from '../planner/methods';
import { insertNewSemesterInPlanner } from '../semester/methods';
import { insertOneModuleInSemester,
         getAllModulesInSemester,
         getOneModuleInSemester,
         deleteOneModuleInSemester } from './methods';
import  { insertOneModuleInSemester,
          getAllModulesInSemester,
          getOneModuleInSemester,
          deleteOneModuleInSemester } from './meteor-methods';

describe('modules', function () {
  const userID = 'akshhr31lci1lkal';
  const modules = ['CS1010', 'CS1020', 'CS2010', 'CS3230'];

  beforeEach(function ()  {
    const plannerNames = ['plannerOne'];
    const focusArea = [
      ['Computer Graphics And Games',
       'Parallel Computing'],
    ];
    const academicYear = ['AY14/15', 'AY14/15', 'AY15/16', 'AY15/16', 'AY16/17', 'AY16/17', 'AY17/18', 'AY17/18'];
    const semesterNum = [1, 2, 1, 2, 1, 2, 1, 2];
    const semesterIndex = [];
    const plannerIDOne = createPlanner(plannerNames[0], focusArea[0], userID);

    for (var i=0; i < semesterNum.length; i++)  {
      semesterIndex.push(insertNewSemesterInPlanner(academicYear[i], semesterNum[i], plannerIDOne));
    }

    for (var i = 0; i< semesterIndex.length; i++) {
      for (var j = 0; j < modules.length; j++)  {
        insertOneModuleInSemester(i, modules[j], plannerIDOne);
      }
    }

    const plannerOne = Planner.findOne(plannerIDOne);
    const retrievedSemesters = plannerOne.semesters;

    expect(plannerOne.semesters).to.be.an('array');
    assert.equal(plannerOne._id, plannerIDOne);

    assert.equal(retrievedSemesters.length, 8);
    assert.equal(semesterIndex[0], 0);
    assert.equal(semesterIndex[1], 1);
    assert.equal(semesterIndex[2], 2);
    assert.equal(semesterIndex[3], 3);
    assert.equal(semesterIndex[4], 4);
    assert.equal(semesterIndex[5], 5);
    assert.equal(semesterIndex[6], 6);
    assert.equal(semesterIndex[7], 7);

    // checks for 1 semester the inserted modules match
    assert.equal(retrievedSemesters[0].moduleHashmap[modules[0]], modules[0]);
    assert.equal(retrievedSemesters[0].moduleHashmap[modules[1]], modules[1]);
    assert.equal(retrievedSemesters[0].moduleHashmap[modules[2]], modules[2]);
    assert.equal(retrievedSemesters[0].moduleHashmap[modules[3]], modules[3]);
  });

  afterEach(function ()  {
    const plannerIDs = getPlannerIDs(userID);

    removePlanner(plannerIDs[0]);

    const removedPlannerOne = Planner.findOne(plannerIDs[0]);
    expect(removedPlannerOne).to.be.an('undefined');
  });

  it ('get all modules from a semester given correct input', function() {
    const plannerIDs = getPlannerIDs(userID);

    const retrievedModules = getAllModulesInSemester(0, plannerIDs[0]);
    assert.equal(Object.keys(retrievedModules).length, 4);
    assert.equal(retrievedModules[modules[0]], modules[0]);
    assert.equal(retrievedModules[modules[1]], modules[1]);
    assert.equal(retrievedModules[modules[2]], modules[2]);
    assert.equal(retrievedModules[modules[3]], modules[3]);

  });

  it ('get a module in semester object', function () {
    const plannerIDs = getPlannerIDs(userID);

    const module = getOneModuleInSemester(0, modules[0], plannerIDs[0]);
    assert.equal(module, modules[0]);
  });

  it ('remove a module in semester object', function () {
    const plannerIDs = getPlannerIDs(userID);

    const module = deleteOneModuleInSemester(0, modules[0], plannerIDs[0]);
    assert.equal(module, modules[0]);
  });
});
