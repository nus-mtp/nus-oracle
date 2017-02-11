import { Planner } from './planner';

/* These methods will have to be converted to publish and subscription
    once autopublish is disabled
*/

// creates a new semester object in collection and returns the id

export const createPlanner = function createPlanner(plannerName, focusArea) {
  // create new empty semester schema and insert into Semester collection
  const newPlanner = {
    name: plannerName,
    semesters: [],
    focusArea: focusArea,
    userID: '',
  };

  // Semester.schema.validate(newSem);

  const id = Planner.insert(newPlanner);
  return id;
};

// retrieves the focus area of the planner
export const getPlannerFocusArea = function getPlannerFocusArea(plannerID) {
  const planner = Planner.findOne(plannerID);
  return planner.focusArea;
};

// retrieves the name of the planner
export const getPlannerName = function getPlannerName(plannerID) {
  const planner = Planner.findOne(plannerID);
  return planner.name;
};

export const setPlannerFocusArea = function setPlannerFocusArea(plannerID, newFocusArea)  {
  const planner = Planner.findOne(plannerID);

  const numOfDocumentsUpdatedWithSemester = Planner.update(
     plannerID,
    { $set: { focusArea: newFocusArea } });
  return numOfDocumentsUpdatedWithSemester;
};

// removes all semester associated with the planner and the planner document itself
export const removePlanner = function removePlanner(plannerID) {
  Planner.remove(plannerID);
};

// inserts into a semester the moduleID and returns how many documents were modified
export const insertNewSemesterInPlanner = function insertNewSemesterInPlanner(academicYear, semesterNum, plannerID) {
  const semesterObject = {
    academicYear: academicYear,
    semesterNum: semesterNum,
    moduleHashmap: {},
  }

  const planner = Planner.findOne(plannerID);

  const retrievedSemester = planner.semesters;

  retrievedSemester.push(semesterObject);

  const numOfDocumentsUpdatedWithSemester = Planner.update(
     plannerID,
    { $set: { semesters: retrievedSemester } });

  return retrievedSemester.length-1;
};

// retrieves moduleIDs and returns a Mongo Object
export const getSemesterInPlanner = function getSemesterInPlanner(semesterIndex, plannerID) {
  const planner = Planner.findOne(plannerID);
  const retrievedSemester = planner.semesters;

  return retrievedSemester[semesterIndex];
};

// delete a semester module in collection
export const deleteSemesterInPlanner = function deleteSemesterInPlanner(semesterIndex, plannerID) {
  const planner = Planner.findOne(plannerID);

  const retrievedSemester = planner.semesters;
  retrievedSemester.pop();

  const numOfDocumentsUpdatedWithSemester = Planner.update(
    { _id: plannerID },
    { $set: { semesters: retrievedSemester } },
  );
  return retrievedSemester.length;
};
