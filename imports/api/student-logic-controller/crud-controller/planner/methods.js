import { Planner } from './planner';
import { getStudentID } from '../../../profile/student/methods';
import { updateSemesterAcademicYearInPlanner } from '../semester/methods';
/**
 * creates a planner
 * @param  {string}    name of planner
 * @param  {[string]}  array of focus area
 * @return {string}    id of planner
 */
 export const createPlanner = function createPlanner(plannerName, focusArea) {
  let name = plannerName.trim(); // normalize and remove sandwiched whitespaces
  if (name === '') {
    name = 'Untitled';
  }

  if (getStudentID() === '')  {
    return '';
  }

  const newPlanner = {
    name: name,
    semesters: [],
    focusArea: focusArea,
    userID: getStudentID(),
  };

  const id = Planner.insert(newPlanner);
  return id;
};

/**
 * duplicates a planner
 * @param  {string}    id of planner
 * @return {string}    id of planner
 */
export const duplicatePlanner = function duplicatePlanner(plannerID)  {
  // find planner ID inside collection of planners
  const plannerToBeDuplicated = Planner.findOne(plannerID);

  // create a new planner and insert into current planner
  if (getStudentID() === '')  {
    return '';
  }

  const newPlanner = {
    name: plannerToBeDuplicated.name,
    semesters: plannerToBeDuplicated.semesters,
    focusArea: plannerToBeDuplicated.focusArea,
    userID: getStudentID(),
  };

  const id = Planner.insert(newPlanner);
  return id;
}

/**
 * retrieves focus area in a planner
 * @param {string}     id of planner
 * @return {[string]}    array of focus areas
 */
export const getPlannerFocusArea = function getPlannerFocusArea(plannerID) {
  const planner = Planner.findOne(plannerID);
  return planner.focusArea;
};

/**
 * retrieves name of planner
 * @param {string}     id of planner
 * @return {string}    name of planner
 */
 export const getPlannerName = function getPlannerName(plannerID) {
  const planner = Planner.findOne(plannerID);
  return planner.name;
};

/**
 * retrieves userID of planner
 * @param {string}     id of planner
 * @return {string}    userID of planner
 */
 export const getPlannerUserID = function getPlannerUserID(plannerID)  {
  const planner = Planner.findOne(plannerID);
  return planner.userID;
}

/**
 * retrieves plannerID of planner
 * @return {string}    id of planner
 */
 export const getPlannerIDs = function getPlannerIDs() {
  const id = getStudentID();

  const planners = Planner.find({userID: id}).fetch();
  const plannerIDs = [];

  // checks if planner is a legit return
  if (typeof planners != 'undefined') {
    for (var i = 0; i < planners.length; i++)  {
      plannerIDs.push(planners[i]._id);
    }
  }

  return plannerIDs;
}

/**
 * retrieves plannerID of planner, DO NOT USE IN PRODUCTION! ONLY FOR TESTING PURPOSES!
 * @param {string}     userID of planner
 * @return {string}    id of planner
 */
export const getPlannerIDsGivenUserID = function getPlannerGivenID(userID) {
  const planners = Planner.find({userID: userID}).fetch();
  const plannerIDs = [];

  // checks if planner is a legit return
  if (typeof planners != 'undefined') {
    for (var i = 0; i < planners.length; i++)  {
      plannerIDs.push(planners[i]._id);
    }
  }

  return plannerIDs;
}

/**
 * set focus area of planner
 * @param {string}     id of planner
 * @param {[string]}   new focus area of planner
 * @return {number}    number of updated documents in semeste
 */
 export const setPlannerFocusArea = function setPlannerFocusArea(plannerID, newFocusArea)  {
  const planner = Planner.findOne(plannerID);

  const numOfDocumentsUpdatedWithSemester = Planner.update(
     plannerID,
    { $set: { focusArea: newFocusArea } });
  return numOfDocumentsUpdatedWithSemester;
};

/**
 * set name of planner
 * @param {string}     id of planner
 * @param {string}   new name of planner
 * @return {number}    number of updated documents in semester
 */
 export const setPlannerName = function setPlannerName(plannerID, newPlannerName)  {
  newPlannerName = newPlannerName.trim(); // normalize and remove sandwiched whitespaces
  if (newPlannerName === '')  {
    return 0;
  }

  const planner = Planner.findOne(plannerID);

  const numOfDocumentsUpdatedWithSemester = Planner.update(
     plannerID,
    { $set: { name: newPlannerName } });

  return numOfDocumentsUpdatedWithSemester;
}

/**
 * remove planner
 * @param {string}     id of planner
 */
 export const removePlanner = function removePlanner(plannerID) {
  Planner.remove(plannerID);
};

/**
 * creates a planner given user ID, DO NOT USE IN PRODUCTION, ONLY FOR TESTING PURPOSES!
 * @param  {string}    name of planner
 * @param  {[string]}  array of focus area
 * @param {string}     id of user
 * @return {string}    id of planner
 */
 export const createPlannerGivenUserID = function createPlanner(plannerName, focusArea, userID) {
  let name = plannerName;
  if (name === '') {
    name = 'Untitled';
  }
  const newPlanner = {
    name: name,
    semesters: [],
    focusArea: focusArea,
    userID: userID,
  };

  const id = Planner.insert(newPlanner);
  return id;
};

/**
 * duplicates a planner given user ID, DO NOT USE IN PRODUCTION, ONLY FOR TESTING PURPOSES!
 * @param  {string}    id of planner
 * @param {string}     id of user
 * @return {string}    id of planner
 */
export const duplicatePlannerGivenUserID = function duplicatePlannerGivenUserID(plannerID, userID)  {
  // find planner ID inside collection of planners
  const plannerToBeDuplicated = Planner.findOne(plannerID);

  const newPlanner = {
    name: plannerToBeDuplicated.name,
    semesters: plannerToBeDuplicated.semesters,
    focusArea: plannerToBeDuplicated.focusArea,
    userID: userID,
  };

  const id = Planner.insert(newPlanner);
  return id;
}

/**
 * updates the academic year of a planner given academic year
 * @param  {string}    new academic year in the format AY XX/XX
 */
export const updateStudentPlannerAcademicYear = function updatePlannerAcademicYear(newAcademicYear) {
  const studentId = getStudentID();

  //find student list of planner
  const studentPlannerCursor = Planner.find({userID:studentId});
  if(studentPlannerCursor.count() <= 0){
    return;
  }

  const studentPlanners = studentPlannerCursor.fetch();
  //update academic Year
  for (var i = 0; i < studentPlannerCursor.count() ; i++){
    let currentStudentPlanner = studentPlanners[i];
    updateSemesterAcademicYearInPlanner(currentStudentPlanner, newAcademicYear);
  }
}
