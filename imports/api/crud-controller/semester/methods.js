import { Planner } from '../planner/planner';

/* These methods will have to be converted to publish and subscription
    once autopublish is disabled
*/

  //Semester.schema.validate(newSem);

// get all modules in semester in an array
// write test case for to check what if semesterIndex does not exist
export const getAllModulesInSemester = function getAllModulesInSemester(semesterIndex, plannerID) {
  const planner = Planner.findOne(plannerID);
  if (!planner) {
    return {};
  }

  const retrievedSemesters = planner.semesters;
  if (!retrievedSemesters) {
    return {};
  }

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

// inserts a module into the semester and returns the module name as a string
export const insertOneModuleInSemester = function insertOneModuleInSemester(semesterIndex, moduleName, plannerID) {
  const planner = Planner.findOne(plannerID);
  if (!planner) {
    return {};
  }
  const retrievedSemesters = planner.semesters;
  if (!retrievedSemesters) {
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

  // in the future, store moduleID instead of moduleName
  modules[moduleName] = moduleName;

  oneSemester.moduleHashmap = modules;
  retrievedSemesters[semesterIndex] = oneSemester;
  Planner.update(plannerID, { $set: { semesters: retrievedSemesters } });

  return modules[moduleName];
};

// retrieves module from the semester and returns the module name as a string
export const getOneModuleInSemester = function getOneModuleInSemester(semesterIndex, moduleName, plannerID) {
  const planner = Planner.findOne(plannerID);
  if (!planner) {
    return {};
  }
  const retrievedSemesters = planner.semesters;
  if (!retrievedSemesters) {
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

  return modules[moduleName];
};

// deletes a module from the semester and returns the deleted module name as string
export const deleteOneModuleInSemester = function deleteOneModuleInSemester(semesterIndex, moduleName, plannerID) {
  const planner = Planner.findOne(plannerID);
  if (!modules) {
    return {};
  }
  const retrievedSemesters = planner.semesters;
  if (!retrievedSemesters) {
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

  const deletedModule = modules[moduleName];
  delete modules[moduleName];

  oneSemester.moduleHashmap = modules;
  retrievedSemesters[semesterIndex] = oneSemester;
  Planner.update(plannerID, { $set: { semesters: retrievedSemesters } });

  return deletedModule;
};
