import { assert, expect } from 'meteor/practicalmeteor:chai';
import { Random } from 'meteor/random';
import { createPlanner,
          insertNewSemesterInPlanner } from '../planner/methods';
import { insertModuleInSemester,
         getModuleInSemester,
         deleteModuleInSemester } from './methods';

describe('semesters', function () {
  // inserts a semester document into the mongo collection
  const plannerName = 'testPlannerTwo';
  const semesterNum = 1;
  const plannerID = createPlanner(plannerName, []);
  insertNewSemesterInPlanner(semesterNum, plannerID);

  const testModule = {
    _id: Random.id(),
    code: 'CS1010',
  }

  const module = insertModuleInSemester(plannerID, semesterNum, testModule);

  it ('insert one module into semester object', function () {
    assert.equal(module.code, 'CS1010');
  });

  it ('get a module in semester object', function () {
    const module = getModuleInSemester(plannerID, semesterNum, testModule);
    assert.equal(module.code, 'CS1010');
  });

  it ('remove a module in semester object', function () {
    const module = deleteModuleInSemester(plannerID, semesterNum, testModule);
    assert.equal(Object.keys(module).length, 0);
  });
});
