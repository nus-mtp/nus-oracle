import { searchByModuleCode } from '../../../../../../../../database-controller/module/methods';

export const checkFocusAreaFulfilmentMCs = function checkFocusAreaFulfilmentMCs(studentSemesters, studentFocusAreas, requiredMCs) {
  // checks for 24 MCs from focus area modules
  const focusAreaPrimaryKeys = studentFocusAreas.focusAreaPrimaryModules;
  const focusArea4KKeys = studentFocusAreas.focusArea4KModules;
  const focusAreaNonPrimaryKeys = studentFocusAreas.focusAreaNonPrimaryModules;
  const modulesChecked = {};
  let totalMCs = 0;
  let fulfilmentRequirement = {
    requiredMCs: requiredMCs,
    isFulfilled: false
  };

  // for all primary focus area modules, check if module exists in student planner
  for (var i=0; i<studentSemesters.length; i++) {
    let modulePrimaryFocusAreaNames = Object.keys(focusAreaPrimaryKeys);
    for (var j=0; j<modulePrimaryFocusAreaNames.length; j++) {
      let modulePrimaryKeys = Object.keys(focusAreaPrimaryKeys[modulePrimaryFocusAreaNames[j]]);
      for (var k=0; k<modulePrimaryKeys.length; k++)  {
        if (studentSemesters[i].moduleHashmap[modulePrimaryKeys[k]] && !modulesChecked[modulePrimaryKeys[k]])  {
          totalMCs += searchByModuleCode(modulePrimaryKeys[k]).moduleMC;
          modulesChecked[modulePrimaryKeys[k]] = true;
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
        if (studentSemesters[i].moduleHashmap[module4KKeys[k]] && !modulesChecked[module4KKeys[k]])  {
          totalMCs += searchByModuleCode(module4KKeys[k]).moduleMC;
          modulesChecked[module4KKeys[k]] = true;
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
        if (studentSemesters[i].moduleHashmap[moduleNonPrimaryKeys[k]] && !modulesChecked[moduleNonPrimaryKeys[k]])  {
          totalMCs += searchByModuleCode(moduleNonPrimaryKeys[k]).moduleMC;
          modulesChecked[moduleNonPrimaryKeys[k]] = true;
        }
      }
    }
  }

  if (totalMCs >= fulfilmentRequirement.requiredMCs) {
    fulfilmentRequirement.isFulfilled = true;
  }

  return fulfilmentRequirement;
}

export const findFocusAreaModules = function findFocusAreaModules(focusAreaName, academicCohort, studentSemesters, studentFocusArea, exemptedModules, waivedModules)  {
  let markedFocusAreaModulesAndMCs = {
    name: focusAreaName,
    markedFocusAreaPrimaryModules: studentFocusArea.focusAreaPrimaryModules,
    markedFocusArea4KModules: studentFocusArea.focusArea4KModules,
    numberOfFocusAreaPrimaryModulesMarkedTrue: 0,
    minNumberOfPrimaryFocusArea: 3,
    minNumberOfPrimary4K: 1,
    total4KModuleMCs: 0,
    min4KModuleMCs: 12,
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
  const focusArea4KKeys = Object.keys(markedFocusAreaModulesAndMCs.markedFocusArea4KModules);

  for (var i=0; i<focusAreaPrimaryKeys.length; i++) {
    markedFocusAreaModulesAndMCs = markPrimaryExemptedWaivedModules(markedFocusAreaModulesAndMCs, exemptedModules, waivedModules, focusAreaPrimaryKeys[i]);
    markedFocusAreaModulesAndMCs = markPrimaryModules(markedFocusAreaModulesAndMCs, studentSemesters, focusAreaPrimaryKeys[i]);
  }

  // checks if primary has at least 3 modules
  if (markedFocusAreaModulesAndMCs.numberOfFocusAreaPrimaryModulesMarkedTrue < markedFocusAreaModulesAndMCs.minNumberOfPrimaryFocusArea) {
    return markedFocusAreaModulesAndMCs;
  }

  // checks if primary has at least 1 4K
  for (var i=0; i<focusArea4KKeys.length; i++)  {
    if (markedFocusAreaModulesAndMCs.markedFocusAreaPrimaryModules[focusArea4KKeys[i]]) {
      markedFocusAreaModulesAndMCs.isPrimaryTrue = true;
      break;
    }
  }

  return markedFocusAreaModulesAndMCs;
}

const findFocusArea4KModules = function findFocusArea4KModules(markedFocusAreaModulesAndMCs, studentSemesters, exemptedModules, waivedModules)  {
  const keyNames = Object.keys(markedFocusAreaModulesAndMCs.markedFocusArea4KModules);

  for (var i=0; i<keyNames.length; i++) {
    markedFocusAreaModulesAndMCs = mark4KExemptedWaivedModules(markedFocusAreaModulesAndMCs, exemptedModules, waivedModules, keyNames[i]);
    markedFocusAreaModulesAndMCs = mark4KModules(markedFocusAreaModulesAndMCs, studentSemesters, keyNames[i]);
  }

  // only set 4K condition true if more than minModule4K mcs have been fulfiled
  if (markedFocusAreaModulesAndMCs.total4KModuleMCs >= markedFocusAreaModulesAndMCs.min4KModuleMCs) {
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
      markedFocusAreaModulesAndMCs.moduleChecked[originalModule] = true;
    }
  }
  return markedFocusAreaModulesAndMCs;
}
