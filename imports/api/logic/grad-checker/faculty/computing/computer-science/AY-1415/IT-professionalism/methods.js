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
 *
 * Currently assumes that all modules are 4 MCs and that it is not
 * possible to fulfil all conditions and transfer any leftover MCs to UEs
 */

export const findITProfessionalismModules = function findITProfessionalismModules(studentInfoObject, ITProfessionalismModules, requiredMCs)  {
  let markedITProfessionalismModulesAndMCs = {
    name: 'IT Professionalism',
    markedITProfessionalismModules: ITProfessionalismModules,
    numberOfITProfessionalismModulesMarkedTrue: 0,
    totalModuleMCs: 0,
    moduleChecked: studentInfoObject.moduleChecked,
    totalModuleMCs: 0,
    requiredMCs: requiredMCs,
    isFulfilled: false
  };

  let moduleFulfilment = {};
  let moduleFulfilmentMappingEquivalent = [];
  const keyNames = Object.keys(ITProfessionalismModules);

  // loop through markedITProfessionalismModules
    for (var i=0; i<keyNames.length; i++) {
    // check equivalent module fulfilment if available
    moduleFulfilment = getModuleFulfilment(keyNames[i]);
    if (Object.keys(moduleFulfilment).length <= 0)  {
      return {};
    }

    moduleFulfilmentMappingEquivalent = moduleFulfilment.moduleMapping[studentInfoObject.studentAcademicCohort].moduleEquivalent;
    markedITProfessionalismModulesAndMCs = markExceptions(markedITProfessionalismModulesAndMCs, studentInfoObject.studentSemesters, keyNames[i], keyNames[i]);
    markedITProfessionalismModulesAndMCs = markExemptedWaivedExceptions(markedITProfessionalismModulesAndMCs, studentInfoObject.studentExemptedModules, studentInfoObject.studentWaivedModules, keyNames[i], keyNames[i]);

    if (!markedITProfessionalismModulesAndMCs.markedITProfessionalismModules[keyNames[i]] && moduleFulfilmentMappingEquivalent.length !== 0) {
      for (var j = 0; j < moduleFulfilmentMappingEquivalent.length; j++)  {
        // check if equivalent module exists in studentPlanner, exemptedModules, waivedModules
        // checks if in exempted or waived modules
        markedITProfessionalismModulesAndMCs = markExemptedWaivedExceptions(markedITProfessionalismModulesAndMCs, studentInfoObject.studentExemptedModules, studentInfoObject.studentWaivedModules, moduleFulfilmentMappingEquivalent[j], keyNames[i]);
        markedITProfessionalismModulesAndMCs = markExceptions(markedITProfessionalismModulesAndMCs, studentInfoObject.studentSemesters, moduleFulfilmentMappingEquivalent[j], keyNames[i]);
        if (markedITProfessionalismModulesAndMCs.markedITProfessionalismModules[keyNames[i]])  {
          break;
        }
      }
    }
    if (markedITProfessionalismModulesAndMCs.numberOfITProfessionalismModulesMarkedTrue === keyNames.length) {
      //markedITProfessionalismModulesAndMCs.requiredMCs = markedITProfessionalismModulesAndMCs.totalModuleMCs;
      markedITProfessionalismModulesAndMCs.isFulfilled = true;
      break;
    }
  }
  // return { moduleCode: boolean } object
  return markedITProfessionalismModulesAndMCs;
}

const markModules = function markModules(markedITProfessionalismModulesAndMCs, studentSemesters, equivalentModule, originalModule) {
  for (var i = 0; i < studentSemesters.length; i++) {
    if (studentSemesters[i].moduleHashmap[equivalentModule]) {
      // mark markedITProfessionalismModulesAndMCs as true if module exists in studentPlanner/exemptedModules/waivedModules
      markedITProfessionalismModulesAndMCs.markedITProfessionalismModules[originalModule] = true;
      markedITProfessionalismModulesAndMCs.numberOfITProfessionalismModulesMarkedTrue += 1;
      if (!markedITProfessionalismModulesAndMCs.moduleChecked[equivalentModule])  {
        markedITProfessionalismModulesAndMCs.moduleChecked[equivalentModule] = true;
        markedITProfessionalismModulesAndMCs.totalModuleMCs += searchByModuleCode(equivalentModule).moduleMC;
      }
      break;
    }
  }

  return markedITProfessionalismModulesAndMCs;
}

const markExemptedWaivedModules = function markExemptedWaivedModules(markedITProfessionalismModulesAndMCs, exemptedModules, waivedModules, equivalentModule, originalModule) {
  if (Object.keys(exemptedModules).length !== 0)  {
    if (exemptedModules[equivalentModule])  {
      markedITProfessionalismModulesAndMCs.markedITProfessionalismModules[originalModule] = true;
      markedITProfessionalismModulesAndMCs.numberOfITProfessionalismModulesMarkedTrue += 1;
      if (!markedITProfessionalismModulesAndMCs.moduleChecked[equivalentModule])  {
        markedITProfessionalismModulesAndMCs.moduleChecked[equivalentModule] = true;
        markedITProfessionalismModulesAndMCs.totalModuleMCs += searchByModuleCode(equivalentModule).moduleMC;
      }
    }
  }
  if (Object.keys(waivedModules).length !== 0)  {
    if (waivedModules[equivalentModule]) {
      markedITProfessionalismModulesAndMCs.markedITProfessionalismModules[originalModule] = true;
      markedITProfessionalismModulesAndMCs.numberOfITProfessionalismModulesMarkedTrue += 1;
      if (!markedITProfessionalismModulesAndMCs.moduleChecked[equivalentModule])  {
        markedITProfessionalismModulesAndMCs.moduleChecked[equivalentModule] = true;
      }
    }
  }

  return markedITProfessionalismModulesAndMCs;
}

const markExceptions = function markExceptions(markedITProfessionalismModulesAndMCs, studentSemesters, equivalentModule, originalModule)  {
  return markModules(markedITProfessionalismModulesAndMCs, studentSemesters, equivalentModule, originalModule);
}

const markExemptedWaivedExceptions = function markExemptedWaivedExceptions(markedITProfessionalismModulesAndMCs, exemptedModules, waivedModules, equivalentModule, originalModule)  {
  return markExemptedWaivedModules(markedITProfessionalismModulesAndMCs, exemptedModules, waivedModules, equivalentModule, originalModule);
}
