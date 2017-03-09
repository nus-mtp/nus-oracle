import { createNewCohort,
         getCohortByName,
         insertGradRequirementToCohort,
         removeGradRequirementFromCohort,
         insertFocusAreaToCohort,
         removeFocusAreaFromCohort } from '../database-controller/AcademicCohort/methods';
import { populateGraduationRequirementsFixture } from './graduationRequirements';
import { GraduationRequirements } from '../database-controller/graduation-requirement/graduationRequirement';

export const populateAY1617AcademicCohortFixture = function populateAcademicCohortFixture() {
  const cohortName = 'AY 2016/2017';
  let cohortGradRequirementID = [];

  if (GraduationRequirements.find({}).count() === 0)  {
    cohortGradRequirementID = populateGraduationRequirementsFixture();
  }

  const id = createNewCohort(cohortName);

  for (var i=0; i<cohortGradRequirementID.length; i++) {
    insertGradRequirementToCohort(cohortName, cohortGradRequirementID[i]);
  }

  return id;
}

export const dePopulateAY1617AcademicCohortFixture = function dePopulateAY1617AcademicCohortFixture()  {
  const cohortName = 'AY 2016/2017';
  const cohort = getCohortByName(cohortName);

  for (var i=0; i<cohort.cohortGradRequirementID.length; i++) {
    removeGradRequirementFromCohort(cohortName, cohort.cohortGradRequirementID[i]);
  }
}
