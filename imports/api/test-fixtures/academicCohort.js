import { createNewCohort,
         getCohortByName,
         insertGradRequirementToCohort,
         removeGradRequirementFromCohort,
         insertFocusAreaToCohort,
         removeFocusAreaFromCohort } from '../database-controller/AcademicCohort/methods';
import { populateGraduationRequirementsFixture } from './graduationRequirements';
import { populateComputerGraphicsFocusAreaRequirementsFixture } from './focusArea';
import { GraduationRequirements } from '../database-controller/graduation-requirement/graduationRequirement';
import { FocusArea } from '../database-controller/focus-area/focusArea';

export const populateAY1617AcademicCohortFixture = function populateAcademicCohortFixture() {
  const cohortName = 'AY 2016/2017';
  let cohortGradRequirementID = [];
  let cohortFocusAreaID = [];

  if (GraduationRequirements.find({}).count() === 0)  {
    cohortGradRequirementID = populateGraduationRequirementsFixture();
  }
  if (FocusArea.find({}).count() === 0) {
    cohortFocusAreaID = populateComputerGraphicsFocusAreaRequirementsFixture();
  }

  const id = createNewCohort(cohortName);

  for (var i=0; i<cohortGradRequirementID.length; i++) {
    insertGradRequirementToCohort(cohortName, cohortGradRequirementID[i]);
  }
  for (var i=0; i<cohortFocusAreaID.length; i++)  {
    insertFocusAreaToCohort(cohortName, cohortFocusAreaID[i]);
  }

  return id;
}

export const dePopulateAY1617AcademicCohortFixture = function dePopulateAY1617AcademicCohortFixture()  {
  const cohortName = 'AY 2016/2017';
  const cohort = getCohortByName(cohortName);

  for (var i=0; i<cohort.cohortGradRequirementID.length; i++) {
    removeGradRequirementFromCohort(cohortName, cohort.cohortGradRequirementID[i]);
  }
  for (var i=0; i<cohort.cohortFocusAreaID.length; i++) {
    removeGradRequirementFromCohort(cohortName, cohort.cohortFocusAreaID[i]);
  }
}
