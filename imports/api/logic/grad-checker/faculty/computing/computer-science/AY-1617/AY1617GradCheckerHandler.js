import { getCohortByName } from '../../../../../../database-controller/AcademicCohort/methods';
import { getGradRequirementModules } from '../../../../../../database-controller/graduation-requirement/methods';
import { findFoundationRequirementModules } from './foundation/methods';
import { findITProfessionalismModules } from './IT-professionalism/methods';
import { findMathSciRequirementModules } from './math-science/methods';
import { findTeamProjectRequirementModules } from './breadth-depth/team-project/methods';

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
export const AY1617CSGradChecker = function AY1617CSGradChecker(studentSemesters, studentAcademicCohort, studentExemptedModules, studentWaivedModules) {
  const moduleRequirementTitle = ['Computer Science Foundation', 'Computer Science Focus Area', 'Computer Systems Team Project', 'Industrial Experience Training', 'IT Professionalism', 'Mathematics and Sciences', 'Unrestricted Electives'];

  // retrieve foundation, IT-professionalism, Math-Sci and Breadth and Depth requirements here
  //const cohortInformation = getCohortByName(studentAcademicCohort);
  const cohortGradRequirementIDs = cohortInformation.cohortGradRequirementID;
  const allGradRequirements = getGradRequirementModules(cohortGradRequirementIDs);

  // append objects of string:bool objects into a list of objects and return to UI
  const graduationRequirements = {};
  for (var i=0; i<moduleRequirementTitle.length; i++) {
    graduationRequirements[moduleRequirementTitle[i]] = {};
  }

  //retrieve focus area requirements here

  /*
   * Send all planner information to every requirement check
   */

  // find university-level-requirements here

  // find foundation requirement modules objects and call function from relevant academic year
  const foundationDoc = allGradRequirements[moduleRequirementTitle[0]];
  const requiredMCsFoundation = allGradRequirements[moduleRequirementTitle[0]];
  graduationRequirements[moduleRequirementTitle[0]] = findFoundationRequirementModules(studentAcademicCohort, studentSemesters, foundationDoc, studentExemptedModules, studentWaivedModules, requiredMCsFoundation);

  // find computer science breadth and depth requirement modules
    // find focus area primary requirement modules objects

    // find focus area 4000 requirement modules objects

    // find computer systems team project requirement modules
    const teamProjectDoc = allGradRequirements[moduleRequirementTitle[2]];
    const requiredMCsTeamProject = allGradRequirements[moduleRequirementTitle[2]];
    graduationRequirements[moduleRequirementTitle[2]] = findTeamProjectRequirementModules(studentAcademicCohort, studentSemesters, teamProjectDoc, studentExemptedModules, studentWaivedModules, requiredMCsTeamProject);

    // find Industrial experience training requirement modules
    //const industrialExperienceDoc = allGradRequirements[moduleRequirementTitle[3]];


  // find IT-professionalism requirement modules objects
  const ITDoc = allGradRequirements[moduleRequirementTitle[4]];
  const requiredMCsIT = allGradRequirements[moduleRequirementTitle[4]];
  graduationRequirements[moduleRequirementTitle[4]] = findTeamProjectRequirementModules(studentAcademicCohort, studentSemesters, ITDoc, studentExemptedModules, studentWaivedModules, requiredMCsIT);

  // find math-science requirement modules objects
  const mathScienceDoc = allGradRequirements[moduleRequirementTitle[5]];
  const requiredMCsMathSci = allGradRequirements[moduleRequirementTitle[5]];
  graduationRequirements[moduleRequirementTitle[5]] = findTeamProjectRequirementModules(studentAcademicCohort, studentSemesters, mathScienceDoc, studentExemptedModules, studentWaivedModules, requiredMCsMathSci);

  // find unrestricted-electives requirement modules objects

  return graduationRequirements;
}
