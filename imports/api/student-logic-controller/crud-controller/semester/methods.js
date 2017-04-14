import { Planner } from '../planner/planner';
import { increaseAcadYearByOne } from '../../../../utils/util';
import { getStudentAcademicCohort,
         getStudentID } from '../../../profile/student/methods';

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

  let previousAcademicYear = '';
  let semLength = 0;

  const retrievedSemester = planner.semesters;
  if (retrievedSemester.length > 0) {
    previousAcademicYear = increaseAcadYearByOne(retrievedSemester[retrievedSemester.length-1].academicYear);
  } else {
    // make sure to get the acad year from Student here
    previousAcademicYear = getStudentAcademicCohort(getStudentID());
  }

  for (var i=0; i<4; i++) {
    semLength = insertNewSemesterInPlanner(previousAcademicYear, i+1, plannerID);
  }

  return semLength;
};

/**
 * delete academic year into planner
 * @param {string}   id of planner
 * @return {number}  index of last semester
 */
export const deleteAcademicYearInPlanner = function deleteAcademicYearInPlanner(plannerID) {
  const planner = Planner.findOne(plannerID);
  let semLength = 0;

  for (var i=0; i<4; i++) {
    semLength = deleteSemesterInPlanner(plannerID);
    // checks if after first sem is the 0th index, and if so, no more deleting can be done so return -1
    if (semLength < 0)  {
      return semLength;
    }
  }

  return semLength;
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

  // retrieve previous academic year
  //if (retrievedSemester.length > 0) {
    //
  //}

  const semesterObject = {
    academicYear: academicYear,
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

export const updateSemesterAcademicYearInPlanner = function updateSemesterAcademicYearInPlanner(planner, newAcadYear){
  let currentAcademicYear = newAcadYear;
  const retrievedSemester = planner.semesters;
  // checks if retrieved semester is empty, if so return nothing
  if (retrievedSemester.length <= 0) {
    return 0;
  }

  for (var i = 0; i < retrievedSemester.length; i++){
    if (i%4 == 0 && i != 0){
      currentAcademicYear = increaseAcadYearByOne(currentAcademicYear);
    }

    retrievedSemester[i].academicYear = currentAcademicYear;
  }

  //update the semester back to the planner
  return Planner.update({"_id": planner._id},{ $set: { "semesters": retrievedSemester } });
}
