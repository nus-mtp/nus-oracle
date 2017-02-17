import { Planner } from './planner';

/* These methods will have to be converted to publish and subscription
    once autopublish is disabled
*/

// creates a new planner
export const createPlanner = function createPlanner(plannerName, focusArea, userID) {
  const newPlanner = {
    name: plannerName,
    semesters: [],
    focusArea: focusArea,
    userID: userID,
  };

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

export const getPlannerUserID = function getPlannerUserID(plannerID)  {
  const planner = Planner.findOne(plannerID);
  return planner.userID;
}

// retrieve planner IDs given userID
export const getPlannerIDs = function getPlannerIDs(userID) {
  const planners = Planner.find({userID: userID}).fetch();

  const plannerIDs = [];

  for (var i = 0; i < planners.length; i++)  {
    plannerIDs.push(planners[i]._id);
  }

  return plannerIDs;
}

// set the planner focus areas
export const setPlannerFocusArea = function setPlannerFocusArea(plannerID, newFocusArea)  {
  const planner = Planner.findOne(plannerID);

  const numOfDocumentsUpdatedWithSemester = Planner.update(
     plannerID,
    { $set: { focusArea: newFocusArea } });
  return numOfDocumentsUpdatedWithSemester;
};

// sets the planner name
export const setPlannerName = function setPlannerName(plannerID, newPlannerName)  {
  const planner = Planner.findOne(plannerID);

  const numOfDocumentsUpdatedWithSemester = Planner.update(
     plannerID,
    { $set: { name: newPlannerName } });

  return numOfDocumentsUpdatedWithSemester;
}

// removes all the semesters associated with the planner and the planner itself
export const removePlanner = function removePlanner(plannerID) {
  Planner.remove(plannerID);
};

// inserts a new semester into the planner
// semester number refers to either semester 1 or semester 2
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

// get all semesters in planner
export const getAllSemestersInPlanner = function getAllSemestersInPlanner(plannerID)  {
  const planner = Planner.findOne(plannerID);
  if (!planner) {
    return [];
  }

  const retrievedSemester = planner.semesters;
  if (!retrievedSemester) {
    return [];
  }

  return retrievedSemester;
}

// retrieves a semester in the planner
export const getSemesterInPlanner = function getSemesterInPlanner(semesterIndex, plannerID) {
  const planner = Planner.findOne(plannerID);
  // return empty object when no planner is found
  if (!planner)  {
    return {};
  }

  const retrievedSemester = planner.semesters;
  if (!retrievedSemester)  {
    return {};
  }
  return retrievedSemester[semesterIndex];
};

// delete a semester in a planner
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
