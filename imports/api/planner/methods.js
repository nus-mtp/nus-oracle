import { Planner } from './planner';

/* These methods will have to be converted to publish and subscription
    once autopublish is disabled
*/

// creates a new semester object in collection and returns the id
export const createPlanner = function createPlanner(plannerName, focusArea) {
  // create new empty semester schema and insert into Semester collection
  const newPlanner = {
    name: plannerName,
    semesters: {},
    userID: '',
    focusArea: focusArea,
  };

  // Semester.schema.validate(newSem);

  const id = Planner.insert(newPlanner);
  return id;
};

export const getPlannerFocusArea = function getPlannerFocusArea(plannerID) {
  const planner = Planner.findOne(plannerID);
  return planner.focusArea;
};

export const getPlannerName = function getPlannerName(plannerID) {
  const planner = Planner.findOne(plannerID);
  return planner.name;
};

// removes all semester associated with the planner and the planner document itself
export const removePlanner = function removePlanner(plannerID) {
  Planner.remove(plannerID);
};

// inserts into a semester the moduleID and returns how many documents were modified
export const insertNewSemesterInPlanner = function insertSemesterInPlanner(semesterNum, plannerID) {
  const planner = Planner.findOne(plannerID);

  const newSemesters = planner.semesters;

  newSemesters[semesterNum] = {};

  const numOfDocumentsUpdatedWithSemester = Planner.update(
     plannerID,
    { $set: { semesters: newSemesters } });

  return numOfDocumentsUpdatedWithSemester;
};

// retrieves moduleIDs and returns a Mongo Object
export const getSemesterInPlanner = function getSemesterInPlanner(semesterNum, plannerID) {
  const planner = Planner.findOne(plannerID);
  const retrievedSemester = planner.semesters;

  return retrievedSemester[semesterNum];
};

// delete a semester module in collection
export const deleteSemesterInPlanner = function deleteSemesterInPlanner(semesterNum, plannerID) {
  const planner = Planner.findOne(plannerID);

  const retrievedSemester = planner.semesters;
  delete retrievedSemester[semesterNum];

  const numOfDocumentsUpdatedWithSemester = Planner.update(
    { _id: plannerID },
    { $set: { semesters: retrievedSemester } },
  );
  return numOfDocumentsUpdatedWithSemester;
};
