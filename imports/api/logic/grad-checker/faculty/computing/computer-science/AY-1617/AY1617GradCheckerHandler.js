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
  const graduationMCs = 160;
  const moduleRequirementTitle = ['Computer Science Foundation', 'Computer Science Focus Area', 'Computer Systems Team Project', 'Industrial Experience Training', 'IT Professionalism', 'Mathematics and Sciences', 'Unrestricted Electives'];
  const universityLevelTitle = 'University Level Requirement';

  const graduationRequirements = {};

  const cohortInformation = getCohortByName(studentAcademicCohort);
  if (!cohortInformation) {
    return graduationRequirements;
  }

  // retrieve foundation, IT-professionalism, Math-Sci and Breadth and Depth requirements here
  //const cohortInformation = getCohortByName(studentAcademicCohort);
  const cohortGradRequirementIDs = cohortInformation.cohortGradRequirementID;
  const allGradRequirements = getGradRequirementModules(cohortGradRequirementIDs);
  if (!allGradRequirements) {
    return graduationRequirements;
  }
  // append objects of string:bool objects into a list of objects and return to UI
  for (var i=0; i<moduleRequirementTitle.length; i++) {
    graduationRequirements[moduleRequirementTitle[i]] = {};
  }

  //retrieve focus area requirements here

  /*
   * Send all planner information to every requirement check
   */

  // find university-level-requirements here
  const ULRRequirements = allGradRequirements[universityLevelTitle].requirementModules;
  const requiredMCsULR = allGradRequirements[universityLevelTitle].requirementMCs;
  graduationRequirements[universityLevelTitle] = findFoundationRequirementModules(studentAcademicCohort, studentSemesters, ULRRequirements, studentExemptedModules, studentWaivedModules, requiredMCsULR);

  // find foundation requirement modules objects and call function from relevant academic year
  const foundationRequirements = allGradRequirements[moduleRequirementTitle[0]].requirementModules;
  const requiredMCsFoundation = allGradRequirements[moduleRequirementTitle[0]].requirementMCs;
  graduationRequirements[moduleRequirementTitle[0]] = findFoundationRequirementModules(studentAcademicCohort, studentSemesters, foundationRequirements, studentExemptedModules, studentWaivedModules, requiredMCsFoundation);

  // find computer science breadth and depth requirement modules
    // find focus area primary requirement modules objects

    // find focus area 4000 requirement modules objects

    // find computer systems team project requirement modules
    const teamProjectRequirements = allGradRequirements[moduleRequirementTitle[2]].requirementModules;
    const requiredMCsTeamProject = allGradRequirements[moduleRequirementTitle[2]].requirementMCs;
    graduationRequirements[moduleRequirementTitle[2]] = findTeamProjectRequirementModules(studentAcademicCohort, studentSemesters, teamProjectRequirements, studentExemptedModules, studentWaivedModules, requiredMCsTeamProject);

    // find Industrial experience training requirement modules
    const industrialExperienceRequirements = allGradRequirements[moduleRequirementTitle[3]].requirementModules;
    const requiredMCsIndustrialExperience = allGradRequirements[moduleRequirementTitle[3]].requirementMCs;
    graduationRequirements[moduleRequirementTitle[3]] = findTeamProjectRequirementModules(studentAcademicCohort, studentSemesters, industrialExperienceRequirements, studentExemptedModules, studentWaivedModules, requiredMCsTeamProject);

  // find IT-professionalism requirement modules objects
  const ITRequirements = allGradRequirements[moduleRequirementTitle[4]].requirementModules;
  const requiredMCsIT = allGradRequirements[moduleRequirementTitle[4]].requirementMCs;
  graduationRequirements[moduleRequirementTitle[4]] = findTeamProjectRequirementModules(studentAcademicCohort, studentSemesters, ITRequirements, studentExemptedModules, studentWaivedModules, requiredMCsIT);

  // find math-science requirement modules objects
  const mathScienceRequirements = allGradRequirements[moduleRequirementTitle[5]].requirementModules;
  const requiredMCsMathSci = allGradRequirements[moduleRequirementTitle[5]].requirementMCs;
  graduationRequirements[moduleRequirementTitle[5]] = findTeamProjectRequirementModules(studentAcademicCohort, studentSemesters, mathScienceRequirements, studentExemptedModules, studentWaivedModules, requiredMCsMathSci);

  // find unrestricted-electives requirement modules objects


  return graduationRequirements;
}
