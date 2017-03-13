
export const findFocusAreaPrimaryModules = function findFocusAreaPrimaryModules(academicCohort, studentFocusArea, studentSemesters, exemptedModules, waivedModules, requiredMCs)  {
  let markedFocusAreaPrimaryModulesAndMCs = {
    markedFocusAreaPrimaryModules: studentFocusArea,
    numberOfFocusAreaPrimaryModulesMarkedTrue: 0,
    totalModuleMCs: 0,
    moduleChecked: {},
    requiredMCs: requiredMCs
  };

  let moduleFulfilment = {};
  let moduleFulfilmentMappingEquivalent = [];
  const keyNames = Object.keys(studentFocusArea);

  // loop through markedIndustrialExperienceTrainingModules
    for (var i=0; i < keyNames.length; i++) {
    // check equivalent module fulfilment if available
    moduleFulfilment = getModuleFulfilment(keyNames[i]);

    moduleFulfilmentMappingEquivalent = moduleFulfilment.moduleMapping[academicCohort].moduleEquivalent;
    markedFocusAreaPrimaryModulesAndMCs = markExceptions(markedFocusAreaPrimaryModulesAndMCs, studentSemesters, keyNames[i], keyNames[i]);
    markedFocusAreaPrimaryModulesAndMCs = markExemptedWaivedExceptions(markedFocusAreaPrimaryModulesAndMCs, exemptedModules, waivedModules, keyNames[i], keyNames[i]);

    if (!markedFocusAreaPrimaryModulesAndMCs.markedFocusAreaPrimaryModules[keyNames[i]]
        && moduleFulfilmentMappingEquivalent.length !== 0) {
      for (var j = 0; j < moduleFulfilmentMappingEquivalent.length; j++)  {
        // check if equivalent module exists in studentPlanner, exemptedModules, waivedModules
        // checks if in exempted or waived modules
        markedFocusAreaPrimaryModulesAndMCs = markExemptedWaivedExceptions(markedFocusAreaPrimaryModulesAndMCs, exemptedModules, waivedModules, moduleFulfilmentMappingEquivalent[j], keyNames[i]);
        markedFocusAreaPrimaryModulesAndMCs = markExceptions(markedFocusAreaPrimaryModulesAndMCs, studentSemesters, moduleFulfilmentMappingEquivalent[j], keyNames[i]);
      }
    }
    if (markedFocusAreaPrimaryModulesAndMCs.numberOfFocusAreaPrimaryModulesMarkedTrue === keyNames.length) {
      markedFocusAreaPrimaryModulesAndMCs.requiredMCs = markedFocusAreaPrimaryModulesAndMCs.totalModuleMCs;
      break;
    }
  }
  // return { moduleCode: boolean } object
  return markedFocusAreaPrimaryModulesAndMCs;
}

export const findFocusArea4000Modules = function findFocusArea4000Modules(academicCohort, studentFocusArea, studentPlanner, exemptedModules, waivedModules)  {
  // find focus area 4000 document given academic cohort and student focus area

  // loop through focus area 4000 modules
    // check equivalent module fulfilment available

    // check if equivalent module exists in studentPlanner

    // check if equivalent module exists in exemptedModules

    // check if equivalent module exists in exemptedModules

    // mark focusArea4000Modules as true or false depending on whether modules exists in studentPlanner/exemptedModules/waivedModules

  // return { moduleCode: boolean } object
}

const markModules = function markModules(markedFocusAreaModulesAndMCs, studentSemesters, equivalentModule, originalModule) {
  for (var i = 0; i < studentSemesters.length; i++) {
    if (studentSemesters[i].moduleHashmap[equivalentModule]) {
      markedFocusAreaModulesAndMCs.markedFocusAreaPrimaryModules[originalModule] = true;
      markedFocusAreaModulesAndMCs.numberOfFocusAreaPrimaryModulesMarkedTrue += 1;
      if (!markedFocusAreaModulesAndMCs.moduleChecked[equivalentModule])  {
        markedFocusAreaModulesAndMCs.moduleChecked[equivalentModule] = true;
        markedFocusAreaModulesAndMCs.totalModuleMCs += searchByModuleCode(equivalentModule).moduleMC;
      }
      break;
    }
  }

  return markedFocusAreaModulesAndMCs;
}

const markExemptedWaivedModules = function markExemptedWaivedModules(markedFocusAreaModulesAndMCs, exemptedModules, waivedModules, equivalentModule, originalModule) {
  if (Object.keys(exemptedModules).length !== 0)  {
    if (exemptedModules[equivalentModule])  {
      markedFocusAreaModulesAndMCs.markedFocusAreaPrimaryModules[originalModule] = true;
      markedFocusAreaModulesAndMCs.numberOfFocusAreaPrimaryModulesMarkedTrue += 1;
      if (!markedFocusAreaModulesAndMCs.moduleChecked[equivalentModule])  {
        markedFocusAreaModulesAndMCs.moduleChecked[equivalentModule] = true;
        markedFocusAreaModulesAndMCs.totalModuleMCs += searchByModuleCode(equivalentModule).moduleMC;
      }
    }
  }
  if (Object.keys(waivedModules).length !== 0)  {
    if (waivedModules[equivalentModule]) {
      markedFocusAreaModulesAndMCs.markedFocusAreaPrimaryModules[originalModule] = true;
      markedFocusAreaModulesAndMCs.numberOfFocusAreaPrimaryModulesMarkedTrue += 1;
      if (!markedFocusAreaModulesAndMCs.moduleChecked[equivalentModule])  {
        markedFocusAreaModulesAndMCs.moduleChecked[equivalentModule] = true;
      }
    }
  }
  return markedFocusAreaModulesAndMCs;
}

const markExceptions = function markExceptions(markedFocusAreaModulesAndMCs, studentSemesters, equivalentModule, originalModule)  {

}

const markExemptedWaivedExceptions = function markExemptedWaivedExceptions(markedIndustrialExperienceTrainingModulesAndMCs, exemptedModules, waivedModules, equivalentModule, originalModule)  {

}
