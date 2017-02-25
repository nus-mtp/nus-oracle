import { Planner } from '../planner/planner';
import { increaseAcadYearByOne } from '../../../utils/util';
import { getStudentAcademicCohort,
         getStudentID } from '../../database-controller/student/methods';

/**
 * insert academic year into planner
 * @param {string}   id of planner
 * @return {number}  index of last semester
 */
export const insertNewAcademicYearInPlanner = function insertNewAcademicYearInPlanner(plannerID) {
  const planner = Planner.findOne(plannerID);
  if (!planner) {
    return {};
  }

  // make sure to get the acad year from Student here
  let previousAcademicYear = getStudentAcademicCohort(getStudentID());

  const retrievedSemester = planner.semesters;
  if (retrievedSemester.length > 0) {
    previousAcademicYear = retrievedSemester[retrievedSemester.length-1].academicYear;
  }

  const firstSemLength = insertNewSemesterInPlanner(previousAcademicYear, 1, plannerID);
  const secondSemLength = insertNewSemesterInPlanner(previousAcademicYear, 2, plannerID);

  return secondSemLength;
};

/**
 * delete academic year into planner
 * @param {string}   id of planner
 * @return {number}  index of last semester
 */
export const deleteAcademicYearInPlanner = function deleteAcademicYearInPlanner(plannerID) {
  const planner = Planner.findOne(plannerID);

  const firstSemLength = deleteSemesterInPlanner(plannerID);

  // checks if after first sem is the 0th index, and if so, no more deleting can be done so return -1
  if (firstSemLength < 0)  {
    return firstSemLength;
  }

  const secondSemLength = deleteSemesterInPlanner(plannerID);

  return secondSemLength;
}

/**
 * insert semester into planner
 * @param {string}   academic year
 * @param {number}   semester number
 * @param {string}   id of planner
 * @return {number}  index of last semester
 */
export const insertNewSemesterInPlanner = function insertNewSemesterInPlanner(academicYear, semesterNum, plannerID) {
  const planner = Planner.findOne(plannerID);
  const retrievedSemester = planner.semesters;

  // retrieve previous academic year as student's academic year
  //let previousAcademicYear = getCurrentAcademicCohort();

  const newAcadYear = increaseAcadYearByOne(academicYear);

  // retrieve previous academic year
  //if (retrievedSemester.length > 0) {
    //
  //}

  const semesterObject = {
    academicYear: newAcadYear,
    semesterNum: semesterNum,
    moduleHashmap: {},
  }

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
  if (!planner)
   {
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
export const deleteSemesterInPlanner = function deleteSemesterInPlanner(plannerID) {
  const planner = Planner.findOne(plannerID);

  const retrievedSemester = planner.semesters;
  // checks if retrieved semester is empty, if so return nothing
  if (retrievedSemester.length < 0) {
    return 0;
  }

  retrievedSemester.pop();

  const numOfDocumentsUpdatedWithSemester = Planner.update(
    { _id: plannerID },
    { $set: { semesters: retrievedSemester } },
  );
  return retrievedSemester.length-1;
};
