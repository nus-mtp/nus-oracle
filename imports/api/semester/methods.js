import { Planner } from '../planner/planner';

/* These methods will have to be converted to publish and subscription
    once autopublish is disabled
*/

  //Semester.schema.validate(newSem);

  // retrieves module object given a planner and semesterNum
export const insertModuleInSemester = function insertModuleInSemester(plannerID, semesterNum, module) {
  const planner = Planner.findOne(plannerID);
  const retrievedSemester = planner.semesters;
  const modules = retrievedSemester[semesterNum];
  modules[module.code] = module;

  retrievedSemester[semesterNum] = modules;
  Planner.update(plannerID, { $set: { semesters: retrievedSemester } });

  return retrievedSemester[semesterNum][module.code];
};

// retrieves module object given a planner and semesterNum
export const getModuleInSemester = function getModuleInSemester(plannerID, semesterNum, module) {
  const planner = Planner.findOne(plannerID);
  const retrievedSemester = planner.semesters;
  const modules = retrievedSemester[semesterNum];

  return modules[module.code];
};

// delete a module object given a planner and semester
export const deleteModuleInSemester = function deleteModuleInSemester(plannerID, semesterNum, module) {
  const planner = Planner.findOne(plannerID);
  const retrievedSemester = planner.semesters;
  const modules = retrievedSemester[semesterNum];

  delete modules[module.code];

  retrievedSemester[semesterNum] = modules;
  Planner.update(plannerID, { $set: { semesters: retrievedSemester } });

  return retrievedSemester[semesterNum];
};
