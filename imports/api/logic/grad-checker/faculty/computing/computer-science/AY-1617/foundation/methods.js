import { getModuleFulfilment } from '../../../../../../../database-controller/module-fulfilment/methods';
import { searchByModuleCode } from '../../../../../../../database-controller/module/methods';

/* Explanation for new AY creation
 * There are 5 functions in this file. To migrate to a new AY, unless there is a
 * huge change in calculation of graduation requirements, the only functions that
 * should be modified are markExceptions and markExemptedWaivedExceptions.
 *
 * The 2 methods above are where code for any new execptions to the calculation of
 * graduation requirement should be placed. If there are no exceptions, simply return
 * markModules and markExemptedWaivedModules
 */


export const findFoundationRequirementModules = function findFoundationRequirementModules(studentInfoObject, foundationModules, requiredMCs) {
  let markedFoundationModulesAndMCs = {
    name: 'Computer Science Foundation',
    markedFoundationModules: foundationModules,
    numberOfFoundationModulesMarkedTrue: 0,
    moduleChecked: studentInfoObject.moduleChecked,
    totalModuleMCs: 0,
    requiredMCs: requiredMCs,
    isFulfilled: false
  };

  let moduleFulfilment = {};
  let moduleFulfilmentMappingEquivalent = [];
  const keyNames = Object.keys(foundationModules);

  // loop through markedFoundationModules
    for (var i=0; i<keyNames.length; i++) {
    // check equivalent module fulfilment if available
    moduleFulfilment = getModuleFulfilment(keyNames[i]);
    if (Object.keys(moduleFulfilment).length <= 0)  {
      return {};
    }

    moduleFulfilmentMappingEquivalent = moduleFulfilment.moduleMapping[studentInfoObject.studentAcademicCohort].moduleEquivalent;
    markedFoundationModulesAndMCs = markExceptions(markedFoundationModulesAndMCs, studentInfoObject.studentSemesters, keyNames[i], keyNames[i]);
    markedFoundationModulesAndMCs = markExemptedWaivedExceptions(markedFoundationModulesAndMCs, studentInfoObject.studentExemptedModules, studentInfoObject.studentWaivedModules, keyNames[i], keyNames[i]);

    if (!markedFoundationModulesAndMCs.markedFoundationModules[keyNames[i]] && moduleFulfilmentMappingEquivalent.length !== 0) {
      for (var j = 0; j < moduleFulfilmentMappingEquivalent.length; j++)  {
        // check if equivalent module exists in studentPlanner, exemptedModules, waivedModules
        markedFoundationModulesAndMCs = markExemptedWaivedExceptions(markedFoundationModulesAndMCs, studentInfoObject.studentExemptedModules, studentInfoObject.studentWaivedModules, moduleFulfilmentMappingEquivalent[j], keyNames[i]);
        markedFoundationModulesAndMCs = markExceptions(markedFoundationModulesAndMCs, studentInfoObject.studentSemesters, moduleFulfilmentMappingEquivalent[j], keyNames[i]);
        if (markedFoundationModulesAndMCs.markedFoundationModules[keyNames[i]])  {
          break;
        }
      }
    }
    // checks if all modules in foundation has been marked true
    if (markedFoundationModulesAndMCs.numberOfFoundationModulesMarkedTrue === keyNames.length) {
      markedFoundationModulesAndMCs.requiredMCs = markedFoundationModulesAndMCs.totalModuleMCs;
      markedFoundationModulesAndMCs.isFulfilled = true;
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

const markExceptions = function markExceptions(markedFoundationModulesAndMCs, studentSemesters, equivalentModule, originalModule)  {
  return markModules(markedFoundationModulesAndMCs, studentSemesters, equivalentModule, originalModule);
}

const markExemptedWaivedExceptions = function markExemptedWaivedExceptions(markedFoundationModulesAndMCs, exemptedModules, waivedModules, equivalentModule, originalModule)  {
  return markExemptedWaivedModules(markedFoundationModulesAndMCs, exemptedModules, waivedModules, equivalentModule, originalModule);
}
