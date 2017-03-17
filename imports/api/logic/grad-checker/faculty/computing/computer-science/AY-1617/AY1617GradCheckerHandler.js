import { getCohortByName } from '../../../../../../database-controller/AcademicCohort/methods';
import { getGradRequirementModules,
         getGradRequirementMCs } from '../../../../../../database-controller/graduation-requirement/methods';
import { findFoundationRequirementModules } from './foundation/methods';
import { findITProfessionalismModules } from './IT-professionalism/methods';
import { findMathSciRequirementModules } from './math-science/methods';
import { findTeamProjectRequirementModules } from './breadth-depth/team-project/methods';
import { findIndustrialExperienceTrainingModules } from './breadth-depth/industrial-experience/methods';
import { findULRRequirementModules } from '../../../../university-level-requirements/AY-1617/methods';

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
  const moduleRequirementTitle = ['Computer Science Foundation',
                                  'Computer Science Focus Area',
                                  'Computer Systems Team Project',
                                  'Industrial Experience Training',
                                  'IT Professionalism','Mathematics and Sciences',
                                  'Unrestricted Electives', 'University Level Requirement'];

  let graduationRequirements = {};
  let UIFormatGraduationRequirement = {
    name: 'Graduation Requirements',
    children: [],
    isFulfilled: false
  };

  if (!studentSemesters) {
    return graduationRequirements;
  }
  const cohortInformation = getCohortByName(studentAcademicCohort);
  if (!cohortInformation) {
    return graduationRequirements;
  }

  // retrieve foundation, IT-professionalism, Math-Sci and Breadth and Depth requirements here
  //const cohortInformation = getCohortByName(studentAcademicCohort);
  const cohortGradRequirementIDs = cohortInformation.cohortGradRequirementID;
  const allGradRequirements = getGradRequirementModules(cohortGradRequirementIDs);
  const allGraduationRequirementMCs = getGradRequirementMCs(cohortGradRequirementIDs);

  if (Object.keys(allGradRequirements).length === 0 || !allGradRequirements ||
      !allGraduationRequirementMCs) {
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

  const ULRRequirements = allGradRequirements[moduleRequirementTitle[7]];
  const requiredMCsULR = allGraduationRequirementMCs[moduleRequirementTitle[7]];
  graduationRequirements[moduleRequirementTitle[7]] = findULRRequirementModules(studentAcademicCohort, studentSemesters, ULRRequirements, studentExemptedModules, studentWaivedModules, requiredMCsULR);
  if (Object.keys(graduationRequirements[moduleRequirementTitle[7]]).length > 0)  {
  UIFormatGraduationRequirement.children.push(UIFormatConversion(graduationRequirements[moduleRequirementTitle[7]].name,
                                                                 graduationRequirements[moduleRequirementTitle[7]].markedULRModules,
                                                                 graduationRequirements[moduleRequirementTitle[7]].isFulfilled));
  }

  // find foundation requirement modules objects and call function from relevant academic year
  const foundationRequirements = allGradRequirements[moduleRequirementTitle[0]];
  const requiredMCsFoundation = allGraduationRequirementMCs[moduleRequirementTitle[0]];
  graduationRequirements[moduleRequirementTitle[0]] = findFoundationRequirementModules(studentAcademicCohort, studentSemesters, foundationRequirements, studentExemptedModules, studentWaivedModules, requiredMCsFoundation);
  if (Object.keys(graduationRequirements[moduleRequirementTitle[0]]).length > 0)  {
    UIFormatGraduationRequirement.children.push(UIFormatConversion(graduationRequirements[moduleRequirementTitle[0]].name,
                                                                   graduationRequirements[moduleRequirementTitle[0]].markedFoundationModules,
                                                                   graduationRequirements[moduleRequirementTitle[0]].isFulfilled));
  }

  // find computer science breadth and depth requirement modules
    // find focus area primary requirement modules objects

    // find focus area 4000 requirement modules objects

    // find computer systems team project requirement modules
    const teamProjectRequirements = allGradRequirements[moduleRequirementTitle[2]];
    const requiredMCsTeamProject = allGraduationRequirementMCs[moduleRequirementTitle[2]];
    graduationRequirements[moduleRequirementTitle[2]] = findTeamProjectRequirementModules(studentAcademicCohort, studentSemesters, teamProjectRequirements, studentExemptedModules, studentWaivedModules, requiredMCsTeamProject);
    if (Object.keys(graduationRequirements[moduleRequirementTitle[2]]).length > 0)  {
      UIFormatGraduationRequirement.children.push(UIFormatConversion(graduationRequirements[moduleRequirementTitle[2]].name,
                                                                     graduationRequirements[moduleRequirementTitle[2]].markedTeamProjectModules,
                                                                     graduationRequirements[moduleRequirementTitle[2]].isFulfilled));
    }

    // find Industrial experience training requirement modules
    const industrialExperienceRequirements = allGradRequirements[moduleRequirementTitle[3]];
    const requiredMCsIndustrialExperience = allGraduationRequirementMCs[moduleRequirementTitle[3]];
    graduationRequirements[moduleRequirementTitle[3]] = findIndustrialExperienceTrainingModules(studentAcademicCohort, studentSemesters, industrialExperienceRequirements, studentExemptedModules, studentWaivedModules, requiredMCsTeamProject);
    if (Object.keys(graduationRequirements[moduleRequirementTitle[3]]).length > 0)  {
      UIFormatGraduationRequirement.children.push(UIFormatConversion(graduationRequirements[moduleRequirementTitle[3]].name,
                                                                     graduationRequirements[moduleRequirementTitle[3]].markedIndustrialExperienceTrainingModules,
                                                                     graduationRequirements[moduleRequirementTitle[3]].isFulfilled));
    }

  // find IT-professionalism requirement modules objects
  const ITRequirements = allGradRequirements[moduleRequirementTitle[4]];
  const requiredMCsIT = allGraduationRequirementMCs[moduleRequirementTitle[4]];
  graduationRequirements[moduleRequirementTitle[4]] = findITProfessionalismModules(studentAcademicCohort, studentSemesters, ITRequirements, studentExemptedModules, studentWaivedModules, requiredMCsIT);
  if (Object.keys(graduationRequirements[moduleRequirementTitle[4]]).length > 0)  {
    UIFormatGraduationRequirement.children.push(UIFormatConversion(graduationRequirements[moduleRequirementTitle[4]].name,
                                                                   graduationRequirements[moduleRequirementTitle[4]].markedITProfessionalismModules,
                                                                   graduationRequirements[moduleRequirementTitle[4]].isFulfilled));
  }

  // find math-science requirement modules objects
  const mathScienceRequirements = allGradRequirements[moduleRequirementTitle[5]];
  const requiredMCsMathSci = allGraduationRequirementMCs[moduleRequirementTitle[5]];
  graduationRequirements[moduleRequirementTitle[5]] = findMathSciRequirementModules(studentAcademicCohort, studentSemesters, mathScienceRequirements, studentExemptedModules, studentWaivedModules, requiredMCsMathSci);
  if (Object.keys(graduationRequirements[moduleRequirementTitle[5]]).length > 0)  {
    UIFormatGraduationRequirement.children.push(UIFormatConversion(graduationRequirements[moduleRequirementTitle[5]].name,
                                                                   graduationRequirements[moduleRequirementTitle[5]].markedMathSciModules,
                                                                   graduationRequirements[moduleRequirementTitle[5]].isFulfilled));
  }

  // find unrestricted-electives requirement modules objects

  return UIFormatGraduationRequirement;
}

const UIFormatConversion = function UIFormatConversion(name, markedModules, isFulfilled) {
  let tempGradRequirement = {};

  switch(name)  {
    case 'Computer Science Focus Area':
    break;
    case 'Unrestricted Electives':
    break;
    default:
    tempGradRequirement = {
      name: name,
      children: [],
      isFulfilled: false
    }
    tempGradRequirement = createUIFormat(tempGradRequirement, markedModules);
    tempGradRequirement.isFulfilled = isFulfilled;
    break;
  }

  return tempGradRequirement;
}

const createUIFormat = function createUIFormat(tempGradRequirement, modules)  {
  const keys = Object.keys(modules);

  for (var i=0; i<keys.length; i++)  {
    let gradRequirement = {
      name: keys[i],
      children: [],
      isFulfilled: modules[keys[i]]
    }
    tempGradRequirement.children.push(gradRequirement);
  }

  return tempGradRequirement;
}
