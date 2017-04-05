import { getCohortByName } from '../../../../../../database-controller/AcademicCohort/methods';
import { getGradRequirementModules,
         getGradRequirementMCs } from '../../../../../../database-controller/graduation-requirement/methods';
import { getFocusAreaPrimaryRequirement,
         getFocusArea4KRequirement,
         getFocusAreaNonPrimaryRequirement,
         getFocusAreaPrimary4KRequirement } from '../../../../../../database-controller/focus-area/methods';
import { findFoundationRequirementModules } from './foundation/methods';
import { findITProfessionalismModules } from './IT-professionalism/methods';
import { findMathSciRequirementModules } from './math-science/methods';
import { findTeamProjectRequirementModules } from './breadth-depth/team-project/methods';
import { findIndustrialExperienceTrainingModules } from './breadth-depth/industrial-experience/methods';
import { checkFocusAreaFulfilmentMCs,
         findFocusAreaPrimary,
         findFocusArea4KModules } from './breadth-depth/focus-area/methods';
import { findULRRequirementModules } from '../../../../university-level-requirements/AY-1617/methods';
import { findUnrestrictedElectivesRequirementModules } from './unrestricted-electives/methods';

/* Explanation for new AY creation
 * Grad checker handler retrieves all the graduation requirements from each of the
 * sub requirements.
 * It also converts the graduation format to fit the display format
 *
 * Thus, you should only modify the UI conversion method if any of the grad requirements
 * changes its form from the UI display format
 *
 * UI display JSON format:
 * Requirement {
 *  name:
 *  children:
 *  isFulfilled:
 * }
 *
 * name -> name of what will be displayed on the screen
 * children -> array of JSON as displayed under the "Requirement"
 * isFulfilled -> is the current JSON has fulfilled. All children must be fulfilled
 *                for the current JSON to be fulfilled
 */

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
                           'Programming Languages', 'Software Engineering', 'others'];

  let graduationRequirements = {};

  // keep track of all modules that have been checked inside the planner
  let moduleChecked = {};

  //student info Object
  let studentInfoObject = createStudentInfoObject(studentAcademicCohort, studentSemesters, studentExemptedModules, studentWaivedModules);

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
  const allStudentFocusAreas = {
    focusAreaPrimaryModules: getFocusAreaPrimaryRequirement(cohortInformation.cohortFocusAreaID),
    focusArea4KModules: getFocusArea4KRequirement(cohortInformation.cohortFocusAreaID),
    focusAreaPrimary4KModules :getFocusAreaPrimary4KRequirement(cohortInformation.cohortFocusAreaID),
    focusAreaNonPrimaryModules: getFocusAreaNonPrimaryRequirement(cohortInformation.cohortFocusAreaID)
  };

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

  // find foundation requirement modules objects and call function from relevant academic year
  const foundationRequirements = allGradRequirements[moduleRequirementTitle[0]];
  const requiredMCsFoundation = allGraduationRequirementMCs[moduleRequirementTitle[0]];
  graduationRequirements[moduleRequirementTitle[0]] = findFoundationRequirementModules(studentAcademicCohort, studentSemesters, foundationRequirements, studentExemptedModules, studentWaivedModules, moduleChecked, requiredMCsFoundation);
  moduleChecked = graduationRequirements[moduleRequirementTitle[0]].moduleChecked;

  if (Object.keys(graduationRequirements[moduleRequirementTitle[0]]).length > 0)  {
    UIFormatGraduationRequirement.children.push(UIFormatConversion(graduationRequirements[moduleRequirementTitle[0]].name,
                                                                   graduationRequirements[moduleRequirementTitle[0]].markedFoundationModules,
                                                                   graduationRequirements[moduleRequirementTitle[0]].isFulfilled));
  }

  // find IT-professionalism requirement modules objects
  const ITRequirements = allGradRequirements[moduleRequirementTitle[4]];
  const requiredMCsIT = allGraduationRequirementMCs[moduleRequirementTitle[4]];
  graduationRequirements[moduleRequirementTitle[4]] = findITProfessionalismModules(studentAcademicCohort, studentSemesters, ITRequirements, studentExemptedModules, studentWaivedModules, moduleChecked, requiredMCsIT);
  moduleChecked = graduationRequirements[moduleRequirementTitle[4]].moduleChecked;

  if (Object.keys(graduationRequirements[moduleRequirementTitle[4]]).length > 0)  {
    UIFormatGraduationRequirement.children.push(UIFormatConversion(graduationRequirements[moduleRequirementTitle[4]].name,
                                                                   graduationRequirements[moduleRequirementTitle[4]].markedITProfessionalismModules,
                                                                   graduationRequirements[moduleRequirementTitle[4]].isFulfilled));
  }

  // find math-science requirement modules objects
  const mathScienceRequirements = allGradRequirements[moduleRequirementTitle[5]];
  const requiredMCsMathSci = allGraduationRequirementMCs[moduleRequirementTitle[5]];
  graduationRequirements[moduleRequirementTitle[5]] = findMathSciRequirementModules(studentAcademicCohort, studentSemesters, mathScienceRequirements, studentExemptedModules, studentWaivedModules, moduleChecked, requiredMCsMathSci);
  moduleChecked = graduationRequirements[moduleRequirementTitle[5]].moduleChecked;

  if (Object.keys(graduationRequirements[moduleRequirementTitle[5]]).length > 0)  {
    UIFormatGraduationRequirement.children.push(UIFormatConversion(graduationRequirements[moduleRequirementTitle[5]].name,
                                                                   graduationRequirements[moduleRequirementTitle[5]].markedMathSciModules,
                                                                   graduationRequirements[moduleRequirementTitle[5]].isFulfilled));
  }

  // find computer science breadth and depth requirement modules

    // find computer systems team project requirement modules
    const teamProjectRequirements = allGradRequirements[moduleRequirementTitle[2]];
    const requiredMCsTeamProject = allGraduationRequirementMCs[moduleRequirementTitle[2]];
    graduationRequirements[moduleRequirementTitle[2]] = findTeamProjectRequirementModules(studentAcademicCohort, studentSemesters, teamProjectRequirements, studentExemptedModules, studentWaivedModules, moduleChecked, requiredMCsTeamProject);
    moduleChecked = graduationRequirements[moduleRequirementTitle[2]].moduleChecked;

    if (Object.keys(graduationRequirements[moduleRequirementTitle[2]]).length > 0)  {
      UIFormatGraduationRequirement.children.push(UIFormatConversion(graduationRequirements[moduleRequirementTitle[2]].name,
                                                                     graduationRequirements[moduleRequirementTitle[2]].markedTeamProjectModules,
                                                                     graduationRequirements[moduleRequirementTitle[2]].isFulfilled));
    }

    // find Industrial experience training requirement modules
    const industrialExperienceRequirements = allGradRequirements[moduleRequirementTitle[3]];
    const requiredMCsIndustrialExperience = allGraduationRequirementMCs[moduleRequirementTitle[3]];
    graduationRequirements[moduleRequirementTitle[3]] = findIndustrialExperienceTrainingModules(studentAcademicCohort, studentSemesters, industrialExperienceRequirements, studentExemptedModules, studentWaivedModules, moduleChecked, requiredMCsIndustrialExperience);
    moduleChecked = graduationRequirements[moduleRequirementTitle[3]].moduleChecked;

    if (Object.keys(graduationRequirements[moduleRequirementTitle[3]]).length > 0)  {
      UIFormatGraduationRequirement.children.push(UIFormatConversion(graduationRequirements[moduleRequirementTitle[3]].name,
                                                                     graduationRequirements[moduleRequirementTitle[3]].markedIndustrialExperienceTrainingModules,
                                                                     graduationRequirements[moduleRequirementTitle[3]].isFulfilled));
    }

    // For all focus area, checks if planner fulfils the 2 focus area conditions, then converts it to UI format
    let returnPackage = UIFormatAllFocusAreaConversion(moduleRequirementTitle[1], studentInfoObject, allStudentFocusAreas, focusAreaTitles);
    const focusAreaRequirements = returnPackage.focusAreaRequirements;
    const focusAreaModulesChecked = returnPackage.focusAreaModulesChecked;

    // check if student planner meet 24 MCs requirement
    graduationRequirements[moduleRequirementTitle[1]] = checkFocusAreaFulfilmentMCs(studentInfoObject, focusAreaModulesChecked, allStudentFocusAreas, allGraduationRequirementMCs[moduleRequirementTitle[1]]);
    studentInfoObject = graduationRequirements[moduleRequirementTitle[1]].studentInfoObject;
    //console.log(JSON.stringify(studentInfoObject.moduleChecked));

    if (focusAreaRequirements.children[0].isFulfilled &&
        focusAreaRequirements.children[1].isFulfilled &&
        graduationRequirements[moduleRequirementTitle[1]].isFulfilled)  {
      focusAreaRequirements.isFulfilled =  true;
    }

    UIFormatGraduationRequirement.children.push(focusAreaRequirements);

    //console.log(JSON.stringify(UIFormatGraduationRequirement));

  // find university-level-requirements here
  const ULRRequirements = allGradRequirements[moduleRequirementTitle[6]];
  const requiredMCsULR = allGraduationRequirementMCs[moduleRequirementTitle[6]];
  graduationRequirements[moduleRequirementTitle[6]] = findULRRequirementModules(studentAcademicCohort, studentSemesters, ULRRequirements, studentExemptedModules, studentWaivedModules, moduleChecked, requiredMCsULR);
  moduleChecked = graduationRequirements[moduleRequirementTitle[6]].moduleChecked;

  if (Object.keys(graduationRequirements[moduleRequirementTitle[6]]).length > 0)  {
  UIFormatGraduationRequirement.children.push(UIFormatConversion(graduationRequirements[moduleRequirementTitle[6]].name,
                                                                 graduationRequirements[moduleRequirementTitle[6]].markedULRModules,
                                                                 graduationRequirements[moduleRequirementTitle[6]].isFulfilled));
  }

  // find unrestricted-electives requirement modules objects
    // pass in required number of MCs from each requirement checks earlier,
    // pass in semesters
    let totalRequiredMCs = 0
    for (var i=0; i<moduleRequirementTitle.length-1; i++) {
      totalRequiredMCs += graduationRequirements[moduleRequirementTitle[i]].requiredMCs;
    }
    graduationRequirements[moduleRequirementTitle[7]] = findUnrestrictedElectivesRequirementModules(totalRequiredMCs, graduationMCs, studentSemesters, studentExemptedModules);
    UIFormatGraduationRequirement.children.push(UIFormatConversion(moduleRequirementTitle[7], [], graduationRequirements[moduleRequirementTitle[7]]));

  // check if module contains less than 60 MCs worth of 1k module

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

/**
* retrieves an object of UI formatted UI formatted graduation requirements for focus area
*  @param {object}  an object of focus area information
*  @return {{objects}}  UI formatted list for focus area
*
*/
const UIFormatAllFocusAreaConversion = function UIFormatAllFocusAreaConversion(moduleRequirementTitle, studentInfoObject, allStudentFocusAreas, focusAreaTitles)  {
  let returnPackage = {
    focusAreaRequirements: {},
    focusAreaModulesChecked: {}
  }

  let focusAreaRequirements = {
    name: moduleRequirementTitle,
    children: [],
    isFulfilled: false
  }

  let focusAreaPrimaries = {
    name: "Area Primaries",
    children: [],
    isFulfilled: false
  }

  let focusAreaAtLeast12MCs = {
    name: "At least 12 MCs of 4K modules",
    children: [],
    isFulfilled: false
  }

  // object that focus area 4K modules will be using
  let focusAreaAtLeast12MCsOf4KRequiredInfo = createFocusAreaAtLeast12MCsOf4KRequiredInfoObject();

  // number of primary modules marked
  let previousNumberOfPrimaryModulesMarked = 0;
  let selectedFocusArea = {};

  // for all focus area, find the ones fulfilled by the current planner
  for (var i=0; i<focusAreaTitles.length; i++)  {
    // object that focus area primary check will be using
    let focusAreaPrimaryRequiredInfo = createFocusAreaPrimaryRequiredInfoObject(focusAreaTitles[i]);

    focusAreaPrimaryRequiredInfo.markedFocusAreaPrimary3KAndLessModules = allStudentFocusAreas.focusAreaPrimaryModules[focusAreaTitles[i]];
    focusAreaPrimaryRequiredInfo.markedFocusAreaPrimary4KModules =  allStudentFocusAreas.focusAreaPrimary4KModules[focusAreaTitles[i]];
    focusAreaAtLeast12MCsOf4KRequiredInfo.markedFocusArea4KModules = allStudentFocusAreas.focusArea4KModules[focusAreaTitles[i]];

    if (!focusAreaAtLeast12MCsOf4KRequiredInfo.markedFocusArea4KModules ||
        !focusAreaPrimaryRequiredInfo.markedFocusAreaPrimary3KAndLessModules ||
        !focusAreaPrimaryRequiredInfo.markedFocusAreaPrimary4KModules)  {
      continue;
    }

    focusAreaPrimaryRequiredInfo = findFocusAreaPrimary(focusAreaPrimaryRequiredInfo, studentInfoObject);
    focusAreaAtLeast12MCsOf4KRequiredInfo = findFocusArea4KModules(focusAreaAtLeast12MCsOf4KRequiredInfo, studentInfoObject);

    // check a module if the number of marked primary focus area is more than the previous value
    if (focusAreaPrimaryRequiredInfo.numberOfFocusAreaPrimaryModulesMarkedTrue > previousNumberOfPrimaryModulesMarked)  {
      selectedFocusArea = focusAreaPrimaryRequiredInfo.moduleChecked;
      previousNumberOfPrimaryModulesMarked = focusAreaPrimaryRequiredInfo.numberOfFocusAreaPrimaryModulesMarkedTrue;
    }

    focusAreaPrimaries.children.push(UIFormatOneFocusAreaConversion(focusAreaPrimaryRequiredInfo));

    if (focusAreaPrimaryRequiredInfo.isPrimaryTrue)  {
      focusAreaPrimaries.isFulfilled = true;
    }
    if (focusAreaAtLeast12MCsOf4KRequiredInfo.is4KTrue) {
      focusAreaAtLeast12MCs.isFulfilled = true;
    }
  }

  // append all modules checked into the moduleChecked of studentInfoObject and mark isFocusAreaMarked as true
  const focusAreaModulesChecked = Object.assign(selectedFocusArea, focusAreaAtLeast12MCsOf4KRequiredInfo.module4KChecked);

  focusAreaRequirements.children.push(focusAreaPrimaries);
  focusAreaRequirements.children.push(focusAreaAtLeast12MCs);

  returnPackage.focusAreaRequirements = focusAreaRequirements;
  returnPackage.focusAreaModulesChecked = focusAreaModulesChecked;

  return returnPackage;
}

/**
* retrieves an object of UI formatted graduation requirements for one focus area
*  @param {object}  focus area object containing all the graduation requirements for 1 focus area
*  @return {{objects}}  UI formatted list of one requirements
*
*/
const UIFormatOneFocusAreaConversion = function UIFormatOneFocusAreaConversion(focusAreaPrimaryRequiredInfo)  {
  let tempGradRequirement = {
    name: focusAreaPrimaryRequiredInfo.name,
    children: [],
    isFulfilled: false
  }
  // create primary here
  let primaryModules =  {
    name: 'Focus Area Primary',
    children: [],
    isFulfilled: false
  }
  primaryModules = createUIFormat(primaryModules, focusAreaPrimaryRequiredInfo.markedFocusAreaPrimary3KAndLessModules);
  primaryModules.isFulfilled = focusAreaPrimaryRequiredInfo.threePrimaryModules;

  // create 4k here
  let fourThousandModules =  {
    name: 'Focus Area Primary 4K and above',
    children: [],
    isFulfilled: false
  }
  fourThousandModules = createUIFormat(fourThousandModules, focusAreaPrimaryRequiredInfo.markedFocusAreaPrimary4KModules);
  fourThousandModules.isFulfilled = focusAreaPrimaryRequiredInfo.one4KModules;

  tempGradRequirement.children.push(primaryModules);
  tempGradRequirement.children.push(fourThousandModules);
  tempGradRequirement.isFulfilled = focusAreaPrimaryRequiredInfo.isPrimaryTrue;

  return tempGradRequirement;
}

const createFocusAreaPrimaryRequiredInfoObject = function createFocusAreaPrimaryRequiredInfoObject(focusAreaName)  {
  const focusAreaPrimaryRequiredInfo = {
    name: focusAreaName,
    markedFocusAreaPrimary3KAndLessModules: {},
    markedFocusAreaPrimary4KModules: {},
    numberOfFocusAreaPrimaryModulesMarkedTrue: 0,
    minNumberOfPrimaryFocusArea: 3, // constant that require changing
    minNumberOfPrimary4K: 1,  // constant that require changing
    moduleChecked: {},
    threePrimaryModules: false,
    one4KModules: false,
    isPrimaryTrue: false,
  };
  return focusAreaPrimaryRequiredInfo;
}

const createFocusAreaAtLeast12MCsOf4KRequiredInfoObject = function createFocusAreaAtLeast12MCsOf4KRequiredInfoObject() {
  const focusAreaAtLeast12MCsOf4KRequiredInfo = {
    markedFocusArea4KModules: {},
    total4KModuleMCs: 0,
    module4KChecked: {},
    min4KModuleMCs: 12, // constant that require changing
    is4KTrue: false,
  };
  return focusAreaAtLeast12MCsOf4KRequiredInfo;
}

const createStudentInfoObject = function createStudentInfoObject(studentAcademicCohort, studentSemesters, studentExemptedModules, studentWaivedModules)  {
  const studentInfoObject = {
    studentAcademicCohort: studentAcademicCohort,
    studentSemesters: studentSemesters,
    studentExemptedModules: studentExemptedModules,
    studentWaivedModules: studentWaivedModules,
    moduleChecked: {}
  }
  return studentInfoObject
}
