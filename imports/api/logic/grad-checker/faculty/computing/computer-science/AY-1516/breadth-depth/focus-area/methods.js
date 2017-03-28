import { searchByModuleCode } from '../../../../../../../../database-controller/module/methods';

/* Explanation for new AY creation
 * There are 2 functions called by the AYXX/XX grad checker handler:
 * 1. checkFocusAreaFulfilmentMCs
 * 2. findFocusAreaModules
 *
 * When migrating to new AY, unless there are huge changes in graduation calculation,
 * only modify
 * 1. findFocusAreaPrimary
 * 2. findFocusArea4KModules
 */

// focus area MCs are assumed to be at 4MCs and no focus area with more than 4MCs
export const checkFocusAreaFulfilmentMCs = function checkFocusAreaFulfilmentMCs(studentSemesters, studentFocusAreas, requiredMCs, moduleChecked) {
  // checks for 24 MCs from focus area modules
  const focusAreaPrimaryKeys = studentFocusAreas.focusAreaPrimaryModules;
  const focusArea4KKeys = studentFocusAreas.focusArea4KModules;
  const focusAreaPrimary4KKeys = studentFocusAreas.focusAreaPrimary4KModules;
  const focusAreaNonPrimaryKeys = studentFocusAreas.focusAreaNonPrimaryModules;
  let totalMCs = 0;
  let fulfilmentRequirement = {
    requiredMCs: requiredMCs,
    isFulfilled: false,
    modulesChecked: {}    // swap this out to moduleChecked once focus area decision has been implemented
  };

  // for moduleChecked, only mark true if total number of MCs is less than or equal to
  // the required number of MCs

  // for all primary focus area modules, check if module exists in student planner
  for (var i=0; i<studentSemesters.length; i++) {
    let modulePrimaryFocusAreaNames = Object.keys(focusAreaPrimaryKeys);
    for (var j=0; j<modulePrimaryFocusAreaNames.length; j++) {
      let modulePrimaryKeys = Object.keys(focusAreaPrimaryKeys[modulePrimaryFocusAreaNames[j]]);
      for (var k=0; k<modulePrimaryKeys.length; k++)  {
        if (studentSemesters[i].moduleHashmap[modulePrimaryKeys[k]] && !fulfilmentRequirement.modulesChecked[modulePrimaryKeys[k]])  {
          totalMCs += searchByModuleCode(modulePrimaryKeys[k]).moduleMC;
          fulfilmentRequirement.modulesChecked[modulePrimaryKeys[k]] = true;
        }
      }
    }
  }

  // for all 4K focus area modules, check if module exists in student planner
  for (var i=0; i<studentSemesters.length; i++) {
    let module4KFocusAreaNames = Object.keys(focusArea4KKeys);
    for (var j=0; j<module4KFocusAreaNames.length; j++) {
      let module4KKeys = Object.keys(focusArea4KKeys[module4KFocusAreaNames[j]]);
      for (var k=0; k<module4KKeys.length; k++)  {
        if (studentSemesters[i].moduleHashmap[module4KKeys[k]] && !fulfilmentRequirement.modulesChecked[module4KKeys[k]])  {
          totalMCs += searchByModuleCode(module4KKeys[k]).moduleMC;
          fulfilmentRequirement.modulesChecked[module4KKeys[k]] = true;
        }
      }
    }
  }

  // for all Primary 4K focus area modules, check if module exists in student planner
  for (var i=0; i<studentSemesters.length; i++) {
    let modulePrimary4KFocusAreaNames = Object.keys(focusAreaPrimary4KKeys);
    for (var j=0; j<modulePrimary4KFocusAreaNames.length; j++) {
      let modulePrimary4KKeys = Object.keys(focusAreaPrimary4KKeys[modulePrimary4KFocusAreaNames[j]]);
      for (var k=0; k<modulePrimary4KKeys.length; k++)  {
        if (studentSemesters[i].moduleHashmap[modulePrimary4KKeys[k]] && !fulfilmentRequirement.modulesChecked[modulePrimary4KKeys[k]])  {
          totalMCs += searchByModuleCode(modulePrimary4KKeys[k]).moduleMC;
          fulfilmentRequirement.modulesChecked[modulePrimary4KKeys[k]] = true;
        }
      }
    }
  }

  // for all non primary focus area modules, check if module exists in student planner
  for (var i=0; i<studentSemesters.length; i++) {
    let moduleNonPrimaryFocusAreaNames = Object.keys(focusAreaNonPrimaryKeys);
    for (var j=0; j<moduleNonPrimaryFocusAreaNames.length; j++) {
      let moduleNonPrimaryKeys = Object.keys(focusAreaNonPrimaryKeys[moduleNonPrimaryFocusAreaNames[j]]);
      for (var k=0; k<moduleNonPrimaryKeys.length; k++)  {
        if (studentSemesters[i].moduleHashmap[moduleNonPrimaryKeys[k]] && !fulfilmentRequirement.modulesChecked[moduleNonPrimaryKeys[k]])  {
          totalMCs += searchByModuleCode(moduleNonPrimaryKeys[k]).moduleMC;
          fulfilmentRequirement.modulesChecked[moduleNonPrimaryKeys[k]] = true;
        }
      }
    }
  }

  if (totalMCs >= fulfilmentRequirement.requiredMCs) {
    fulfilmentRequirement.isFulfilled = true;
  }

  return fulfilmentRequirement;
}

export const findFocusAreaModules = function findFocusAreaModules(focusAreaName, academicCohort, studentSemesters, studentFocusArea, exemptedModules, waivedModules, moduleChecked)  {
  let markedFocusAreaModulesAndMCs = {
    name: focusAreaName,
    markedFocusAreaPrimaryModules: studentFocusArea.focusAreaPrimaryModules,
    markedFocusAreaPrimary4KModules:  studentFocusArea.focusAreaPrimary4KModules,
    markedFocusArea4KModules: studentFocusArea.focusArea4KModules,
    numberOfFocusAreaPrimaryModulesMarkedTrue: 0,
    minNumberOfPrimaryFocusArea: 3,
    minNumberOfPrimary4K: 1,
    min4KModuleMCs: 12,
    moduleChecked: moduleChecked,
    threePrimaryModules: false,
    one4KModules: false,
    total4KModuleMCs: 0,
    isPrimaryTrue: false,
    is4KTrue: false,
  };

  // check focus area primary
  markedFocusAreaModulesAndMCs = findFocusAreaPrimary(markedFocusAreaModulesAndMCs, studentSemesters, exemptedModules, waivedModules);

  // check 4K focus area
  markedFocusAreaModulesAndMCs = findFocusArea4KModules(markedFocusAreaModulesAndMCs, studentSemesters, exemptedModules, waivedModules);

  return markedFocusAreaModulesAndMCs;
}

const findFocusAreaPrimary = function findFocusAreaPrimary(markedFocusAreaModulesAndMCs, studentSemesters, exemptedModules, waivedModules)  {
  const focusAreaPrimaryKeys = Object.keys(markedFocusAreaModulesAndMCs.markedFocusAreaPrimaryModules);
  const focusAreaPrimary4KKeys = Object.keys(markedFocusAreaModulesAndMCs.markedFocusAreaPrimary4KModules);

  // check primary non 4Ks
  for (var i=0; i<focusAreaPrimaryKeys.length; i++) {
    markedFocusAreaModulesAndMCs = markPrimaryExemptedWaivedModules(markedFocusAreaModulesAndMCs, exemptedModules, waivedModules, focusAreaPrimaryKeys[i]);
    markedFocusAreaModulesAndMCs = markPrimaryModules(markedFocusAreaModulesAndMCs, studentSemesters, focusAreaPrimaryKeys[i]);
  }

  // check primary 4Ks
  for (var i=0; i<focusAreaPrimary4KKeys.length; i++) {
    markedFocusAreaModulesAndMCs = markPrimary4KExemptedWaivedModules(markedFocusAreaModulesAndMCs, exemptedModules, waivedModules, focusAreaPrimary4KKeys[i]);
    markedFocusAreaModulesAndMCs = markPrimary4KModules(markedFocusAreaModulesAndMCs, studentSemesters, focusAreaPrimary4KKeys[i]);
  }

  // checks if primary has at least 3 modules
  if (markedFocusAreaModulesAndMCs.numberOfFocusAreaPrimaryModulesMarkedTrue >= markedFocusAreaModulesAndMCs.minNumberOfPrimaryFocusArea) {
    markedFocusAreaModulesAndMCs.threePrimaryModules = true;
  }

  // checks if primary has at least 1 primary 4K
  for (var i=0; i<focusAreaPrimary4KKeys.length; i++)  {
    if (markedFocusAreaModulesAndMCs.markedFocusAreaPrimary4KModules[focusAreaPrimary4KKeys[i]]) {
      markedFocusAreaModulesAndMCs.one4KModules = true;
      break;
    }
  }

  if (markedFocusAreaModulesAndMCs.threePrimaryModules && markedFocusAreaModulesAndMCs.one4KModules)  {
    /*const numberOfPrimariesChecked = 0;
    // mark modules to be true only if the focus area has been marked true
    // when implementation of focus area decision is done, do a check here that checks if focus area
    // is the focus area and only consider it into moduleChecked if it is
    for (var j=0; j<focusAreaPrimary4KKeys; j++)  {
      if (markedFocusAreaModulesAndMCs.markedFocusAreaPrimary4KModules[focusAreaPrimary4KKeys[i]]) {
        markedFocusAreaModulesAndMCs.moduleChecked[focusAreaPrimary4KKeys] = true;
        numberOfPrimariesChecked += 1;
        break;
      }
    }
    for (var i=0; i<focusAreaPrimaryKeys.length; i++)  {
      if (markedFocusAreaModulesAndMCs.markedFocusAreaPrimaryModules[focusAreaPrimaryKeys]) {
        markedFocusAreaModulesAndMCs.moduleChecked[focusAreaPrimaryKeys] = true;
        numberOfPrimariesChecked += 1;
      }
      if (numberOfPrimariesChecked === markedFocusAreaModulesAndMCs.minNumberOfPrimaryFocusArea)  {
        break;
      }
    }*/
    markedFocusAreaModulesAndMCs.isPrimaryTrue = true;
  }

  return markedFocusAreaModulesAndMCs;
}

// run find focus area 4k on all 4k modules, not just 1 focus area
const findFocusArea4KModules = function findFocusArea4KModules(markedFocusAreaModulesAndMCs, studentSemesters, exemptedModules, waivedModules)  {
  const keyNames = Object.keys(markedFocusAreaModulesAndMCs.markedFocusArea4KModules);

  for (var i=0; i<keyNames.length; i++) {
    markedFocusAreaModulesAndMCs = mark4KExemptedWaivedModules(markedFocusAreaModulesAndMCs, exemptedModules, waivedModules, keyNames[i]);
    markedFocusAreaModulesAndMCs = mark4KModules(markedFocusAreaModulesAndMCs, studentSemesters, keyNames[i]);
  }

  // only set 4K condition true if more than minModule4K mcs have been fulfiled
  if (markedFocusAreaModulesAndMCs.total4KModuleMCs >= markedFocusAreaModulesAndMCs.min4KModuleMCs) {
    /*for (var i=0; i<keyNames.length; i++) {
      if (markedFocusAreaModulesAndMCs.markedFocusArea4KModules[keyNames[i]]) {
        // make sure to check if number of modules checked does not exceed
        // 12 MCs worth of 4K here
        markedFocusAreaModulesAndMCs.moduleChecked[keyNames[i]] = true;
      }
    }*/
    markedFocusAreaModulesAndMCs.is4KTrue = true;
  }

  return markedFocusAreaModulesAndMCs;
}

const markPrimaryModules = function markModules(markedFocusAreaModulesAndMCs, studentSemesters, originalModule) {
  for (var i = 0; i < studentSemesters.length; i++) {
    if (studentSemesters[i].moduleHashmap[originalModule]) {
      markedFocusAreaModulesAndMCs.markedFocusAreaPrimaryModules[originalModule] = true;
      markedFocusAreaModulesAndMCs.numberOfFocusAreaPrimaryModulesMarkedTrue += 1;
      break;
    }
  }
  return markedFocusAreaModulesAndMCs;
}

const markPrimary4KModules = function markModules(markedFocusAreaModulesAndMCs, studentSemesters, originalModule) {
  for (var i = 0; i < studentSemesters.length; i++) {
    if (studentSemesters[i].moduleHashmap[originalModule]) {
      markedFocusAreaModulesAndMCs.markedFocusAreaPrimary4KModules[originalModule] = true;
      markedFocusAreaModulesAndMCs.numberOfFocusAreaPrimaryModulesMarkedTrue += 1;
      break;
    }
  }
  return markedFocusAreaModulesAndMCs;
}

const markPrimaryExemptedWaivedModules = function markExemptedWaivedModules(markedFocusAreaModulesAndMCs, exemptedModules, waivedModules, originalModule) {
  if (Object.keys(exemptedModules).length !== 0)  {
    if (exemptedModules[originalModule])  {
      markedFocusAreaModulesAndMCs.markedFocusAreaPrimaryModules[originalModule] = true;
      markedFocusAreaModulesAndMCs.numberOfFocusAreaPrimaryModulesMarkedTrue += 1;
    }
  }
  if (Object.keys(waivedModules).length !== 0)  {
    if (waivedModules[originalModule]) {
      markedFocusAreaModulesAndMCs.markedFocusAreaPrimaryModules[originalModule] = true;
      markedFocusAreaModulesAndMCs.numberOfFocusAreaPrimaryModulesMarkedTrue += 1;
    }
  }
  return markedFocusAreaModulesAndMCs;
}

const markPrimary4KExemptedWaivedModules = function markExemptedWaivedModules(markedFocusAreaModulesAndMCs, exemptedModules, waivedModules, originalModule) {
  if (Object.keys(exemptedModules).length !== 0)  {
    if (exemptedModules[originalModule])  {
      markedFocusAreaModulesAndMCs.markedFocusAreaPrimary4KModules[originalModule] = true;
      markedFocusAreaModulesAndMCs.numberOfFocusAreaPrimaryModulesMarkedTrue += 1;
    }
  }
  if (Object.keys(waivedModules).length !== 0)  {
    if (waivedModules[originalModule]) {
      markedFocusAreaModulesAndMCs.markedFocusAreaPrimary4KModules[originalModule] = true;
      markedFocusAreaModulesAndMCs.numberOfFocusAreaPrimaryModulesMarkedTrue += 1;
    }
  }
  return markedFocusAreaModulesAndMCs;
}

const mark4KModules = function mark4KModules(markedFocusAreaModulesAndMCs, studentSemesters, originalModule) {
  for (var i = 0; i < studentSemesters.length; i++) {
    if (studentSemesters[i].moduleHashmap[originalModule]) {
      markedFocusAreaModulesAndMCs.markedFocusArea4KModules[originalModule] = true;
      markedFocusAreaModulesAndMCs.total4KModuleMCs += searchByModuleCode(originalModule).moduleMC;
      break;
    }
  }
  return markedFocusAreaModulesAndMCs;
}

const mark4KExemptedWaivedModules = function mark4KExemptedWaivedModules(markedFocusAreaModulesAndMCs, exemptedModules, waivedModules, originalModule) {
  if (Object.keys(exemptedModules).length !== 0)  {
    if (exemptedModules[originalModule])  {
      markedFocusAreaModulesAndMCs.markedFocusArea4KModules[originalModule] = true;
      markedFocusAreaModulesAndMCs.total4KModuleMCs += searchByModuleCode(originalModule).moduleMC;
    }
  }
  if (Object.keys(waivedModules).length !== 0)  {
    if (waivedModules[originalModule]) {
      markedFocusAreaModulesAndMCs.markedFocusArea4KModules[originalModule] = true;
    }
  }
  return markedFocusAreaModulesAndMCs;
}
