import { searchByModuleCode } from '../../../../../../../../database-controller/module/methods';

/* Explanation for new AY creation
 * There are 3 functions called by the AYXX/XX grad checker handler:
 * 1. checkFocusAreaFulfilmentMCs
 * 2. findFocusAreaPrimary
 * 3. findFocusArea4KModules
 *
 * When migrating to new AY, unless there are huge changes in graduation calculation,
 * the functions that should be modified are
 * 1. findFocusAreaPrimary
 * 2. findFocusArea4KModules
 * 3. checkFocusAreaFulfilmentMCs
 *
 */

// focus area MCs are assumed to be at 4MCs and no focus area with more than 4MCs
export const checkFocusAreaFulfilmentMCs = function checkFocusAreaFulfilmentMCs(studentInfoObject, focusAreaModulesChecked, studentFocusAreas, requiredMCs) {
  // checks for 24 MCs from focus area modules
  const focusAreaPrimaryKeys = studentFocusAreas.focusAreaPrimaryModules;
  const focusArea4KKeys = studentFocusAreas.focusArea4KModules;
  const focusAreaPrimary4KKeys = studentFocusAreas.focusAreaPrimary4KModules;
  const focusAreaNonPrimaryKeys = studentFocusAreas.focusAreaNonPrimaryModules;
  //const modulesChecked = {};
  let totalMCs = 0;
  let spareMCs = 0;
  let fulfilmentRequirement = {
    requiredMCs: requiredMCs,
    studentInfoObject: studentInfoObject,
    isFulfilled: false
  };

  // loop for all objects inside focusAreaModulesChecked, calculate totalMCs
  let moduleKeys = Object.keys(focusAreaModulesChecked);
  for (var i=0; i<moduleKeys.length; i++)  {
    totalMCs += searchByModuleCode(moduleKeys[i]).moduleMC;
  }

  // for all primary focus area modules, check if module exists in student planner
  for (var i=0; i<fulfilmentRequirement.studentInfoObject.studentSemesters.length; i++) {
    let modulePrimaryFocusAreaNames = Object.keys(focusAreaPrimaryKeys);
    for (var j=0; j<modulePrimaryFocusAreaNames.length; j++) {
      let modulePrimaryKeys = Object.keys(focusAreaPrimaryKeys[modulePrimaryFocusAreaNames[j]]);
      for (var k=0; k<modulePrimaryKeys.length; k++)  {
        if (fulfilmentRequirement.studentInfoObject.studentSemesters[i].moduleHashmap[modulePrimaryKeys[k]] && !focusAreaModulesChecked[modulePrimaryKeys[k]])  {
          if (studentInfoObject.moduleChecked[modulePrimaryKeys[k]])  {
            spareMCs += searchByModuleCode(modulePrimaryKeys[k]).moduleMC;
          } else {
            totalMCs += searchByModuleCode(modulePrimaryKeys[k]).moduleMC;
          }
          if (totalMCs <= fulfilmentRequirement.requiredMCs)  {
            focusAreaModulesChecked[modulePrimaryKeys[k]] = true;
          }
        }
      }
    }
  }

  // for all 4K focus area modules, check if module exists in student planner
  for (var i=0; i<fulfilmentRequirement.studentInfoObject.studentSemesters.length; i++) {
    let module4KFocusAreaNames = Object.keys(focusArea4KKeys);
    for (var j=0; j<module4KFocusAreaNames.length; j++) {
      let module4KKeys = Object.keys(focusArea4KKeys[module4KFocusAreaNames[j]]);
      for (var k=0; k<module4KKeys.length; k++)  {
        if (fulfilmentRequirement.studentInfoObject.studentSemesters[i].moduleHashmap[module4KKeys[k]] && !focusAreaModulesChecked[module4KKeys[k]])  {
          if (studentInfoObject.moduleChecked[module4KKeys[k]])  {
            spareMCs += searchByModuleCode(module4KKeys[k]).moduleMC;
          } else {
            totalMCs += searchByModuleCode(module4KKeys[k]).moduleMC;
          }
          if (totalMCs <= fulfilmentRequirement.requiredMCs)  {
            focusAreaModulesChecked[module4KKeys[k]] = true;
          }
        }
      }
    }
  }

  // for all Primary 4K focus area modules, check if module exists in student planner
  for (var i=0; i<fulfilmentRequirement.studentInfoObject.studentSemesters.length; i++) {
    let modulePrimary4KFocusAreaNames = Object.keys(focusAreaPrimary4KKeys);
    for (var j=0; j<modulePrimary4KFocusAreaNames.length; j++) {
      let modulePrimary4KKeys = Object.keys(focusAreaPrimary4KKeys[modulePrimary4KFocusAreaNames[j]]);
      for (var k=0; k<modulePrimary4KKeys.length; k++)  {
        if (fulfilmentRequirement.studentInfoObject.studentSemesters[i].moduleHashmap[modulePrimary4KKeys[k]] && !focusAreaModulesChecked[modulePrimary4KKeys[k]])  {
          if (studentInfoObject.moduleChecked[modulePrimary4KKeys[k]])  {
            spareMCs += searchByModuleCode(modulePrimary4KKeys[k]).moduleMC;
          } else {
            totalMCs += searchByModuleCode(modulePrimary4KKeys[k]).moduleMC;
          }
          if (totalMCs <= fulfilmentRequirement.requiredMCs)  {
            focusAreaModulesChecked[modulePrimary4KKeys[k]] = true;
          }
        }
      }
    }
  }

  // for all non primary focus area modules, check if module exists in student planner
  for (var i=0; i<fulfilmentRequirement.studentInfoObject.studentSemesters.length; i++) {
    let moduleNonPrimaryFocusAreaNames = Object.keys(focusAreaNonPrimaryKeys);
    for (var j=0; j<moduleNonPrimaryFocusAreaNames.length; j++) {
      let moduleNonPrimaryKeys = Object.keys(focusAreaNonPrimaryKeys[moduleNonPrimaryFocusAreaNames[j]]);
      for (var k=0; k<moduleNonPrimaryKeys.length; k++)  {
        if (fulfilmentRequirement.studentInfoObject.studentSemesters[i].moduleHashmap[moduleNonPrimaryKeys[k]] && !focusAreaModulesChecked[moduleNonPrimaryKeys[k]])  {
          if (studentInfoObject.moduleChecked[moduleNonPrimaryKeys[k]])  {
            spareMCs += searchByModuleCode(moduleNonPrimaryKeys[k]).moduleMC;
          } else {
            totalMCs += searchByModuleCode(moduleNonPrimaryKeys[k]).moduleMC;
          }
          if (totalMCs <= fulfilmentRequirement.requiredMCs)  {
            focusAreaModulesChecked[moduleNonPrimaryKeys[k]] = true;
          }
        }
      }
    }
  }

  if (totalMCs < fulfilmentRequirement.requiredMCs) {
    totalMCs += spareMCs;
  }

  if (totalMCs >= fulfilmentRequirement.requiredMCs) {
    fulfilmentRequirement.isFulfilled = true;
  }

  fulfilmentRequirement.studentInfoObject.moduleChecked = Object.assign(fulfilmentRequirement.studentInfoObject.moduleChecked, focusAreaModulesChecked);

  return fulfilmentRequirement;
}

export const findFocusAreaPrimary = function findFocusAreaPrimary(focusAreaPrimaryRequiredInfo, studentInfoObject)  {
  const focusAreaPrimaryKeys = Object.keys(focusAreaPrimaryRequiredInfo.markedFocusAreaPrimary3KAndLessModules);
  const focusAreaPrimary4KKeys = Object.keys(focusAreaPrimaryRequiredInfo.markedFocusAreaPrimary4KModules);

  // check primary 4Ks
  for (var i=0; i<focusAreaPrimary4KKeys.length; i++) {
    focusAreaPrimaryRequiredInfo = markPrimary4KExemptedWaivedModules(focusAreaPrimaryRequiredInfo, studentInfoObject.studentExemptedModules, studentInfoObject.studentWaivedModules, focusAreaPrimary4KKeys[i]);
    focusAreaPrimaryRequiredInfo = markPrimary4KModules(focusAreaPrimaryRequiredInfo, studentInfoObject.studentSemesters, focusAreaPrimary4KKeys[i]);
  }

  // check primary non 4Ks
  for (var i=0; i<focusAreaPrimaryKeys.length; i++) {
    focusAreaPrimaryRequiredInfo = markPrimaryExemptedWaivedModules(focusAreaPrimaryRequiredInfo, studentInfoObject.studentExemptedModules, studentInfoObject.studentWaivedModules, focusAreaPrimaryKeys[i]);
    focusAreaPrimaryRequiredInfo = markPrimaryModules(focusAreaPrimaryRequiredInfo, studentInfoObject.studentSemesters, focusAreaPrimaryKeys[i]);
  }

  if (focusAreaPrimaryRequiredInfo.threePrimaryModules && focusAreaPrimaryRequiredInfo.one4KModules)  {
    focusAreaPrimaryRequiredInfo.isPrimaryTrue = true;
  }

  return focusAreaPrimaryRequiredInfo;
}

// run find focus area 4k on all 4k modules, not just 1 focus area
export const findFocusArea4KModules = function findFocusArea4KModules(focusAreaAtLeast12MCsOf4KRequiredInfo, studentInfoObject)  {
  // Set 4K condition true if more than minModule4K mcs have been fulfiled
  if (focusAreaAtLeast12MCsOf4KRequiredInfo.total4KModuleMCs >= focusAreaAtLeast12MCsOf4KRequiredInfo.min4KModuleMCs) {
    focusAreaAtLeast12MCsOf4KRequiredInfo.is4KTrue = true;
    return focusAreaAtLeast12MCsOf4KRequiredInfo;
  }

  const keyNames = Object.keys(focusAreaAtLeast12MCsOf4KRequiredInfo.markedFocusArea4KModules);

  for (var i=0; i<keyNames.length; i++) {
    focusAreaAtLeast12MCsOf4KRequiredInfo = mark4KExemptedWaivedModules(focusAreaAtLeast12MCsOf4KRequiredInfo, studentInfoObject.studentExemptedModules, studentInfoObject.studentWaivedModules, keyNames[i]);
    focusAreaAtLeast12MCsOf4KRequiredInfo = mark4KModules(focusAreaAtLeast12MCsOf4KRequiredInfo, studentInfoObject.studentSemesters, keyNames[i]);
  }
  //console.log(JSON.stringify(focusAreaAtLeast12MCsOf4KRequiredInfo.module4KChecked));

  return focusAreaAtLeast12MCsOf4KRequiredInfo;
}

const markPrimaryModules = function markModules(focusAreaPrimaryRequiredInfo, studentSemesters, originalModule) {
  for (var i = 0; i < studentSemesters.length; i++) {
    if (studentSemesters[i].moduleHashmap[originalModule]) {
      focusAreaPrimaryRequiredInfo.markedFocusAreaPrimary3KAndLessModules[originalModule] = true;
      focusAreaPrimaryRequiredInfo.numberOfFocusAreaPrimaryModulesMarkedTrue += 1;
      if (!focusAreaPrimaryRequiredInfo.threePrimaryModules) {
        focusAreaPrimaryRequiredInfo.moduleChecked[originalModule] = true;
      }
      break;
    }
  }
  // checks if primary has at least 3 modules
  if (focusAreaPrimaryRequiredInfo.numberOfFocusAreaPrimaryModulesMarkedTrue >= focusAreaPrimaryRequiredInfo.minNumberOfPrimaryFocusArea) {
    focusAreaPrimaryRequiredInfo.threePrimaryModules = true;
  }
  return focusAreaPrimaryRequiredInfo;
}

const markPrimary4KModules = function markModules(focusAreaPrimaryRequiredInfo, studentSemesters, originalModule) {
  for (var i = 0; i < studentSemesters.length; i++) {
    if (studentSemesters[i].moduleHashmap[originalModule]) {
      focusAreaPrimaryRequiredInfo.markedFocusAreaPrimary4KModules[originalModule] = true;
      focusAreaPrimaryRequiredInfo.numberOfFocusAreaPrimaryModulesMarkedTrue += 1;
      if (focusAreaPrimaryRequiredInfo.numberOfFocusAreaPrimaryModulesMarkedTrue <= focusAreaPrimaryRequiredInfo.minNumberOfPrimaryFocusArea) {
        focusAreaPrimaryRequiredInfo.moduleChecked[originalModule] = true;
      }
      break;
    }
  }
  // checks if primary has at least 1 4K
  if (focusAreaPrimaryRequiredInfo.markedFocusAreaPrimary4KModules[originalModule]) {
    focusAreaPrimaryRequiredInfo.one4KModules = true;
  }
  // checks if primary has at least 3 modules
  if (focusAreaPrimaryRequiredInfo.numberOfFocusAreaPrimaryModulesMarkedTrue >= focusAreaPrimaryRequiredInfo.minNumberOfPrimaryFocusArea) {
    focusAreaPrimaryRequiredInfo.threePrimaryModules = true;
  }
  return focusAreaPrimaryRequiredInfo;
}

const markPrimaryExemptedWaivedModules = function markExemptedWaivedModules(focusAreaPrimaryRequiredInfo, exemptedModules, waivedModules, originalModule) {
  if (Object.keys(exemptedModules).length !== 0)  {
    if (exemptedModules[originalModule])  {
      focusAreaPrimaryRequiredInfo.markedFocusAreaPrimary3KAndLessModules[originalModule] = true;
      focusAreaPrimaryRequiredInfo.numberOfFocusAreaPrimaryModulesMarkedTrue += 1;
      if (!focusAreaPrimaryRequiredInfo.threePrimaryModules) {
        focusAreaPrimaryRequiredInfo.moduleChecked[originalModule] = true;
      }
    }
  }
  if (Object.keys(waivedModules).length !== 0)  {
    if (waivedModules[originalModule]) {
      focusAreaPrimaryRequiredInfo.markedFocusAreaPrimary3KAndLessModules[originalModule] = true;
      focusAreaPrimaryRequiredInfo.numberOfFocusAreaPrimaryModulesMarkedTrue += 1;
      if (!focusAreaPrimaryRequiredInfo.threePrimaryModules) {
        focusAreaPrimaryRequiredInfo.moduleChecked[originalModule] = true;
      }
    }
  }
  // checks if primary has at least 3 modules
  if (focusAreaPrimaryRequiredInfo.numberOfFocusAreaPrimaryModulesMarkedTrue >= focusAreaPrimaryRequiredInfo.minNumberOfPrimaryFocusArea) {
    focusAreaPrimaryRequiredInfo.threePrimaryModules = true;
    return focusAreaPrimaryRequiredInfo;
  }
  return focusAreaPrimaryRequiredInfo;
}

const markPrimary4KExemptedWaivedModules = function markExemptedWaivedModules(focusAreaPrimaryRequiredInfo, exemptedModules, waivedModules, originalModule) {
  if (Object.keys(exemptedModules).length !== 0)  {
    if (exemptedModules[originalModule])  {
      focusAreaPrimaryRequiredInfo.markedFocusAreaPrimary4KModules[originalModule] = true;
      focusAreaPrimaryRequiredInfo.numberOfFocusAreaPrimaryModulesMarkedTrue += 1;
      if (focusAreaPrimaryRequiredInfo.numberOfFocusAreaPrimaryModulesMarkedTrue <= focusAreaPrimaryRequiredInfo.minNumberOfPrimaryFocusArea) {
        focusAreaPrimaryRequiredInfo.moduleChecked[originalModule] = true;
      }
    }
  }
  if (Object.keys(waivedModules).length !== 0)  {
    if (waivedModules[originalModule]) {
      focusAreaPrimaryRequiredInfo.markedFocusAreaPrimary4KModules[originalModule] = true;
      focusAreaPrimaryRequiredInfo.numberOfFocusAreaPrimaryModulesMarkedTrue += 1;
      if (focusAreaPrimaryRequiredInfo.numberOfFocusAreaPrimaryModulesMarkedTrue <= focusAreaPrimaryRequiredInfo.minNumberOfPrimaryFocusArea) {
        focusAreaPrimaryRequiredInfo.moduleChecked[originalModule] = true;
      }
    }
  }
  // checks if primary has at least 1 4K
  if (focusAreaPrimaryRequiredInfo.markedFocusAreaPrimary4KModules[originalModule]) {
    focusAreaPrimaryRequiredInfo.one4KModules = true;
  }
  // checks if primary has at least 3 modules
  if (focusAreaPrimaryRequiredInfo.numberOfFocusAreaPrimaryModulesMarkedTrue >= focusAreaPrimaryRequiredInfo.minNumberOfPrimaryFocusArea) {
    focusAreaPrimaryRequiredInfo.threePrimaryModules = true;
  }
  return focusAreaPrimaryRequiredInfo;
}

const mark4KModules = function mark4KModules(focusAreaAtLeast12MCsOf4KRequiredInfo, studentSemesters, originalModule) {
  for (var i = 0; i < studentSemesters.length; i++) {
    if (studentSemesters[i].moduleHashmap[originalModule] && !focusAreaAtLeast12MCsOf4KRequiredInfo.module4KChecked[originalModule]) {
      focusAreaAtLeast12MCsOf4KRequiredInfo.markedFocusArea4KModules[originalModule] = true;
      focusAreaAtLeast12MCsOf4KRequiredInfo.total4KModuleMCs += searchByModuleCode(originalModule).moduleMC;
      if (!focusAreaAtLeast12MCsOf4KRequiredInfo.is4KTrue) {
        focusAreaAtLeast12MCsOf4KRequiredInfo.module4KChecked[originalModule] = true;
      }
      break;
    }
  }
  // Set 4K condition true if more than minModule4K mcs have been fulfiled
  if (focusAreaAtLeast12MCsOf4KRequiredInfo.total4KModuleMCs >= focusAreaAtLeast12MCsOf4KRequiredInfo.min4KModuleMCs) {
    focusAreaAtLeast12MCsOf4KRequiredInfo.is4KTrue = true;
  }
  return focusAreaAtLeast12MCsOf4KRequiredInfo;
}

const mark4KExemptedWaivedModules = function mark4KExemptedWaivedModules(focusAreaAtLeast12MCsOf4KRequiredInfo, exemptedModules, waivedModules, originalModule) {
  if (Object.keys(exemptedModules).length !== 0)  {
    if (exemptedModules[originalModule] && !focusAreaAtLeast12MCsOf4KRequiredInfo.module4KChecked[originalModule])  {
      focusAreaAtLeast12MCsOf4KRequiredInfo.markedFocusArea4KModules[originalModule] = true;
      focusAreaAtLeast12MCsOf4KRequiredInfo.total4KModuleMCs += searchByModuleCode(originalModule).moduleMC;
      if (!focusAreaAtLeast12MCsOf4KRequiredInfo.is4KTrue) {
        focusAreaAtLeast12MCsOf4KRequiredInfo.module4KChecked[originalModule] = true;
      }
    }
  }
  if (Object.keys(waivedModules).length !== 0)  {
    if (waivedModules[originalModule] && !focusAreaAtLeast12MCsOf4KRequiredInfo.module4KChecked[originalModule]) {
      focusAreaAtLeast12MCsOf4KRequiredInfo.markedFocusArea4KModules[originalModule] = true;
      if (!focusAreaAtLeast12MCsOf4KRequiredInfo.is4KTrue) {
        focusAreaAtLeast12MCsOf4KRequiredInfo.moduleChecked[originalModule] = true;
      }
    }
  }
  // Set 4K condition true if more than minModule4K mcs have been fulfiled
  if (focusAreaAtLeast12MCsOf4KRequiredInfo.total4KModuleMCs >= focusAreaAtLeast12MCsOf4KRequiredInfo.min4KModuleMCs) {
    focusAreaAtLeast12MCsOf4KRequiredInfo.is4KTrue = true;
  }
  return focusAreaAtLeast12MCsOf4KRequiredInfo;
}
