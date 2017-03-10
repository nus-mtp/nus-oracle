import { getModuleFulfilment } from '../../../../../../../../database-controller/module-fulfilment/methods';
import { searchByModuleCode } from '../../../../../../../../database-controller/module/methods';

export const findIndustrialExperienceTrainingModules = function findIndustrialExperienceTrainingModules(academicCohort, studentSemesters, industrialExperienceModules, exemptedModules, waivedModules, requiredMCs)  {
  let markedIndustrialExperienceTrainingModulesAndMCs = {
    markedIndustrialExperienceTrainingModules: industrialExperienceModules,
    numberOfIndustrialExperienceTrainingModulesMarkedTrue: 0,
    totalModuleMCs: 0,
    moduleChecked: {},
    requiredMCs: requiredMCs
  };

  let moduleFulfilment = {};
  let moduleFulfilmentMappingEquivalent = [];
  const keyNames = Object.keys(industrialExperienceModules);

  // loop through markedIndustrialExperienceTrainingModules
    for (var i=0; i < keyNames.length; i++) {
    // check equivalent module fulfilment if available
    moduleFulfilment = getModuleFulfilment(keyNames[i]);

    moduleFulfilmentMappingEquivalent = moduleFulfilment.moduleMapping[academicCohort].moduleEquivalent;
    markedIndustrialExperienceTrainingModulesAndMCs = markExceptions(markedIndustrialExperienceTrainingModulesAndMCs, studentSemesters, keyNames[i], keyNames[i]);
    markedIndustrialExperienceTrainingModulesAndMCs = markExemptedWaivedExceptions(markedIndustrialExperienceTrainingModulesAndMCs, exemptedModules, waivedModules, keyNames[i], keyNames[i]);

    if (!markedIndustrialExperienceTrainingModulesAndMCs.markedIndustrialExperienceTrainingModules[keyNames[i]]
        && moduleFulfilmentMappingEquivalent.length !== 0) {
      for (var j = 0; j < moduleFulfilmentMappingEquivalent.length; j++)  {
        // check if equivalent module exists in studentPlanner, exemptedModules, waivedModules
        // checks if in exempted or waived modules
        markedIndustrialExperienceTrainingModulesAndMCs = markExemptedWaivedExceptions(markedIndustrialExperienceTrainingModulesAndMCs, exemptedModules, waivedModules, moduleFulfilmentMappingEquivalent[j], keyNames[i]);
        markedIndustrialExperienceTrainingModulesAndMCs = markExceptions(markedIndustrialExperienceTrainingModulesAndMCs, studentSemesters, moduleFulfilmentMappingEquivalent[j], keyNames[i]);
      }
    }
    if (markedIndustrialExperienceTrainingModulesAndMCs.numberOfIndustrialExperienceTrainingModulesMarkedTrue === keyNames.length) {
      markedIndustrialExperienceTrainingModulesAndMCs.requiredMCs = markedIndustrialExperienceTrainingModulesAndMCs.totalModuleMCs;
      break;
    }
  }
  // return { moduleCode: boolean } object
  return markedIndustrialExperienceTrainingModulesAndMCs;
}

const markModules = function markModules(markedIndustrialExperienceTrainingModulesAndMCs, studentSemesters, equivalentModule, originalModule) {
  for (var i = 0; i < studentSemesters.length; i++) {
    if (studentSemesters[i].moduleHashmap[equivalentModule]) {
      markedIndustrialExperienceTrainingModulesAndMCs.markedIndustrialExperienceTrainingModules[originalModule] = true;
      markedIndustrialExperienceTrainingModulesAndMCs.numberOfIndustrialExperienceTrainingModulesMarkedTrue += 1;
      if (!markedIndustrialExperienceTrainingModulesAndMCs.moduleChecked[equivalentModule])  {
        markedIndustrialExperienceTrainingModulesAndMCs.moduleChecked[equivalentModule] = true;
        markedIndustrialExperienceTrainingModulesAndMCs.totalModuleMCs += searchByModuleCode(equivalentModule).moduleMC;
      }
      break;
    }
  }

  return markedIndustrialExperienceTrainingModulesAndMCs;
}

const markExemptedWaivedModules = function markExemptedWaivedModules(markedIndustrialExperienceTrainingModulesAndMCs, exemptedModules, waivedModules, equivalentModule, originalModule) {
  if (Object.keys(exemptedModules).length !== 0)  {
    if (exemptedModules[equivalentModule])  {
      markedIndustrialExperienceTrainingModulesAndMCs.markedIndustrialExperienceTrainingModules[originalModule] = true;
      markedIndustrialExperienceTrainingModulesAndMCs.numberOfIndustrialExperienceTrainingModulesMarkedTrue += 1;
      if (!markedIndustrialExperienceTrainingModulesAndMCs.moduleChecked[equivalentModule])  {
        markedIndustrialExperienceTrainingModulesAndMCs.moduleChecked[equivalentModule] = true;
        markedIndustrialExperienceTrainingModulesAndMCs.totalModuleMCs += searchByModuleCode(equivalentModule).moduleMC;
      }
    }
  }
  if (Object.keys(waivedModules).length !== 0)  {
    if (waivedModules[equivalentModule]) {
      markedIndustrialExperienceTrainingModulesAndMCs.markedIndustrialExperienceTrainingModules[originalModule] = true;
      markedIndustrialExperienceTrainingModulesAndMCs.numberOfIndustrialExperienceTrainingModulesMarkedTrue += 1;
      if (!markedIndustrialExperienceTrainingModulesAndMCs.moduleChecked[equivalentModule])  {
        markedIndustrialExperienceTrainingModulesAndMCs.moduleChecked[equivalentModule] = true;
      }
    }
  }
  return markedIndustrialExperienceTrainingModulesAndMCs;
}

const markExceptions = function markExceptions(markedIndustrialExperienceTrainingModulesAndMCs, studentSemesters, equivalentModule, originalModule)  {
  markedIndustrialExperienceTrainingModulesAndMCs = markModules(markedIndustrialExperienceTrainingModulesAndMCs, studentSemesters, equivalentModule, originalModule);

  if ((!markedIndustrialExperienceTrainingModulesAndMCs.moduleChecked['CS3200'] &&
        markedIndustrialExperienceTrainingModulesAndMCs.moduleChecked['CS3202']) ||
      (!markedIndustrialExperienceTrainingModulesAndMCs.moduleChecked['CS3202'] &&
        markedIndustrialExperienceTrainingModulesAndMCs.moduleChecked['CS3200']))  {
    //markedIndustrialExperienceTrainingModulesAndMCs.markedIndustrialExperienceTrainingModules[originalModule] = false;
  }
  return markedIndustrialExperienceTrainingModulesAndMCs;
}

const markExemptedWaivedExceptions = function markExemptedWaivedExceptions(markedIndustrialExperienceTrainingModulesAndMCs, exemptedModules, waivedModules, equivalentModule, originalModule)  {
  markedIndustrialExperienceTrainingModulesAndMCs = markExemptedWaivedModules(markedIndustrialExperienceTrainingModulesAndMCs, exemptedModules, waivedModules, equivalentModule, originalModule);

  if ((!markedIndustrialExperienceTrainingModulesAndMCs.moduleChecked['CS3200'] &&
        markedIndustrialExperienceTrainingModulesAndMCs.moduleChecked['CS3202']) ||
      (!markedIndustrialExperienceTrainingModulesAndMCs.moduleChecked['CS3202'] &&
        markedIndustrialExperienceTrainingModulesAndMCs.moduleChecked['CS3200']))  {
    //markedIndustrialExperienceTrainingModulesAndMCs.markedIndustrialExperienceTrainingModules[originalModule] = false;
  }
  return markedIndustrialExperienceTrainingModulesAndMCs;
}
