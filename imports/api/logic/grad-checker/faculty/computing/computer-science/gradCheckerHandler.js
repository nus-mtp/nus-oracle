import { getCohortByName } from '../../../../../../database-controller/AcademicCohort/methods';
import { getGradRequirementModules } from '../../../../../../database-controller/graduation-requirement/methods';
import { getStudentAcademicCohort,
         getStudentExemptedModules,
         getStudentWaivedModules } from '../../../../../../database-controller/student/methods';

/*
 * Check student's
 * 1. Academic Cohort
 * 2. Major
 */

/**
* retrieves an object of string boolean objects for each graduation requirement
*  @param {objects}  a full appended object list of all the modules in a student planner 
*  @return {{objects}}  object of all graduation
*
*/
export const csGradChecker = function csGradChecker(studentPlanner) {
  const moduleRequirementTitle = ['Computer Science Foundation', 'Computer Science Focus Area', 'Computer Systems Team Project', 'Industrial Experience Training', 'IT Professionalism', 'Mathematics and Sciences', 'Unrestricted Electives'];

  const studentAcademicCohort = getStudentAcademicCohort();

  // retrieve foundation, IT-professionalism, Math-Sci and Breadth and Depth requirements here
  const cohortInformation = getCohortByName(studentAcademicCohort);
  const cohortGradRequirementIDs = cohortInformation.cohortGradRequirementID;
  const allGradRequirements = getGradRequirementModules(cohortGradRequirementIDs);

  //retrieve focus area requirements here

  /*
   * Send all planner information to every requirement check
   */

  // find university-level-requirements here

  // find foundation requirement modules objects and call function from relevant academic year
  const foundationDoc = allGradRequirements[moduleRequirementTitle[0]];

  // find computer science breadth and depth requirement modules
    // find focus area primary requirement modules objects

    // find focus area 4000 requirement modules objects

    // find computer systems team project requirement modules
    const computerSystemsDoc = allGradRequirements[moduleRequirementTitle[2]];

    // find Industrial experience training requirement modules
    const industrialExperienceDoc = allGradRequirements[moduleRequirementTitle[3]];


  // find IT-professionalism requirement modules objects
  const ITDoc = allGradRequirements[moduleRequirementTitle[4]];

  // find math-science requirement modules objects
  const mathScience = allGradRequirements[moduleRequirementTitle[5]];

  // find unrestricted-electives requirement modules objects

  // append objects of string:bool objects into a list of objects and return to UI
  const graduationRequirements = {};

  return graduationRequirements;
}
