import { assert, expect } from 'meteor/practicalmeteor:chai';
import { Planner } from '../planner/planner';
import { populateModuleFixture,
         dePopulateModuleFixture } from '../../test-fixtures/modules';
import { createPlannerGivenUserID,
         removePlanner,
         getPlannerIDsGivenUserID } from '../planner/methods';
import { insertNewSemesterInPlanner } from '../semester/methods';
import { insertOneModuleInSemester,
         getAllModulesInSemester,
         getOneModuleInSemester,
         deleteOneModuleInSemester } from './methods';
import { m_insertOneModuleInSemester,
         m_getAllModulesInSemester,
         m_getOneModuleInSemester,
         m_deleteOneModuleInSemester } from './meteor-methods';

describe('modules', function () {
  const userID = 'akshhr31lci1lkal';
  const modules = ['CS1010', 'CS1020', 'CS2010', 'CS3230'];

  beforeEach(function (done)  {
    populateModuleFixture();
    const plannerNames = ['plannerOne'];
    const focusArea = [
      ['Computer Graphics And Games',
       'Parallel Computing'],
    ];
    const academicYear = ['AY 2013/2014', 'AY 2013/2014', 'AY 2014/2015', 'AY 2014/2015', 'AY 2015/2016', 'AY 2015/2016', 'AY 2016/2017', 'AY 2016/2017'];
    const semesterNum = [1, 2, 1, 2, 1, 2, 1, 2];
    const semesterIndex = [];
    const plannerIDOne = createPlannerGivenUserID(plannerNames[0], focusArea[0], userID);

    for (var i=0; i < semesterNum.length; i++)  {
      semesterIndex.push(insertNewSemesterInPlanner(academicYear[i], semesterNum[i], plannerIDOne));
    }

    for (var i = 0; i< semesterIndex.length; i++) {
      for (var j = 0; j < modules.length; j++)  {
        insertOneModuleInSemester(i, modules[j], plannerIDOne);
      }
    }

    done();

    /*
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
    */
  });

  afterEach(function (done)  {
    dePopulateModuleFixture();
    const plannerIDs = getPlannerIDsGivenUserID(userID);

    removePlanner(plannerIDs[0]);

    done();

    /*
    const removedPlannerOne = Planner.findOne(plannerIDs[0]);
    expect(removedPlannerOne).to.be.an('undefined');
    */
  });

  it ('returns an empty object when a wrong input is inserted', function() {
    const plannerIDs = getPlannerIDsGivenUserID(userID);
    const semesterIndex = 0;
    const moduleCode = '<script> console.log("LOL INJECTION") </script>';

    const retrievedModules = insertOneModuleInSemester(0, moduleCode, plannerIDs[0]);
    assert.equal(Object.keys(retrievedModules).length, 0);
  });

  it ('get all modules from a semester given correct input', function() {
    const plannerIDs = getPlannerIDsGivenUserID(userID);

    const retrievedModules = getAllModulesInSemester(0, plannerIDs[0]);
    assert.equal(Object.keys(retrievedModules).length, 4);
    assert.equal(retrievedModules[modules[0]], modules[0]);
    assert.equal(retrievedModules[modules[1]], modules[1]);
    assert.equal(retrievedModules[modules[2]], modules[2]);
    assert.equal(retrievedModules[modules[3]], modules[3]);

  });

  it ('get a module in semester object', function () {
    const plannerIDs = getPlannerIDsGivenUserID(userID);

    const module = getOneModuleInSemester(0, modules[0], plannerIDs[0]);
    assert.equal(module, modules[0]);
  });

  it ('remove a module in semester object', function () {
    const plannerIDs = getPlannerIDsGivenUserID(userID);

    const module = deleteOneModuleInSemester(0, modules[0], plannerIDs[0]);
    assert.equal(module, modules[0]);
  });

  it ('get all module using meteor methods', function() {
    const plannerIDs = getPlannerIDsGivenUserID(userID);
    const semesterIndex = 0;

    const retrievedModules = m_getAllModulesInSemester.call({
      semesterIndex: semesterIndex,
      plannerID: plannerIDs[0]
    });

    assert.equal(Object.keys(retrievedModules).length, 4);
    assert.equal(retrievedModules[modules[0]], modules[0]);
    assert.equal(retrievedModules[modules[1]], modules[1]);
    assert.equal(retrievedModules[modules[2]], modules[2]);
    assert.equal(retrievedModules[modules[3]], modules[3]);
  });

  it ('add a module using meteor methods', function() {
    const modCode = 'CS1010S';
    const plannerIDs = getPlannerIDsGivenUserID(userID);
    const semesterIndex = 0;

    const module = m_insertOneModuleInSemester.call({
      semesterIndex: semesterIndex,
      moduleCode: modCode,
      plannerID: plannerIDs[0]
    });
    assert.equal(module, modCode);
  });

  it ('get one module using meteor methods', function() {
    const modCode = 'CS1010';
    const plannerIDs = getPlannerIDsGivenUserID(userID);
    const semesterIndex = 0;

    const module = m_getOneModuleInSemester.call({
      semesterIndex: semesterIndex,
      moduleCode: modCode,
      plannerID: plannerIDs[0]
    });
    assert.equal(module, modCode);
  });

  it ('delete one module using meteor methods', function() {
    const modCode = 'CS1020';
    const plannerIDs = getPlannerIDsGivenUserID(userID);
    const semesterIndex = 0;

    const module = m_deleteOneModuleInSemester.call({
      semesterIndex: semesterIndex,
      moduleCode: modCode,
      plannerID: plannerIDs[0]
    });
    assert.equal(module, modCode);
  });
});
