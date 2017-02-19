import { Planner } from '../planner/planner';

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
