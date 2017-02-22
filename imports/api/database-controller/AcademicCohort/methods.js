import { AcademicCohort } from './acadCohort';
import { Match } from 'meteor/check';

export const createNewCohort = function createCohort(cohortName) {
  const newCohortDocument = {
    cohortName: cohortName,
    cohortFocusAreaID: ['dummy']
  };

  const cohortSchema = AcademicCohort.simpleSchema();
  const isValid = Match.test(newCohortDocument, cohortSchema);

  if (isValid) {
    const result = AcademicCohort.insert(newCohortDocument);
    console.log(result);
    return result;
  }

  return {};
}

export const insertFocusAreaToCohort  = function(cohortName, newFocusAreaID ) {
  const targetCohort = AcademicCohort.findOne({cohortName: cohortName});
  const focusAreaArray = targetCohort.cohortFocusAreaID;
  const cohortID = targetCohort._id;
  // TO-DO : Check if the focus area exists
  focusAreaArray.push(newFocusAreaID);
  AcademicCohort.update({_id: cohortID}, {$set:{cohortFocusAreaID: focusAreaArray}});
}

export const removeFocusAreaFromCohort  = function(cohortName, focusAreaIDToRemove ) {
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
// obtain all the stored Cohort from the server
export const getAllAcadCohort = function getAllCohort() {
  return AcademicCohort.find({}).fetch();
}

// obtain specific cohort document by name
export const getCohortByName = function getCohortByName(cohortName) {
  return AcademicCohort.findOne({cohortName: cohortName});
}

// obtain cohort by ID
export const getCohortByID = function getCohortByID(cohortID) {
  return AcademicCohort.findOne({_id: cohortID});
}
