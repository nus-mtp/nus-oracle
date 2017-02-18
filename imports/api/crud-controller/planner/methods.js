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

// retrieves the userID of the planner
export const getPlannerUserID = function getPlannerUserID(plannerID)  {
  const planner = Planner.findOne(plannerID);
  return planner.userID;
}

// retrieve planner IDs given userID
export const getPlannerIDs = function getPlannerIDs(userID) {
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
