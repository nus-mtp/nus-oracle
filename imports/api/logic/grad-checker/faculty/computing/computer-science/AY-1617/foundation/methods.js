// import fulfilment methods here
import { getModuleFulfilment } from '../../../../../../../module-fulfilment/methods';

export const findFoundationRequirementModules = function findFoundationRequirementModules(academicCohort, studentPlanner, foundationModules, exemptedModules, waivedModules) {
  let markedFoundationModules = foundationModules;
  const keyNames = Object.keys(foundationModules);
  // loop through markedFoundationModules
    for (var key in keyNames) {
    // check equivalent module fulfilment if available
    let moduleFulfilmentMappingEquivalent = getModuleFulfilment(key).moduleMapping[academicCohort].moduleEquivalent;

    if (moduleFulfilmentMappingEquivalent.length !== 0) {
      for (var i = 0; i < moduleFulfilmentMappingEquivalent.length; i++)  {
          // check if equivalent module exists in studentPlanner, exemptedModules, waivedModules
        if (studentPlanner[moduleFulfilmentMappingEquivalent[i]] ||
            exemptedModules[moduleFulfilmentMappingEquivalent[i]] ||
            waivedModules[moduleFulfilmentMappingEquivalent[i]]) {

          // mark markedFoundationModules as true if module exists in studentPlanner/exemptedModules/waivedModules
          markedFoundationModules[key] = true;
        }
      }
    }
  }
  // return { moduleCode: boolean } object
  return markedFoundationModules;
}
