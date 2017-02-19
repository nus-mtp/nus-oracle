import { Planner } from '../planner/planner';

/**
 * insert semester into planner
 * @param {string}   academic year
 * @param {number}   semester number
 * @param {string}   id of planner
 * @return {number}  index of last semester
 */
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

/**
 * get all semesters in planner
 * @param {string}   id of planner
 * @return {[object]}  array of semester objects
 */
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

/**
 * retrieves a semester in planner
 * @param {number}   index of semester
 * @param {string}   id of planner
 * @return {object}  one semester object
 */
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

/**
 * deletes a semester in planner
 * @param {number}   index of semester
 * @param {string}   id of planner
 * @return {object}  index of last semester
 */
export const deleteSemesterInPlanner = function deleteSemesterInPlanner(semesterIndex, plannerID) {
  const planner = Planner.findOne(plannerID);

  const retrievedSemester = planner.semesters;
  retrievedSemester.pop();

  const numOfDocumentsUpdatedWithSemester = Planner.update(
    { _id: plannerID },
    { $set: { semesters: retrievedSemester } },
  );
  return retrievedSemester.length-1;
};
