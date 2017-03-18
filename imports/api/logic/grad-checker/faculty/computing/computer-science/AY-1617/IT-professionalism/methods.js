// import fulfilment methods here
import { getModuleFulfilment } from '../../../../../../../database-controller/module-fulfilment/methods';
import { searchByModuleCode } from '../../../../../../../database-controller/module/methods';

export const findITProfessionalismModules = function findITProfessionalismModules(academicCohort, studentSemesters, ITProfessionalismModules, exemptedModules, waivedModules, requiredMCs)  {
  let markedITProfessionalismModulesAndMCs = {
    name: 'IT Professionalism',
    markedITProfessionalismModules: ITProfessionalismModules,
    numberOfITProfessionalismModulesMarkedTrue: 0,
    totalModuleMCs: 0,
    moduleChecked: {},
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

    moduleFulfilmentMappingEquivalent = moduleFulfilment.moduleMapping[academicCohort].moduleEquivalent;
    markedITProfessionalismModulesAndMCs = markModules(markedITProfessionalismModulesAndMCs, studentSemesters, keyNames[i], keyNames[i]);
    markedITProfessionalismModulesAndMCs = markExemptedWaivedModules(markedITProfessionalismModulesAndMCs, exemptedModules, waivedModules, keyNames[i], keyNames[i]);

    if (!markedITProfessionalismModulesAndMCs.markedITProfessionalismModules[keyNames[i]] && moduleFulfilmentMappingEquivalent.length !== 0) {
      for (var j = 0; j < moduleFulfilmentMappingEquivalent.length; j++)  {
        // check if equivalent module exists in studentPlanner, exemptedModules, waivedModules
        // checks if in exempted or waived modules
        markedITProfessionalismModulesAndMCs = markExemptedWaivedModules(markedITProfessionalismModulesAndMCs, exemptedModules, waivedModules, moduleFulfilmentMappingEquivalent[j], keyNames[i]);
        markedITProfessionalismModulesAndMCs = markModules(markedITProfessionalismModulesAndMCs, studentSemesters, moduleFulfilmentMappingEquivalent[j], keyNames[i]);
        if (markedITProfessionalismModulesAndMCs.markedITProfessionalismModules[keyNames[i]])  {
          break;
        }
      }
    }
    if (markedITProfessionalismModulesAndMCs.numberOfITProfessionalismModulesMarkedTrue === keyNames.length) {
      markedITProfessionalismModulesAndMCs.requiredMCs = markedITProfessionalismModulesAndMCs.totalModuleMCs;
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
