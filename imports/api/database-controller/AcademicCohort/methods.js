import { AcademicCohort } from './acadCohort';
import { Match } from 'meteor/check';

export const createNewCohort = function createCohort(cohortName) {
  const newCohortDocument = {
    cohortName: cohortName,
    cohortFocusAreaID: [],
    cohortGradRequirementID: []
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

export const insertFocusAreaToCohort  = function insertOneFocusAreaIDToAcadCohort(cohortName, newFocusAreaID ) {
  const targetCohort = AcademicCohort.findOne({cohortName: cohortName});
  const focusAreaArray = targetCohort.cohortFocusAreaID;
  const cohortID = targetCohort._id;
  // TO-DO : Check if the focus area exists
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
