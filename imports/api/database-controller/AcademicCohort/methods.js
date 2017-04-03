import { AcademicCohort } from './acadCohort';
import { Planner } from '../../crud-controller/planner/planner';
import { Match } from 'meteor/check';

export const createNewCohort = function createCohort(cohortName) {
  const newCohortDocument = {
    cohortName: cohortName,
    cohortFocusAreaID: [],
    cohortGradRequirementID: [],
    cohortDefaultPlannerID:[]
  };

  const cohortSchema = AcademicCohort.simpleSchema();
  const isValid = Match.test(newCohortDocument, cohortSchema);

  if (isValid) {
    const result = AcademicCohort.insert(newCohortDocument);
    //console.log(result);
    return result;
  }

  return {};
}

export const insertGradRequirementToCohort = function insertOneGradRequirementIDToCohort(cohortName, newGradRequirementID)  {
  const targetCohort = AcademicCohort.findOne({cohortName: cohortName});
  const gradRequirementArray = targetCohort.cohortGradRequirementID;
  const cohortID = targetCohort._id;

  gradRequirementArray.push(newGradRequirementID);
  AcademicCohort.update({_id: cohortID}, {$set:{cohortGradRequirementID: gradRequirementArray}});
}

export const removeGradRequirementFromCohort  = function removeOneGraduationRequirementByID(cohortName, gradRequirementIDToRemove ) {
  const targetCohort = AcademicCohort.findOne({cohortName: cohortName});
  const gradRequirementArray = targetCohort.cohortGradRequirementID;
  const cohortID = targetCohort._id

  const IDindex = gradRequirementArray.indexOf(gradRequirementIDToRemove);

  if (IDindex == -1){
    return false;
  }
  gradRequirementArray.splice(IDindex,1);
  AcademicCohort.update({_id: cohortID}, {$set:{cohortGradRequirementID: gradRequirementArray}});
}

export const updateCohortGradRequirementIDs = function updateEntireCohortGraduationRequirementIDs(cohortName, newGradRequirementIDs ) {
  const targetCohort = AcademicCohort.find({cohortName: cohortName});
  if (targetCohort.count() == 0){
    console.log("no graduation requirement with name " + cohortName);
    return;
  }

  const targetCohortDocument = targetCohort.fetch()[0];
  const cohortID = targetCohortDocument._id;
  console.log("this cohort to be updated: " + targetCohortDocument["cohortName"]);
  AcademicCohort.update({_id: cohortID},{$set:{cohortGradRequirementID: newGradRequirementIDs}});
}

export const updateCohortDefaultPlannerID = function updateCohortDefaultPlannerID(cohortName,newCohortDefaultPlannerIDs) {
  const targetCohort = AcademicCohort.find({cohortName: cohortName});

  if (targetCohort.count() == 0) {
    console.log("no Academic Cohort with name " + cohortName);
    return;
  }

  const targetCohortDocument = targetCohort.fetch()[0];
  const cohortID = targetCohortDocument._id;
  console.log(cohortID);
  console.log( "this cohort to be updated: " + targetCohortDocument["cohortName"] );
  return AcademicCohort.update({_id: cohortID},{$set:{cohortDefaultPlannerID: newCohortDefaultPlannerIDs}});
}


export const insertFocusAreaToCohort  = function insertOneFocusAreaIDToAcadCohort(cohortName, newFocusAreaID ) {

  const targetCohort = AcademicCohort.findOne({cohortName: cohortName});
  const focusAreaArray = targetCohort.cohortFocusAreaID;
  const cohortID = targetCohort._id;
  console.log(targetCohort);
  // TO-DO: Check if focus area array exists
  focusAreaArray.push(newFocusAreaID);
  AcademicCohort.update({_id: cohortID}, {$set:{cohortFocusAreaID: focusAreaArray}});
}

export const removeFocusAreaFromCohort  = function removeOneFocusAreaIDFromAcadCohort(cohortName, focusAreaIDToRemove ) {
  const targetCohort = AcademicCohort.findOne({cohortName: cohortName});
  const focusAreaArray = targetCohort.cohortFocusAreaID;
  const cohortID = targetCohort._id

  const IDindex = focusAreaArray.indexOf(focusAreaIDToRemove);

  if (IDindex == -1){
    return false;
  }
  focusAreaArray.splice(IDindex,1);
  AcademicCohort.update({_id: cohortID}, {$set:{cohortFocusAreaID: focusAreaArray}});
}

export const updateCohortFocusAreaIDs = function(cohortName, newFocusAreaIDs){
  const targetCohort = AcademicCohort.find({cohortName: cohortName});
  console.log("matchingDocument: " + targetCohort.count());

  if (targetCohort.count() == 0){
    console.log("no graduation requirement with name " + cohortName);
    return;
  }

  const targetCohortDocument = targetCohort.fetch()[0];
  const cohortID = targetCohortDocument._id;
  console.log("this cohort to be updated: " + targetCohortDocument["cohortName"]);
  AcademicCohort.update({_id: cohortID},{$set:{cohortFocusAreaID: newFocusAreaIDs}});
}

// obtain all the stored Cohort from the server
export const getAllAcadCohort = function getAllCohort() {
  return AcademicCohort.find({}).fetch();
}

// obtain specific cohort document by name
export const getCohortByName = function getCohortByName(cohortName) {
  let result =  AcademicCohort.findOne({cohortName: cohortName});
  return result;
}

// obtain cohort by ID
export const getCohortByID = function getCohortByID(cohortID) {
  return AcademicCohort.findOne({_id: cohortID});
}

export const getAcadCohortDefaultPlannerIDs = function getAcadCohortDefaultPlannerID(cohortName){
  let resultCursor = AcademicCohort.find({cohortName: cohortName});
  if (resultCursor.count() != 1){
    console.log("there is no academic cohort with name " + cohortName + " in the database");
    return [];
  }

  let defaultPlanner = resultCursor.fetch()[0];
  if(!defaultPlanner){
    return [];
  }

  return defaultPlanner.cohortDefaultPlannerID;
}

export const getRepackagedDefaultPlannerIDs = function getRepackagedDefaultPlannerIDs(cohortName){
  let result = getAcadCohortDefaultPlannerIDs(cohortName);
  // result is an array
  if (!(typeof result === 'object')){
      return null;
  }

  if(result.length == 0){
    return null;
  }
  // repackaged the result
  const repackagedData = {}
  console.log(result);
  for(var i = 0; i < result.length ; i ++){
    // assumed the planner with the ID exists by db integrity
    let currentPlannerName = Planner.findOne({_id:result[i]}).name;
    repackagedData[currentPlannerName] = result[i];
  }

  return repackagedData;
}

export const getAcadCohortDataForSetup = function getCohortAndRepackaged() {
  const acadCohortData = AcademicCohort.find({}).fetch();
  const repackagedValue = [];
  // repackaged them following the label and value pattern for the UI
  for (var i = 0; i < acadCohortData.length;i++){
    let acadCohortYear = acadCohortData[i].cohortName;
    repackagedValue.push({label: acadCohortYear,
                          value: acadCohortYear});
  }

  return repackagedValue;
}
