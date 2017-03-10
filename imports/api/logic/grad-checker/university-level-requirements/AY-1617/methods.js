import { getModuleFulfilment } from '../../../../database-controller/module-fulfilment/methods';
import { searchByModuleCode } from '../../../../database-controller/module/methods';

export const findULRRequirementModules = function findULRRequirementModules(academicCohort, studentSemesters, ULRModules, exemptedModules, waivedModules, requiredMCs) {
  let markedULRModulesAndMCs = {
    markedULRModules: ULRModules,
    numberOfULRMarkedTrue: 0,
    totalModuleMCs: 0,
    moduleChecked: {},
    requiredMCs: requiredMCs
  };

  let moduleFulfilment = {};
  let moduleFulfilmentMappingEquivalent = [];
  const keyNames = Object.keys(ULRModules);

  // loop through markedULRModules
    for (var i=0; i<keyNames.length; i++) {
    // check equivalent module fulfilment if available
    moduleFulfilment = getModuleFulfilment(keyNames[i]);

    moduleFulfilmentMappingEquivalent = moduleFulfilment.moduleMapping[academicCohort].moduleEquivalent;
    markedULRModulesAndMCs = markExceptions(markedULRModulesAndMCs, studentSemesters, keyNames[i], keyNames[i]);
    markedULRModulesAndMCs = markExemptedWaivedExceptions(markedULRModulesAndMCs, exemptedModules, waivedModules, keyNames[i], keyNames[i]);

    if (!markedULRModulesAndMCs.markedULRModules[keyNames[i]]
        && moduleFulfilmentMappingEquivalent.length !== 0) {
      for (var j = 0; j < moduleFulfilmentMappingEquivalent.length; j++)  {
        // check if equivalent module exists in studentPlanner, exemptedModules, waivedModules
        // checks if in exempted or waived modules
        markedULRModulesAndMCs = markExemptedWaivedExceptions(markedULRModulesAndMCs, exemptedModules, waivedModules, moduleFulfilmentMappingEquivalent[j], keyNames[i]);
        // early termination here
        if (markedULRModulesAndMCs.markedULRModules[keyNames[i]]) {
          break;
        }
        markedULRModulesAndMCs = markExceptions(markedULRModulesAndMCs, studentSemesters, moduleFulfilmentMappingEquivalent[j], keyNames[i]);
      }
    }
    if (markedULRModulesAndMCs.numberOfULRMarkedTrue === keyNames.length) {
      markedULRModulesAndMCs.requiredMCs = markedULRModulesAndMCs.totalModuleMCs;
      break;
    }
  }
  // return { moduleCode: boolean } object
  return markedULRModulesAndMCs;
}

const markModules = function markModules(markedULRModulesAndMCs, studentSemesters, equivalentModule, originalModule) {
  for (var i = 0; i < studentSemesters.length; i++) {
    if (studentSemesters[i].moduleHashmap[equivalentModule]) {
      markedULRModulesAndMCs.markedULRModules[originalModule] = true;
      markedULRModulesAndMCs.numberOfULRMarkedTrue += 1;
      if (!markedULRModulesAndMCs.moduleChecked[equivalentModule])  {
        markedULRModulesAndMCs.moduleChecked[equivalentModule] = true;
        markedULRModulesAndMCs.totalModuleMCs += searchByModuleCode(equivalentModule).moduleMC;
      }
      break;
    }
  }

  return markedULRModulesAndMCs;
}

const markExemptedWaivedModules = function markExemptedWaivedModules(markedULRModulesAndMCs, exemptedModules, waivedModules, equivalentModule, originalModule) {
  if (Object.keys(exemptedModules).length !== 0)  {
    if (exemptedModules[equivalentModule])  {
      markedULRModulesAndMCs.markedULRModules[originalModule] = true;
      markedULRModulesAndMCs.numberOfULRMarkedTrue += 1;
      if (!markedULRModulesAndMCs.moduleChecked[equivalentModule])  {
        markedULRModulesAndMCs.moduleChecked[equivalentModule] = true;
        markedULRModulesAndMCs.totalModuleMCs += searchByModuleCode(equivalentModule).moduleMC;
      }
    }
  }
  if (Object.keys(waivedModules).length !== 0)  {
    if (waivedModules[equivalentModule]) {
      markedULRModulesAndMCs.markedULRModules[originalModule] = true;
      markedULRModulesAndMCs.numberOfULRMarkedTrue += 1;
      if (!markedULRModulesAndMCs.moduleChecked[equivalentModule])  {
        markedULRModulesAndMCs.moduleChecked[equivalentModule] = true;
      }
    }
  }
  return markedULRModulesAndMCs;
}

const markExceptions = function markExceptions(markedULRModulesAndMCs, studentSemesters, equivalentModule, originalModule)  {
  return markModules(markedULRModulesAndMCs, studentSemesters, equivalentModule, originalModule);
}

const markExemptedWaivedExceptions = function markExemptedWaivedExceptions(markedULRModulesAndMCs, exemptedModules, waivedModules, equivalentModule, originalModule)  {
  return markExemptedWaivedModules(markedULRModulesAndMCs, exemptedModules, waivedModules, equivalentModule, originalModule);
}
