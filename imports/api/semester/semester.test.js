import { assert, expect } from 'meteor/practicalmeteor:chai';
import { Random } from 'meteor/random';
import { createPlanner,
          insertNewSemesterInPlanner } from '../planner/methods';
import { insertOneModuleInSemester,
         getOneModuleInSemester,
         deleteOneModuleInSemester } from './methods';

describe('semesters', function () {
  // inserts a semester document into the mongo collection
  const plannerName = 'testPlannerTwo';
  const testAcademicYear = '14/15';
  const testSemesterNum = 1;

  const plannerID = createPlanner(plannerName, []);
  insertNewSemesterInPlanner(testAcademicYear, testSemesterNum, plannerID);

  const testModuleName = 'CS1010';

  const moduleName = insertOneModuleInSemester(0, testModuleName, plannerID);

  it ('insert one module into semester object', function () {
    assert.equal(moduleName, 'CS1010');
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
