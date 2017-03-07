// import fulfilment methods here
import { getModuleFulfilment } from '../../../../../../../database-controller/module-fulfilment/methods';
import { searchByModuleCode } from '../../../../../../../database-controller/module/methods';

export const findFoundationRequirementModules = function findFoundationRequirementModules(academicCohort, studentSemesters, foundationModules, exemptedModules, waivedModules) {
  let markedFoundationModulesAndMCs = {
    markedFoundationModules: foundationModules,
    totalModuleMCs: 0
  };

  let moduleFulfilment = {};
  let moduleFulfilmentMappingEquivalent = [];
  const keyNames = Object.keys(foundationModules);

  // loop through markedFoundationModules
    for (var i=0; i<keyNames.length; i++) {
    // check equivalent module fulfilment if available
    moduleFulfilment = getModuleFulfilment(keyNames[i]);

    moduleFulfilmentMappingEquivalent = moduleFulfilment.moduleMapping[academicCohort].moduleEquivalent;
    markedFoundationModulesAndMCs = markModules(markedFoundationModulesAndMCs, studentSemesters, keyNames[i], keyNames[i]);
    markedFoundationModulesAndMCs = markExemptedWaivedModules(markedFoundationModulesAndMCs, exemptedModules, waivedModules, keyNames[i], keyNames[i]);

    if (!markedFoundationModulesAndMCs.markedFoundationModules[keyNames[i]] && moduleFulfilmentMappingEquivalent.length !== 0) {
      for (var j = 0; j < moduleFulfilmentMappingEquivalent.length; j++)  {
        // check if equivalent module exists in studentPlanner, exemptedModules, waivedModules
        // checks if in exempted or waived modules
        markedFoundationModulesAndMCs = markExemptedWaivedModules(markedFoundationModulesAndMCs, exemptedModules, waivedModules, moduleFulfilmentMappingEquivalent[j], keyNames[i]);
        markedFoundationModulesAndMCs = markModules(markedFoundationModulesAndMCs, studentSemesters, moduleFulfilmentMappingEquivalent[j], keyNames[i]);
        break;
      }
    }
    // if requiredMCs is equal to totalMCs accumulated
    /*if (requiredMCs === markedFoundationModulesAndMCs.totalModuleMCs) {

      break;
    }*/
  }
  // return { moduleCode: boolean } object
  return markedFoundationModulesAndMCs;
}

const markModules = function markModules(markedFoundationModulesAndMCs, studentSemesters, equivalentModule, originalModule) {
  for (var i = 0; i < studentSemesters.length; i++) {
    if (studentSemesters[i].moduleHashmap[equivalentModule]) {
      // mark markedFoundationModules as true if module exists in studentPlanner/exemptedModules/waivedModules
      markedFoundationModulesAndMCs.markedFoundationModules[originalModule] = true;
      markedFoundationModulesAndMCs.totalModuleMCs += searchByModuleCode(originalModule).moduleMC;
      break;
    }
  }

  return markedFoundationModulesAndMCs;
}

const markExemptedWaivedModules = function markExemptedWaivedModules(markedFoundationModulesAndMCs, exemptedModules, waivedModules, equivalentModule, originalModule) {
  if (Object.keys(exemptedModules).length !== 0)  {
    if (exemptedModules[equivalentModule])  {
      markedFoundationModulesAndMCs.markedFoundationModules[originalModule] = true;
      markedFoundationModulesAndMCs.totalModuleMCs += searchByModuleCode(originalModule).moduleMC;
    }
  }
  if (Object.keys(waivedModules).length !== 0)  {
    if (waivedModules[equivalentModule]) {
      markedFoundationModulesAndMCs.markedFoundationModules[originalModule] = true;
    }
  }
  return markedFoundationModulesAndMCs;
}
