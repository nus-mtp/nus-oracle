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
  const moduleRequirementTitle = ['Math and Science',  'IT-professionalism', 'foundation'];
  const cohortInformation = getCohortByName(getStudentAcademicCohort());

  // find foundation requireent modules objects
  const foundation = cohortInformation.cohortGradRequirementID;

  tempGradList = getGradRequirementModulesByID(foundation[i], name);

  // find IT-professionaism requirement modules objects


  // find math-science requirement modules objects

  // find breadth and depth requirement modules objects

  // find unrestricted-electives requirement modules objects

  // append objects of string:bool objects into a list of objects and return to UI
  const graduationRequirements = {};

  return graduationRequirements;
}
