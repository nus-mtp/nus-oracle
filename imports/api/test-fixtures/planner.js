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
  for (var i=0; i< semesterIndex.length; i++) {
    insertNewSemesterInPlanner(academicYear[i], semesterNum[i], plannerIDs[0]);
  }
  for (var i=0; i< semesterIndex.length; i++) {
    insertNewSemesterInPlanner(academicYear[i], semesterNum[i], plannerIDs[1]);
  }
  for (var i=0; i< semesterIndex.length; i++) {
    insertNewSemesterInPlanner(academicYear[i], semesterNum[i], plannerIDs[2]);
  }
  for (var i=0; i< semesterIndex.length; i++) {
    insertNewSemesterInPlanner(academicYear[i], semesterNum[i], plannerIDs[3]);
  }
  for (var i=0; i< semesterIndex.length; i++) {
    insertNewSemesterInPlanner(academicYear[i], semesterNum[i], plannerIDs[4]);
  }

  // for each semester, insert a module into the semester
  for (var i = 0; i< semesterIndex.length; i++) {
    for (var j = 0; j < modules.length; j++)  {
      insertOneModuleInSemester(i, modules[j], plannerIDs[0]);
    }
  }
  for (var i = 0; i< semesterIndex.length; i++) {
    for (var j = 0; j < modulesTwo.length; j++)  {
      insertOneModuleInSemester(i, modulesTwo[j], plannerIDs[1]);
    }
  }
  for (var i = 0; i< semesterIndex.length; i++) {
    for (var j = 0; j < modulesThree.length; j++)  {
      insertOneModuleInSemester(i, modulesThree[j], plannerIDs[2]);
    }
  }
  for (var i = 0; i< semesterIndex.length; i++) {
    for (var j = 0; j < modulesFour.length; j++)  {
      insertOneModuleInSemester(i, modulesFour[j], plannerIDs[3]);
    }
  }
  for (var i = 0; i< semesterIndex.length; i++) {
    for (var j = 0; j < modulesFive.length; j++)  {
      insertOneModuleInSemester(i, modulesFive[j], plannerIDs[4]);
    }
  }

  return plannerIDs;
}

export const dePopulatePlannerFixture = function dePopulatePlannerFixture(plannerIDs) {
  for (var i = 0; i<plannerIDs.length; i++)  {
    removePlanner(plannerIDs[i]);
  }
}
