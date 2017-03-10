import { createPlannerGivenUserID,
         removePlanner } from '../crud-controller/planner/methods';
import { insertNewSemesterInPlanner } from '../crud-controller/semester/methods';
import { insertOneModuleInSemester } from '../crud-controller/module/methods';

export const populatePlannerFixture = function populatePlannerFixture() {
  const userIDs = '9f91pejfj912ras';
  const plannerNames = ['testPlanner', 'testPlannerTwo', 'testPlannerThree', 'testPlannerFour', 'testPlannerFive'];
  const focusAreas = [['Com Graphics'], ['Com Graphics', 'Security'], ['Com Graphics'], ['Algorithms'], ['Com Graphics']];

  const academicYear = ['AY 2013/2014', 'AY 2013/2014', 'AY 2014/2015', 'AY 2014/2015', 'AY 2015/2016', 'AY 2015/2016', 'AY 2016/2017', 'AY 2016/2017'];
  const semesterNum = [1, 2, 1, 2, 1, 2, 1, 2];
  const semesterIndex = [0, 1, 2, 3, 4, 5, 6, 7];

  const modules = ['CS1010', 'CS1020', 'CS2010', 'CS3230'];
  const modulesTwo = ['CS1010X', 'CS1020', 'CS2010'];
  const modulesThree = ['IS1103', 'CS2101'];
  const modulesFour = ['MA1301', 'MA1521', 'MA1101R', 'PC1221X', 'LSM1301', 'ST2131', 'ST2132'];
  const modulesFive = ['CS3283', 'CS3284'];

  const plannerIDs = [];

  plannerIDs.push(createPlannerGivenUserID(plannerNames[0], focusAreas[0], userIDs));
  plannerIDs.push(createPlannerGivenUserID(plannerNames[1], focusAreas[1], userIDs));
  plannerIDs.push(createPlannerGivenUserID(plannerNames[2], focusAreas[2], userIDs));
  plannerIDs.push(createPlannerGivenUserID(plannerNames[3], focusAreas[3], userIDs));
  plannerIDs.push(createPlannerGivenUserID(plannerNames[4], focusAreas[4], userIDs));

  // create semesters
  populateSemesters(semesterIndex, academicYear, semesterNum, plannerIDs[0]);
  populateSemesters(semesterIndex, academicYear, semesterNum, plannerIDs[1]);
  populateSemesters(semesterIndex, academicYear, semesterNum, plannerIDs[2]);
  populateSemesters(semesterIndex, academicYear, semesterNum, plannerIDs[3]);
  populateSemesters(semesterIndex, academicYear, semesterNum, plannerIDs[4]);

  // for each semester, insert a module into the semester
  populateModulesInSemester(semesterIndex, modules, plannerIDs[0]);
  populateModulesInSemester(semesterIndex, modulesTwo, plannerIDs[1]);
  populateModulesInSemester(semesterIndex, modulesThree, plannerIDs[2]);
  populateModulesInSemester(semesterIndex, modulesFour, plannerIDs[3]);
  populateModulesInSemester(semesterIndex, modulesFive, plannerIDs[4]);

  return plannerIDs;
}

export const populateIndustrialPlannerFixture = function populateIndustrialPlannerFixture() {
  const userIDs = '9f91pejfj912ras';
  const modulesOne = ['CP3880'];
  const modulesTwo = ['CP3200', 'CP3202'];
  const plannerNames = ['testPlanner', 'testPlannerTwo'];
  const focusAreas = [['Com Graphics'], ['Com Graphics', 'Security']];

  const plannerIDs = [];

  const academicYear = ['AY 2016/2017', 'AY 2016/2017'];
  const semesterNum = [1, 2];
  const semesterIndex = [0, 1];

  plannerIDs.push(createPlannerGivenUserID(plannerNames[0], focusAreas[0], userIDs));
  plannerIDs.push(createPlannerGivenUserID(plannerNames[1], focusAreas[1], userIDs));

  populateSemesters(semesterIndex, academicYear, semesterNum, plannerIDs[0]);
  populateSemesters(semesterIndex, academicYear, semesterNum, plannerIDs[1]);

  populateModulesInSemester(semesterIndex, modulesOne, plannerIDs[0]);
  populateModulesInSemester(semesterIndex, modulesTwo, plannerIDs[1]);

  return plannerIDs;
}

export const populateULRFixture = function populateULRFixture() {
  const userIDs = '9f91pejfj912ras';
  const modulesOne = ['GEH1001', 'GEQ1917', 'GER1000', 'GES1002', 'GET1006'];
  const plannerNames = ['testPlanner'];
  const focusAreas = [['Com Graphics']];

  const plannerIDs = [];

  const academicYear = ['AY 2016/2017', 'AY 2016/2017'];
  const semesterNum = [1, 2];
  const semesterIndex = [0, 1];

  plannerIDs.push(createPlannerGivenUserID(plannerNames[0], focusAreas[0], userIDs));
  populateSemesters(semesterIndex, academicYear, semesterNum, plannerIDs[0]);
  populateModulesInSemester(semesterIndex, modulesOne, plannerIDs[0]);

  return plannerIDs;
}

export const dePopulatePlannerFixture = function dePopulatePlannerFixture(plannerIDs) {
  for (var i = 0; i<plannerIDs.length; i++)  {
    removePlanner(plannerIDs[i]);
  }
}

const populateSemesters = function populateSemesters(semesterIndex, academicYear, semesterNum, plannerID) {
  for (var i=0; i< semesterIndex.length; i++) {
    insertNewSemesterInPlanner(academicYear[i], semesterNum[i], plannerID);
  }
}

const populateModulesInSemester = function populateModulesInSemester(semesterIndex, modules, plannerID)  {
  for (var i = 0; i< semesterIndex.length; i++) {
    for (var j = 0; j < modules.length; j++)  {
      insertOneModuleInSemester(i, modules[j], plannerID);
    }
  }
}
