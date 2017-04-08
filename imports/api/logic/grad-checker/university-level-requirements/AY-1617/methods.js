import { getModuleFulfilment } from '../../../../database-controller/module-fulfilment/methods';
import { searchByModuleCode } from '../../../../database-controller/module/methods';

/* Explanation
 * There are 5 functions in this file. To migrate to a new AY, unless there is a
 * huge change in calculation of graduation requirements, the only functions that
 * should be modified are markExceptions and markExemptedWaivedExceptions.
 *
 * The 2 methods above are where code for any new execptions to the calculation of
 * graduation requirement should be placed. If there are no exceptions, simply return
 * markModules and markExemptedWaivedModules
 */

export const findULRRequirementModules = function findULRRequirementModules(studentInfoObject, ULRModules, requiredMCs) {
  let markedULRModulesAndMCs = {
    name: 'University Level Requirement',
    markedULRModules: ULRModules,
    numberOfULRMarkedTrue: 0,
    totalModuleMCs: 0,
    moduleChecked: studentInfoObject.moduleChecked,
    requiredMCs: requiredMCs,
    isFulfilled: false
  };

  let moduleFulfilment = {};
  let moduleFulfilmentMappingEquivalent = [];
  const keyNames = Object.keys(ULRModules);

  // loop through markedULRModules
    for (var i=0; i<keyNames.length; i++) {
    // check equivalent module fulfilment if available
    moduleFulfilment = getModuleFulfilment(keyNames[i]);
    if (Object.keys(moduleFulfilment).length <= 0)  {
      return {};
    }

    moduleFulfilmentMappingEquivalent = moduleFulfilment.moduleMapping[studentInfoObject.studentAcademicCohort].moduleEquivalent;
    markedULRModulesAndMCs = markExceptions(markedULRModulesAndMCs, studentInfoObject.studentSemesters, keyNames[i], keyNames[i]);
    markedULRModulesAndMCs = markExemptedWaivedExceptions(markedULRModulesAndMCs, studentInfoObject.studentExemptedModules, studentInfoObject.studentWaivedModules, keyNames[i], keyNames[i]);

    if (!markedULRModulesAndMCs.markedULRModules[keyNames[i]]
        && moduleFulfilmentMappingEquivalent.length !== 0) {
      for (var j = 0; j < moduleFulfilmentMappingEquivalent.length; j++)  {
        // check if equivalent module exists in studentPlanner, exemptedModules, waivedModules
        // checks if in exempted or waived modules
        markedULRModulesAndMCs = markExemptedWaivedExceptions(markedULRModulesAndMCs, studentInfoObject.studentExemptedModules, studentInfoObject.studentWaivedModules, moduleFulfilmentMappingEquivalent[j], keyNames[i]);
        markedULRModulesAndMCs = markExceptions(markedULRModulesAndMCs, studentInfoObject.studentSemesters, moduleFulfilmentMappingEquivalent[j], keyNames[i]);
        if (markedULRModulesAndMCs.markedULRModules[keyNames[i]] ) {
          break;
        }
      }
    }
    if (markedULRModulesAndMCs.numberOfULRMarkedTrue === keyNames.length) {
      //markedULRModulesAndMCs.requiredMCs = markedULRModulesAndMCs.totalModuleMCs;
      markedULRModulesAndMCs.isFulfilled = true;
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
