import { assert, expect } from 'meteor/practicalmeteor:chai';
import { createPlanner,
          insertNewSemesterInPlanner } from '../../planner/methods';
import { insertOneModuleInSemester,
         getAllModulesInSemester,
         getOneModuleInSemester,
         deleteOneModuleInSemester } from '../methods';

describe('semesters', function () {
  // inserts a semester document into the mongo collection
  const plannerName = 'testPlannerTwo';
  const testAcademicYear = '14/15';
  const testSemesterNum = 1;
  const testUserID = 'akshhr31lci1lkal';

  const plannerID = createPlanner(plannerName, [], testUserID);
  insertNewSemesterInPlanner(testAcademicYear, testSemesterNum, plannerID);

  const testModuleName = 'CS1010';

  const moduleName = insertOneModuleInSemester(0, testModuleName, plannerID);

  it ('insert one module into semester object', function () {
    assert.equal(moduleName, 'CS1010');
  });

  it ('get all modules from a semester given correct input', function() {
    const modules = getAllModulesInSemester(0, plannerID);
    assert.equal(Object.keys(modules).length, 1);
    assert.equal(modules[moduleName], moduleName);
  });

  it ('get a module in semester object', function () {
    const module = getOneModuleInSemester(0, testModuleName, plannerID);
    assert.equal(module, 'CS1010');
  });

  it ('remove a module in semester object', function () {
    const module = deleteOneModuleInSemester(0, testModuleName, plannerID);
    assert.equal(module, 'CS1010');
  });
});
