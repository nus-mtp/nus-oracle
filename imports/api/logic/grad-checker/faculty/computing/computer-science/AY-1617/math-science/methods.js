import { getModuleFulfilment } from '../../../../../../../database-controller/module-fulfilment/methods';
import { searchByModuleCode } from '../../../../../../../database-controller/module/methods';

export const findMathSciRequirementModules = function findMathSciRequirementModules(academicCohort, studentSemesters, mathSciModules, exemptedModules, waivedModules, requiredMCs) {
  let markedMathSciModulesAndMCs = {
    name: 'Mathematics and Sciences',
    markedMathSciModules: mathSciModules,
    numberOfMathSciModulesMarkedTrue: 0,
    totalModuleMCs: 0,
    moduleChecked: {},
    requiredMCs: requiredMCs,
    isFulfilled: false
  };

  let moduleFulfilment = {};
  let moduleFulfilmentMappingEquivalent = [];
  const keyNames = Object.keys(mathSciModules);

  // loop through markedMathSciModules
    for (var i=0; i<keyNames.length; i++) {
    // check equivalent module fulfilment if available
    moduleFulfilment = getModuleFulfilment(keyNames[i]);
    if (Object.keys(moduleFulfilment).length <= 0)  {
      return {};
    }
    moduleFulfilmentMappingEquivalent = moduleFulfilment.moduleMapping[academicCohort].moduleEquivalent;
    markedMathSciModulesAndMCs = markModules(markedMathSciModulesAndMCs, studentSemesters, keyNames[i], keyNames[i]);
    markedMathSciModulesAndMCs = markExemptedWaivedModules(markedMathSciModulesAndMCs, exemptedModules, waivedModules, keyNames[i], keyNames[i]);

    if (!markedMathSciModulesAndMCs.markedMathSciModules[keyNames[i]] && moduleFulfilmentMappingEquivalent.length !== 0) {
      for (var j = 0; j < moduleFulfilmentMappingEquivalent.length; j++)  {
        // check if equivalent module exists in studentPlanner, exemptedModules, waivedModules
        // checks if in exempted or waived modules
        markedMathSciModulesAndMCs = markExemptedWaivedExceptions(markedMathSciModulesAndMCs, exemptedModules, waivedModules, moduleFulfilmentMappingEquivalent[j], keyNames[i]);
        markedMathSciModulesAndMCs = markExceptions(markedMathSciModulesAndMCs, studentSemesters, moduleFulfilmentMappingEquivalent[j], keyNames[i]);
        if (markedMathSciModulesAndMCs.markedMathSciModules[keyNames[i]])  {
          break;
        }
      }
    }
    if (markedMathSciModulesAndMCs.numberOfMathSciModulesMarkedTrue === keyNames.length) {
      markedMathSciModulesAndMCs.requiredMCs = markedMathSciModulesAndMCs.totalModuleMCs;
      markedMathSciModulesAndMCs.isFulfilled = true;
      break;
    }
  }
  // return { moduleCode: boolean } object
  return markedMathSciModulesAndMCs;
}

const markModules = function markModules(markedMathSciModulesAndMCs, studentSemesters, equivalentModule, originalModule) {
  for (var i = 0; i < studentSemesters.length; i++) {
    if (studentSemesters[i].moduleHashmap[equivalentModule] &&
        !markedMathSciModulesAndMCs.moduleChecked[equivalentModule]) {
      markedMathSciModulesAndMCs.markedMathSciModules[originalModule] = true;
      markedMathSciModulesAndMCs.numberOfMathSciModulesMarkedTrue += 1;
      markedMathSciModulesAndMCs.moduleChecked[equivalentModule] = true;
      markedMathSciModulesAndMCs.totalModuleMCs += searchByModuleCode(equivalentModule).moduleMC;
      break;
    }
  }


  return markedMathSciModulesAndMCs;
}

const markExemptedWaivedModules = function markExemptedWaivedModules(markedMathSciModulesAndMCs, exemptedModules, waivedModules, equivalentModule, originalModule) {
  if (Object.keys(exemptedModules).length !== 0)  {
    if (exemptedModules[equivalentModule] &&
        !markedMathSciModulesAndMCs.moduleChecked[equivalentModule])  {
      markedMathSciModulesAndMCs.markedMathSciModules[originalModule] = true;
      markedMathSciModulesAndMCs.numberOfMathSciModulesMarkedTrue += 1;
      markedMathSciModulesAndMCs.moduleChecked[equivalentModule] = true;
      markedMathSciModulesAndMCs.totalModuleMCs += searchByModuleCode(equivalentModule).moduleMC;
    }
  }
  if (Object.keys(waivedModules).length !== 0)  {
    if (waivedModules[equivalentModule] &&
        !markedMathSciModulesAndMCs.moduleChecked[equivalentModule]) {
      markedMathSciModulesAndMCs.markedMathSciModules[originalModule] = true;
      markedMathSciModulesAndMCs.numberOfMathSciModulesMarkedTrue += 1;
      markedMathSciModulesAndMCs.moduleChecked[equivalentModule] = true;
    }
  }

  return markedMathSciModulesAndMCs;
}

//check if keyname is ScienceTwo, if so, check if ST2131 is in moduleChecked, if so, only allow ST2132 else allow all science module
const markExceptions = function markExceptions(markedMathSciModulesAndMCs, studentSemesters, equivalentModule, originalModule)  {
  if (originalModule === 'Science Two' &&
      markedMathSciModulesAndMCs.moduleChecked['ST2131'] )  {
    markedMathSciModulesAndMCs = markModules(markedMathSciModulesAndMCs, studentSemesters, 'ST2132', originalModule);
  } else {
    markedMathSciModulesAndMCs = markModules(markedMathSciModulesAndMCs, studentSemesters, equivalentModule, originalModule);
  }

  return markedMathSciModulesAndMCs;
}

//check if keyname is ScienceTwo, if so, check if ST2131 is in moduleChecked, if so, only allow ST2132 else allow all science module
const markExemptedWaivedExceptions = function markExemptedWaivedExceptions(markedMathSciModulesAndMCs, exemptedModules, waivedModules, equivalentModule, originalModule)  {
  if (originalModule === 'Science Two' &&
      markedMathSciModulesAndMCs.moduleChecked['ST2131'])  {
    markedMathSciModulesAndMCs = markExemptedWaivedModules(markedMathSciModulesAndMCs, exemptedModules, waivedModules, 'ST2132', originalModule);
  } else {
    markedMathSciModulesAndMCs = markExemptedWaivedModules(markedMathSciModulesAndMCs, exemptedModules, waivedModules, equivalentModule, originalModule);
  }

  return markedMathSciModulesAndMCs;
}
