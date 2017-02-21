import { AcademicCohort } from './acadCohort';

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
