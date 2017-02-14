import { Planner } from '../planner/planner';

/* These methods will have to be converted to publish and subscription
    once autopublish is disabled
*/

  //Semester.schema.validate(newSem);

// inserts a module into the semester and returns the module name as a string
export const insertOneModuleInSemester = function insertOneModuleInSemester(semesterIndex, moduleName, plannerID) {
  const planner = Planner.findOne(plannerID);
  const retrievedSemesters = planner.semesters;
  const oneSemester = retrievedSemesters[semesterIndex];
  const modules = oneSemester.moduleHashmap;

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
  const retrievedSemesters = planner.semesters;
  const oneSemester = retrievedSemesters[semesterIndex];
  const modules = oneSemester.moduleHashmap;

  return modules[moduleName];
};

// deletes a module from the semester and returns the deleted module name as string
export const deleteOneModuleInSemester = function deleteOneModuleInSemester(semesterIndex, moduleName, plannerID) {
  const planner = Planner.findOne(plannerID);
  const retrievedSemesters = planner.semesters;
  const oneSemester = retrievedSemesters[semesterIndex];
  const modules = oneSemester.moduleHashmap;

  const deletedModule = modules[moduleName];
  delete modules[moduleName];

  oneSemester.moduleHashmap = modules;
  retrievedSemesters[semesterIndex] = oneSemester;
  Planner.update(plannerID, { $set: { semesters: retrievedSemesters } });

  return deletedModule;
};
