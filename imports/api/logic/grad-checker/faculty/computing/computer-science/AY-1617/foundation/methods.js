// import fulfilment methods here
import { getModuleFulfilment } from '../../../../../../../database-controller/module-fulfilment/methods';

export const findFoundationRequirementModules = function findFoundationRequirementModules(academicCohort, studentSemesters, foundationModules, exemptedModules, waivedModules) {
  let markedFoundationModules = foundationModules;
  let moduleFulfilment = {};
  let moduleFulfilmentMappingEquivalent = [];
  const keyNames = Object.keys(foundationModules);

  // loop through markedFoundationModules
    for (var i=0; i<keyNames.length; i++) {
    // check equivalent module fulfilment if available
    moduleFulfilment = getModuleFulfilment(keyNames[i]);

    moduleFulfilmentMappingEquivalent = moduleFulfilment.moduleMapping[academicCohort].moduleEquivalent;

    markedFoundationModules = markModules(markedFoundationModules, studentSemesters, keyNames[i], keyNames[i]);

    if (!markedFoundationModules[keyNames[i]] && moduleFulfilmentMappingEquivalent.length !== 0) {
      for (var j = 0; j < moduleFulfilmentMappingEquivalent.length; j++)  {
        // check if equivalent module exists in studentPlanner, exemptedModules, waivedModules
        // checks if in exempted or waived modules
        markedFoundationModules = markExemptedWaivedModules(markedFoundationModules, exemptedModules, waivedModules, moduleFulfilmentMappingEquivalent[j], keyNames[i]);
        markedFoundationModules = markModules(markedFoundationModules, studentSemesters, moduleFulfilmentMappingEquivalent[j], keyNames[i]);
        break;
      }
    }
  }
  // return { moduleCode: boolean } object
  return markedFoundationModules;
}

const markModules = function markModules(markedFoundationModules, studentSemesters, equivalentModule, originalModule) {
  for (var i = 0; i < studentSemesters.length; i++) {
    if (studentSemesters[i].moduleHashmap[equivalentModule]) {
      // mark markedFoundationModules as true if module exists in studentPlanner/exemptedModules/waivedModules
      markedFoundationModules[originalModule] = true;
      break;
    }
  }
  return markedFoundationModules;
}

const markExemptedWaivedModules = function markExemptedWaivedModules(markedFoundationModules, exemptedModules, waivedModules, equivalentModule, originalModule) {
  if (Object.keys(exemptedModules).length !== 0)  {
    if (exemptedModules[equivalentModule])  {
      markedFoundationModules[originalModule] = true;
    }
  }
  if (Object.keys(waivedModules).length !== 0)  {
    if (waivedModules[equivalentModule]) {
      markedFoundationModules[originalModule] = true;
    }
  }
  return markedFoundationModules;
}
