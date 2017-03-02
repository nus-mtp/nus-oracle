import { getCohortByName } from '../database-controller/AcademicCohort/methods';

export const findFoundationRequirementModules = function findFoundationRequirementModules(academicCohort, exemptedModules, waivedModules) {
  const graduationReqs = getCohortByName(academicCohort);
  
}
