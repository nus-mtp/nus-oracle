// import fulfilment methods here
import { getModuleFulfilment } from '../../../../../../../database-controller/module-fulfilment/methods';
import { searchByModuleCode } from '../../../../../../../database-controller/module/methods';

export const findFoundationRequirementModules = function findFoundationRequirementModules(academicCohort, studentSemesters, foundationModules, exemptedModules, waivedModules, requiredMCs) {
  let markedFoundationModulesAndMCs = {
    markedFoundationModules: foundationModules,
    numberOfFoundationModulesMarkedTrue: 0,
    moduleChecked: {},
    totalModuleMCs: 0,
    requiredMCs: requiredMCs
  };

  let moduleFulfilment = {};
  let moduleFulfilmentMappingEquivalent = [];
  const keyNames = Object.keys(foundationModules);

  // loop through markedFoundationModules
    for (var i=0; i<keyNames.length; i++) {
    // check equivalent module fulfilment if available
    moduleFulfilment = getModuleFulfilment(keyNames[i]);
    console.log(moduleFulfilment);

    moduleFulfilmentMappingEquivalent = moduleFulfilment.moduleMapping[academicCohort].moduleEquivalent;
    markedFoundationModulesAndMCs = markModules(markedFoundationModulesAndMCs, studentSemesters, keyNames[i], keyNames[i]);
    markedFoundationModulesAndMCs = markExemptedWaivedModules(markedFoundationModulesAndMCs, exemptedModules, waivedModules, keyNames[i], keyNames[i]);

    if (!markedFoundationModulesAndMCs.markedFoundationModules[keyNames[i]] && moduleFulfilmentMappingEquivalent.length !== 0) {
      for (var j = 0; j < moduleFulfilmentMappingEquivalent.length; j++)  {
        // check if equivalent module exists in studentPlanner, exemptedModules, waivedModules
        markedFoundationModulesAndMCs = markExemptedWaivedModules(markedFoundationModulesAndMCs, exemptedModules, waivedModules, moduleFulfilmentMappingEquivalent[j], keyNames[i]);
        if (markedFoundationModulesAndMCs.markedFoundationModules[keyNames[i]]) {
          break;
        }
        markedFoundationModulesAndMCs = markModules(markedFoundationModulesAndMCs, studentSemesters, moduleFulfilmentMappingEquivalent[j], keyNames[i]);
      }
    }
    // checks if all modules in foundation has been marked true
    if (markedFoundationModulesAndMCs.numberOfFoundationModulesMarkedTrue === keyNames.length) {
      markedFoundationModulesAndMCs.requiredMCs = markedFoundationModulesAndMCs.totalModuleMCs;
      break;
    }
  }
  return markedFoundationModulesAndMCs;
}

const markModules = function markModules(markedFoundationModulesAndMCs, studentSemesters, equivalentModule, originalModule) {
  for (var i = 0; i < studentSemesters.length; i++) {
    if (studentSemesters[i].moduleHashmap[equivalentModule]) {
      // mark markedFoundationModules as true if module exists in studentPlanner/exemptedModules/waivedModules
      markedFoundationModulesAndMCs.markedFoundationModules[originalModule] = true;
      markedFoundationModulesAndMCs.numberOfFoundationModulesMarkedTrue += 1;
      if (!markedFoundationModulesAndMCs.moduleChecked[equivalentModule])  {
        markedFoundationModulesAndMCs.moduleChecked[equivalentModule] = true;
        markedFoundationModulesAndMCs.totalModuleMCs += searchByModuleCode(equivalentModule).moduleMC;
      }
      break;
    }
  }

  return markedFoundationModulesAndMCs;
}

const markExemptedWaivedModules = function markExemptedWaivedModules(markedFoundationModulesAndMCs, exemptedModules, waivedModules, equivalentModule, originalModule) {
  if (Object.keys(exemptedModules).length !== 0)  {
    if (exemptedModules[equivalentModule])  {
      markedFoundationModulesAndMCs.markedFoundationModules[originalModule] = true;
      markedFoundationModulesAndMCs.numberOfFoundationModulesMarkedTrue += 1;
      if (!markedFoundationModulesAndMCs.moduleChecked[equivalentModule])  {
        markedFoundationModulesAndMCs.moduleChecked[equivalentModule] = true;
        markedFoundationModulesAndMCs.totalModuleMCs += searchByModuleCode(equivalentModule).moduleMC;
      }
    }
  }
  if (Object.keys(waivedModules).length !== 0)  {
    if (waivedModules[equivalentModule]) {
      markedFoundationModulesAndMCs.markedFoundationModules[originalModule] = true;
      markedFoundationModulesAndMCs.numberOfFoundationModulesMarkedTrue += 1;
      if (!markedFoundationModulesAndMCs.moduleChecked[equivalentModule])  {
        markedFoundationModulesAndMCs.moduleChecked[equivalentModule] = true;
      }
    }
  }
  return markedFoundationModulesAndMCs;
}
