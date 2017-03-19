import { getCohortByName } from '../../../../../../database-controller/AcademicCohort/methods';
import { getGradRequirementModules,
         getGradRequirementMCs } from '../../../../../../database-controller/graduation-requirement/methods';
import { getFocusAreaPrimaryRequirement,
         getFocusArea4KRequirement,
         getFocusAreaNonPrimaryRequirement } from '../../../../../../database-controller/focus-area/methods';
import { findFoundationRequirementModules } from './foundation/methods';
import { findITProfessionalismModules } from './IT-professionalism/methods';
import { findMathSciRequirementModules } from './math-science/methods';
import { findTeamProjectRequirementModules } from './breadth-depth/team-project/methods';
import { findIndustrialExperienceTrainingModules } from './breadth-depth/industrial-experience/methods';
import { checkFocusAreaFulfilmentMCs,
         findFocusAreaModules } from './breadth-depth/focus-area/methods';
import { findULRRequirementModules } from '../../../../university-level-requirements/AY-1617/methods';
import { findUnrestrictedElectivesRequirementModules } from './unrestricted-electives/methods';

/**
* retrieves an object of string boolean objects for each graduation requirement
*  @param {objects}  a full appended object list of all the modules in a student planner
*  @param {number}  current student academic year
*  @param {objects}  modules which are exempted by student
*  @param {objects}  modules which are waived by student
*  @return {{objects}}  UI formatted list of graduation requirements
*
*/
export const AY1617CSGradChecker = function AY1617CSGradChecker(studentSemesters, studentAcademicCohort, studentExemptedModules, studentWaivedModules) {
  const graduationMCs = 160;
  const moduleRequirementTitle = ['Computer Science Foundation',
                                  'Computer Science Focus Area',
                                  'Computer Systems Team Project',
                                  'Industrial Experience Training',
                                  'IT Professionalism','Mathematics and Sciences',
                                  'University Level Requirement', 'Unrestricted Electives'];
  const focusAreaTitles = ['Algorithms & Theory', 'Artificial Intelligence',
                           'Computer Graphics and Games', 'Computer Security',
                           'Database Systems', 'Multimedia Information Retrieval',
                           'Networking and Distributed Systems', 'Parallel Computing',
                           'Programming Languages', 'Software Engineering'];

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
  const cohortGradRequirementIDs = cohortInformation.cohortGradRequirementID;
  const allGradRequirements = getGradRequirementModules(cohortGradRequirementIDs);
  const allGraduationRequirementMCs = getGradRequirementMCs(cohortGradRequirementIDs);

  // retrieve focus area modules
  const allFocusAreaPrimaryRequirements = getFocusAreaPrimaryRequirement(cohortInformation.cohortFocusAreaID);
  const allFocusArea4KRequirements = getFocusArea4KRequirement(cohortInformation.cohortFocusAreaID);
  const allFocusAreaNonPrimaryRequirements = getFocusAreaNonPrimaryRequirement(cohortInformation.cohortFocusAreaID);

  if (Object.keys(allGradRequirements).length === 0 || !allGradRequirements ||
      !allGraduationRequirementMCs) {
    return graduationRequirements;
  }

  // append objects of string:bool objects into a list of objects and return to UI
  for (var i=0; i<moduleRequirementTitle.length; i++) {
    graduationRequirements[moduleRequirementTitle[i]] = {};
  }

  /*
   * Send all planner information to every requirement check
   */

  // find university-level-requirements here

  const ULRRequirements = allGradRequirements[moduleRequirementTitle[6]];
  const requiredMCsULR = allGraduationRequirementMCs[moduleRequirementTitle[6]];
  graduationRequirements[moduleRequirementTitle[6]] = findULRRequirementModules(studentAcademicCohort, studentSemesters, ULRRequirements, studentExemptedModules, studentWaivedModules, requiredMCsULR);
  if (Object.keys(graduationRequirements[moduleRequirementTitle[6]]).length > 0)  {
  UIFormatGraduationRequirement.children.push(UIFormatConversion(graduationRequirements[moduleRequirementTitle[6]].name,
                                                                 graduationRequirements[moduleRequirementTitle[6]].markedULRModules,
                                                                 graduationRequirements[moduleRequirementTitle[6]].isFulfilled));
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
    // find focus area requirement modules object
    let focusAreaMCSFulfilment = {};
    let focusAreaRequirements = {
      name: moduleRequirementTitle[1],
      children: [],
      isFulfilled: false
    };

    const allStudentFocusAreas = {
      focusAreaPrimaryModules: allFocusAreaPrimaryRequirements,
      focusArea4KModules: allFocusArea4KRequirements,
      focusAreaNonPrimaryModules: allFocusAreaNonPrimaryRequirements
    };

    // for all focus area, find the ones fulfilled by the current planner
    for (var i=0; i<focusAreaTitles.length; i++)  {
      let focusArea = {
        focusAreaPrimaryModules: allStudentFocusAreas.focusAreaPrimaryModules[focusAreaTitles[i]],
        focusArea4KModules: allStudentFocusAreas.focusArea4KModules[focusAreaTitles[i]],
        focusAreaNonPrimaryModules: allStudentFocusAreas.focusAreaNonPrimaryModules[focusAreaTitles[i]]
      }

      if (!focusArea.focusAreaPrimaryModules || !focusArea.focusArea4KModules || !focusArea.focusArea4KModules)  {
        continue;
      }

      let oneFocusArea = findFocusAreaModules(focusAreaTitles[i], studentAcademicCohort, studentSemesters, focusArea, studentExemptedModules, studentWaivedModules);
      focusAreaRequirements.children.push(UIFormatFocusAreaConversion(oneFocusArea));
      if (oneFocusArea.isPrimaryTrue && oneFocusArea.is4KTrue)  {
        focusAreaRequirements.isFulfilled = true;
      }
    }

    // check if student planner meet 24 MCs requirement
    focusAreaMCSFulfilment = checkFocusAreaFulfilmentMCs(studentSemesters, allStudentFocusAreas, allGraduationRequirementMCs[moduleRequirementTitle[1]]);

    if (!focusAreaMCSFulfilment.isFulfilled)  {
      focusAreaRequirements.isFulfilled = false;
    }

    graduationRequirements[moduleRequirementTitle[1]] = focusAreaMCSFulfilment;
    UIFormatGraduationRequirement.children.push(graduationRequirements[moduleRequirementTitle[1]]);

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
    graduationRequirements[moduleRequirementTitle[3]] = findIndustrialExperienceTrainingModules(studentAcademicCohort, studentSemesters, industrialExperienceRequirements, studentExemptedModules, studentWaivedModules, requiredMCsIndustrialExperience);
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
    // pass in required number of MCs from each requirement checks earlier,
    // pass in semesters
    let totalRequiredMCs = 0
    for (var i=0; i<moduleRequirementTitle.length-1; i++) {
      totalRequiredMCs += graduationRequirements[moduleRequirementTitle[i]].requiredMCs;
    }
    graduationRequirements[moduleRequirementTitle[7]] = findUnrestrictedElectivesRequirementModules(totalRequiredMCs, graduationMCs, studentSemesters);
    UIFormatGraduationRequirement.children.push(UIFormatConversion(moduleRequirementTitle[7], [], graduationRequirements[moduleRequirementTitle[7]]));

  return UIFormatGraduationRequirement;
}

/**
* retrieves an object of UI formatted graduation requirements
*  @param {string}  name of requirement
*  @param {object}  the marked modules
*  @param {boolean}  boolean that states if module has been fulfilled or not
*  @return {{objects}}  UI formatted list of one requirements
*
*/

const UIFormatConversion = function UIFormatConversion(name, markedModules, isFulfilled) {
  let tempGradRequirement = {};
  switch(name)  {
    case 'Unrestricted Electives':
    tempGradRequirement = {
      name: name,
      children: [],
      isFulfilled: isFulfilled
    }
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

/**
* retrieves an object of UI formatted graduation requirements for a focus area
*  @param {object}  focus area object containing all the graduation requirements for 1 focus area
*  @return {{objects}}  UI formatted list of one requirements
*
*/
const UIFormatFocusAreaConversion = function UIFormatFocusAreaConversion(oneFocusArea)  {
  let tempGradRequirement = {
    name: oneFocusArea.name,
    children: [],
    isFulfilled: false
  }
  // create primary here
  let primaryModules =  {
    name: 'Focus Area Primaries',
    children: [],
    isFulfilled: false
  }
  primaryModules = createUIFormat(primaryModules, oneFocusArea.markedFocusAreaPrimaryModules);
  primaryModules.isFulfilled = oneFocusArea.primary;

  // create 4k here
  let fourThousandModules =  {
    name: 'Focus Area 4K',
    children: [],
    isFulfilled: false
  }
  fourThousandModules = createUIFormat(fourThousandModules, oneFocusArea.markedFocusArea4KModules);
  fourThousandModules.isFulfilled = oneFocusArea.fourThousand;

  tempGradRequirement.children.push(primaryModules);
  tempGradRequirement.children.push(fourThousandModules);
  if (oneFocusArea.primary && oneFocusArea.fourThousand)  {
    tempGradRequirement.isFulfilled = true;
  }

  return tempGradRequirement;
}

/**
* retrieves an object of UI formatted marked graduation requirement
*  @param {object}  parent grad requirement object
*  @param {object}  an object containing a list of modules in the format of modueCode:bool
*  @return {{objects}}  UI formatted list for one set of marked requirements
*
*/
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
