import { Planner } from './planner';
import { getStudentID } from '../../database-controller/student/methods';

/**
 * creates a planner
 * @param  {string}    name of planner
 * @param  {[string]}  array of focus area
 * @param {string}     id of user
 * @return {string}    id of planner
 */
 export const createPlanner = function createPlanner(plannerName, focusArea, userID) {
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
  let id = '';
  if (getStudentID()) {
    id = getStudentID();
  }
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
