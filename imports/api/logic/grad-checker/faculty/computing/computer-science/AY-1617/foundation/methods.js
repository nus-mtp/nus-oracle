// import fulfilment methods here
import { getModuleFulfilment } from '../../../../../../../module-fulfilment/methods';

export const findFoundationRequirementModules = function findFoundationRequirementModules(academicCohort, studentPlanner, foundationModules, exemptedModules, waivedModules) {
  let markedFoundationModules = foundationModules;
  const keyNames = Object.keys(foundationModules);
  const studentSemesters = studentPlanner.semesters;

  // loop through markedFoundationModules
    for (var key in keyNames) {
    // check equivalent module fulfilment if available
    let moduleFulfilmentMappingEquivalent = getModuleFulfilment(key).moduleMapping[academicCohort].moduleEquivalent;
    markedFoundationModules = markModules(markedFoundationModules, studentSemesters, key);

    if (!markedFoundationModules[key] && moduleFulfilmentMappingEquivalent.length !== 0) {
      for (var i = 0; i < moduleFulfilmentMappingEquivalent.length; i++)  {
        // check if equivalent module exists in studentPlanner, exemptedModules, waivedModules
        markedFoundationModules = markModules(markedFoundationModules, studentSemesters, moduleFulfilmentMappingEquivalent[i], key);
        break;
      }
    }

    // checks if in exempted or waived modules
    if (exemptedModules[moduleFulfilmentMappingEquivalent[i]] ||
        waivedModules[moduleFulfilmentMappingEquivalent[i]]) {
      markedFoundationModules[key] = true;
    }
  }
  // return { moduleCode: boolean } object
  return markedFoundationModules;
}

const markModules = function markModules(markedFoundationModules, studentSemesters, equivalentModule, originalModule) {
  for (var j = 0; j < studentSemesters.length; j++) {
    if (studentSemesters[j].moduleMapping[equivalentModule]) {
      // mark markedFoundationModules as true if module exists in studentPlanner/exemptedModules/waivedModules
      markedFoundationModules[originalModule] = true;
      break;
    }
  }
  return markedFoundationModules;
}
