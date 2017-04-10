import { getModuleFulfilment } from '../../../../../../../../database-controller/module-fulfilment/methods';
import { searchByModuleCode } from '../../../../../../../../database-controller/module/methods';

/* Explanation for new AY creation
 * There are 5 functions in this file. To migrate to a new AY, unless there is a
 * huge change in calculation of graduation requirements, the only functions that
 * should be modified are markExceptions and markExemptedWaivedExceptions.
 *
 * The 2 methods above are where code for any new execptions to the calculation of
 * graduation requirement should be placed. If there are no exceptions, simply return
 * markModules and markExemptedWaivedModules
 */

export const findIndustrialExperienceTrainingModules = function findIndustrialExperienceTrainingModules(studentInfoObject, industrialExperienceModules, requiredMCs)  {
  let markedIndustrialExperienceTrainingModulesAndMCs = {
    name: 'Industrial Experience Training',
    markedIndustrialExperienceTrainingModules: industrialExperienceModules,
    numberOfIndustrialExperienceTrainingModulesMarkedTrue: 0,
    totalModuleMCs: 0,
    moduleChecked: studentInfoObject.moduleChecked,
    requiredMCs: requiredMCs,
    isFulfilled: false
  };

  let moduleFulfilment = {};
  let moduleFulfilmentMappingEquivalent = [];
  const keyNames = Object.keys(industrialExperienceModules);

  // loop through markedIndustrialExperienceTrainingModules
    for (var i=0; i < keyNames.length; i++) {
    // check equivalent module fulfilment if available
    moduleFulfilment = getModuleFulfilment(keyNames[i]);
    if (Object.keys(moduleFulfilment).length <= 0)  {
      return {};
    }

    moduleFulfilmentMappingEquivalent = moduleFulfilment.moduleMapping[studentInfoObject.studentAcademicCohort].moduleEquivalent;
    markedIndustrialExperienceTrainingModulesAndMCs = markExceptions(markedIndustrialExperienceTrainingModulesAndMCs, studentInfoObject.studentSemesters, keyNames[i], keyNames[i]);
    markedIndustrialExperienceTrainingModulesAndMCs = markExemptedWaivedExceptions(markedIndustrialExperienceTrainingModulesAndMCs, studentInfoObject.studentExemptedModules, studentInfoObject.studentWaivedModules, keyNames[i], keyNames[i]);

    if (!markedIndustrialExperienceTrainingModulesAndMCs.markedIndustrialExperienceTrainingModules[keyNames[i]]
        && moduleFulfilmentMappingEquivalent.length !== 0) {
      for (var j = 0; j < moduleFulfilmentMappingEquivalent.length; j++)  {
        // check if equivalent module exists in studentPlanner, exemptedModules, waivedModules
        // checks if in exempted or waived modules
        markedIndustrialExperienceTrainingModulesAndMCs = markExemptedWaivedExceptions(markedIndustrialExperienceTrainingModulesAndMCs, studentInfoObject.studentExemptedModules, studentInfoObject.studentWaivedModules, moduleFulfilmentMappingEquivalent[j], keyNames[i]);
        markedIndustrialExperienceTrainingModulesAndMCs = markExceptions(markedIndustrialExperienceTrainingModulesAndMCs, studentInfoObject.studentSemesters, moduleFulfilmentMappingEquivalent[j], keyNames[i]);
        if (markedIndustrialExperienceTrainingModulesAndMCs.markedIndustrialExperienceTrainingModules[keyNames[i]])  {
          break;
        }
      }
    }
    if (markedIndustrialExperienceTrainingModulesAndMCs.numberOfIndustrialExperienceTrainingModulesMarkedTrue === keyNames.length) {
      //markedIndustrialExperienceTrainingModulesAndMCs.requiredMCs = markedIndustrialExperienceTrainingModulesAndMCs.totalModuleMCs;
      markedIndustrialExperienceTrainingModulesAndMCs.isFulfilled = true;
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

  if (markedIndustrialExperienceTrainingModulesAndMCs.moduleChecked['CP3200'])  {
    if (!markedIndustrialExperienceTrainingModulesAndMCs.moduleChecked['CP3202']) {
      markedIndustrialExperienceTrainingModulesAndMCs.markedIndustrialExperienceTrainingModules[originalModule] = false;
      markedIndustrialExperienceTrainingModulesAndMCs.numberOfIndustrialExperienceTrainingModulesMarkedTrue = 0;
    }
  } else if (markedIndustrialExperienceTrainingModulesAndMCs.moduleChecked['CP3202']) {
    if (!markedIndustrialExperienceTrainingModulesAndMCs.moduleChecked['CP3200']) {
      markedIndustrialExperienceTrainingModulesAndMCs.markedIndustrialExperienceTrainingModules[originalModule] = false;
      markedIndustrialExperienceTrainingModulesAndMCs.numberOfIndustrialExperienceTrainingModulesMarkedTrue = 0;
    }
  }

  return markedIndustrialExperienceTrainingModulesAndMCs;
}

const markExemptedWaivedExceptions = function markExemptedWaivedExceptions(markedIndustrialExperienceTrainingModulesAndMCs, exemptedModules, waivedModules, equivalentModule, originalModule)  {
  markedIndustrialExperienceTrainingModulesAndMCs = markExemptedWaivedModules(markedIndustrialExperienceTrainingModulesAndMCs, exemptedModules, waivedModules, equivalentModule, originalModule);

  if (markedIndustrialExperienceTrainingModulesAndMCs.moduleChecked['CP3200'])  {
    if (!markedIndustrialExperienceTrainingModulesAndMCs.moduleChecked['CP3202']) {
      markedIndustrialExperienceTrainingModulesAndMCs.markedIndustrialExperienceTrainingModules[originalModule] = false;
      markedIndustrialExperienceTrainingModulesAndMCs.numberOfIndustrialExperienceTrainingModulesMarkedTrue = 0;
    }
  } else if (markedIndustrialExperienceTrainingModulesAndMCs.moduleChecked['CP3202']) {
    if (!markedIndustrialExperienceTrainingModulesAndMCs.moduleChecked['CP3200']) {
      markedIndustrialExperienceTrainingModulesAndMCs.markedIndustrialExperienceTrainingModules[originalModule] = false;
      markedIndustrialExperienceTrainingModulesAndMCs.numberOfIndustrialExperienceTrainingModulesMarkedTrue = 0;
    }
  }
  return markedIndustrialExperienceTrainingModulesAndMCs;
}
