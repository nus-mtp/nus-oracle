import { Planner } from '../planner/planner';
import { searchByModuleCode } from '../../../database-controller/module/methods';

/**
 * retrieves all modules in a semester
 * @param  {number}    index of semester
 * @param  {string}    id of planner
 * @return {{string}}  object of all modules in semester
 *
 */
export const getAllModulesInSemester = function getAllModulesInSemester(semesterIndex, plannerID) {
  const planner = Planner.findOne(plannerID);
  if (!planner) {
    return {};
  }

  const retrievedSemesters = planner.semesters;
  if (!retrievedSemesters) {
    return {};
  }

  // checks semester index is not larger than the size of semester
  if (semesterIndex > retrievedSemesters.length-1)  {
    return {};
  }

  const oneSemester = retrievedSemesters[semesterIndex];
  if (!oneSemester) {
    return {};
  }

  const modules = oneSemester.moduleHashmap;
  if (!modules) {
    return {};
  }

  return modules;
}

/**
 * inserts one module in a semester
 * @param  {number}    index of semester to be insert into
 * @param  {string}    module code
 * @param  {string}    id of planner to be inserted into
 * @return {string}    name of retrieved module in semester
 *
 */
 export const insertOneModuleInSemester = function insertOneModuleInSemester(semesterIndex, moduleCode, plannerID) {
   // checks if module exists in database
  if (Object.keys(searchByModuleCode(moduleCode)).length === 0) {
    return {};
  }

  const planner = Planner.findOne(plannerID);
  if (!planner) {
    return {};
  }
  const retrievedSemesters = planner.semesters;
  if (!retrievedSemesters) {
    return {};
  }

  // checks semester index is not larger than the size of semester
  if (semesterIndex > retrievedSemesters.length-1)  {
    return {};
  }

  const oneSemester = retrievedSemesters[semesterIndex];
  if (!oneSemester) {
    return {};
  }
  const modules = oneSemester.moduleHashmap;
  if (!modules) {
    return {};
  }

  // in the future, store moduleID instead of moduleCode
  modules[moduleCode] = moduleCode;

  oneSemester.moduleHashmap = modules;
  retrievedSemesters[semesterIndex] = oneSemester;
  Planner.update(plannerID, { $set: { semesters: retrievedSemesters } });

  return modules[moduleCode];
};

/**
 * retrieves one module in a semester
 * @param  {number}    index of semester to be insert into
 * @param  {string}    module code
 * @param  {string}    id of planner to be inserted into
 * @return {string}    name of retrieved module in semester
 *
 */
 export const getOneModuleInSemester = function getOneModuleInSemester(semesterIndex, moduleCode, plannerID) {
  const planner = Planner.findOne(plannerID);
  if (!planner) {
    return {};
  }
  const retrievedSemesters = planner.semesters;
  if (!retrievedSemesters) {
    return {};
  }

  // checks semester index is not larger than the size of semester
  if (semesterIndex > retrievedSemesters.length-1)  {
    return {};
  }

  const oneSemester = retrievedSemesters[semesterIndex];
  if (!oneSemester) {
    return {};
  }
  const modules = oneSemester.moduleHashmap;
  if (!modules) {
    return {};
  }

  return modules[moduleCode];
};

/**
 * deletes one module in a semester
 * @param  {number}    index of semester to be insert into
 * @param  {string}    module code
 * @param  {string}    id of planner to be inserted into
 * @return {string}    name of retrieved module in semester
 *
 */
export const deleteOneModuleInSemester = function deleteOneModuleInSemester(semesterIndex, moduleCode, plannerID) {
  const planner = Planner.findOne(plannerID);
  if (!planner) {
    return {};
  }
  const retrievedSemesters = planner.semesters;
  if (!retrievedSemesters) {
    return {};
  }

  // checks semester index is not larger than the size of semester
  if (semesterIndex > retrievedSemesters.length-1)  {
    return {};
  }

  const oneSemester = retrievedSemesters[semesterIndex];
  if (!oneSemester) {
    return {};
  }
  const modules = oneSemester.moduleHashmap;
  if (!modules) {
    return {};
  }

  const deletedModule = modules[moduleCode];
  delete modules[moduleCode];

  oneSemester.moduleHashmap = modules;
  retrievedSemesters[semesterIndex] = oneSemester;
  Planner.update(plannerID, { $set: { semesters: retrievedSemesters } });

  return deletedModule;
};

/**
 * deletes one module in a semester
 * @param  {number}    index of semester to be insert into
 * @param  {string}    id of planner to be inserted into
 * @return {string}    modules in that semester
 *
 */
export const deleteAllModulesInSemester = function deleteAllModulesInSemester(semesterIndex, plannerID) {
  const planner = Planner.findOne(plannerID);
  if (!planner) {
    return {};
  }
  const retrievedSemesters = planner.semesters;
  if (!retrievedSemesters) {
    return {};
  }

  // checks semester index is not larger than the size of semester
  if (semesterIndex > retrievedSemesters.length-1)  {
    return {};
  }

  const oneSemester = retrievedSemesters[semesterIndex];
  if (!oneSemester) {
    return {};
  }
  const modules = oneSemester.moduleHashmap;
  if (!modules) {
    return {};
  }

  oneSemester.moduleHashmap = {};
  retrievedSemesters[semesterIndex] = oneSemester;
  Planner.update(plannerID, { $set: { semesters: retrievedSemesters } });

  return oneSemester.moduleHashmap;
};

/**
 * deletes one module in a semester
 * @param  {string}    id of planner to be inserted into
 * @return {string}    total number of MCs in planner
 *
 */
export const getTotalMCsForAllModules = function getTotalMCsForAllModules(plannerID) {
  const planner = Planner.findOne(plannerID);
  let totalMCs = 0;
  if (!planner) {
    return totalMCs;
  }
  const retrievedSemesters = planner.semesters;
  if (!retrievedSemesters) {
    return totalMCs;
  }

  for (var i=0; i<retrievedSemesters.length; i++) {
    const oneSemester = Object.keys(retrievedSemesters[i].moduleHashmap);
    for (var j=0; j<oneSemester.length; j++)  {
      totalMCs += searchByModuleCode(oneSemester[j]).moduleMC;
    }
  }

  return totalMCs;
}
