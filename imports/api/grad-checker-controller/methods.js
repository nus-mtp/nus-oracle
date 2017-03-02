import { getCohortByName } from '../database-controller/AcademicCohort/methods';
import { getGradRequirementModulesByID } from '../database-controller/graduation-requirement/methods';
import { getStudentAcademicCohort,
         getStudentExemptedModules,
         getStudentWaivedModules } from '../database-controller/student/methods';

/*
 * Check student's
 * 1. Academic Cohort
 * 2. Major
 */

/**
* retrieves an object of string boolean objects for each graduation requirement
* @return {{objects}}  object of all graduation
*
*/
export const csGradChecker = function csGradChecker() {
  const moduleRequirementTitle = ['Computer Science Foundation', 'Computer Science Breadth and Depth', 'IT Professionalism', 'Mathematics and Sciences', 'Unrestricted Electives'];

  const studentAcademicCohort = getStudentAcademicCohort();

  const cohortInformation = getCohortByName(studentAcademicCohort);

  const requirementModules = cohortInformation.cohortGradRequirementID;

  // find foundation requirement modules objects and call function from relevant academic year
  
  // find breadth and depth requirement modules objects

  // find IT-professionalism requirement modules objects

  // find math-science requirement modules objects

  // find unrestricted-electives requirement modules objects

  // append objects of string:bool objects into a list of objects and return to UI
  const graduationRequirements = {};

  return graduationRequirements;
}
