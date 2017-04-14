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

export const findMathSciRequirementModules = function findMathSciRequirementModules(studentInfoObject, mathSciModules, requiredMCs) {
  let markedMathSciModulesAndMCs = {
    name: 'Mathematics and Sciences',
    markedMathSciModules: mathSciModules,
    numberOfMathSciModulesMarkedTrue: 0,
    totalModuleMCs: 0,
    moduleChecked: studentInfoObject.moduleChecked,
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
    moduleFulfilmentMappingEquivalent = moduleFulfilment.moduleMapping[studentInfoObject.studentAcademicCohort].moduleEquivalent;
    markedMathSciModulesAndMCs = markModules(markedMathSciModulesAndMCs, studentInfoObject.studentSemesters, keyNames[i], keyNames[i]);
    markedMathSciModulesAndMCs = markExemptedWaivedModules(markedMathSciModulesAndMCs, studentInfoObject.studentExemptedModules, studentInfoObject.studentWaivedModules, keyNames[i], keyNames[i]);

    if (!markedMathSciModulesAndMCs.markedMathSciModules[keyNames[i]] && moduleFulfilmentMappingEquivalent.length !== 0) {
      for (var j = 0; j < moduleFulfilmentMappingEquivalent.length; j++)  {
        // check if equivalent module exists in studentPlanner, exemptedModules, waivedModules
        // checks if in exempted or waived modules
        markedMathSciModulesAndMCs = markExemptedWaivedExceptions(markedMathSciModulesAndMCs, studentInfoObject.studentExemptedModules, studentInfoObject.studentWaivedModules, moduleFulfilmentMappingEquivalent[j], keyNames[i]);
        markedMathSciModulesAndMCs = markExceptions(markedMathSciModulesAndMCs, studentInfoObject.studentSemesters, moduleFulfilmentMappingEquivalent[j], keyNames[i]);
        if (markedMathSciModulesAndMCs.markedMathSciModules[keyNames[i]])  {
          break;
        }
      }
    }
    if (markedMathSciModulesAndMCs.numberOfMathSciModulesMarkedTrue === keyNames.length) {
      //markedMathSciModulesAndMCs.requiredMCs = markedMathSciModulesAndMCs.totalModuleMCs;
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

//check if keyname is ScienceTwo, if so, check if ST2131 is in planner, if so, only allow ST2132 else allow all science module
const markExceptions = function markExceptions(markedMathSciModulesAndMCs, studentSemesters, equivalentModule, originalModule)  {
  if (originalModule === 'Science II')  {
    let isST2131 = false;
    for (var i = 0; i < studentSemesters.length; i++) {
        if (studentSemesters[i].moduleHashmap['ST2131'])  {
          isST2131 = true;
      }
    }
    if (isST2131) {
      if (equivalentModule === 'ST2132')  {
        markedMathSciModulesAndMCs = markModules(markedMathSciModulesAndMCs, studentSemesters, 'ST2132', originalModule);
      }
    } else {
      markedMathSciModulesAndMCs = markModules(markedMathSciModulesAndMCs, studentSemesters, equivalentModule, originalModule);
    }
  } else {
    markedMathSciModulesAndMCs = markModules(markedMathSciModulesAndMCs, studentSemesters, equivalentModule, originalModule);
  }

  return markedMathSciModulesAndMCs;
}

//check if keyname is ScienceTwo, if so, check if ST2131 is in exemptedModules/waivedModules, if so, only allow ST2132 else allow all science module
const markExemptedWaivedExceptions = function markExemptedWaivedExceptions(markedMathSciModulesAndMCs, exemptedModules, waivedModules, equivalentModule, originalModule)  {
  if (originalModule === 'Science II')  {
    let isST2131 = false;
    if (exemptedModules['ST2131'] || waivedModules['ST2131'])  {
        isST2131 = true;
    }
    if (isST2131) {
      if (equivalentModule === 'ST2132')  {
        markedMathSciModulesAndMCs = markExemptedWaivedModules(markedMathSciModulesAndMCs, exemptedModules, waivedModules, 'ST2132', originalModule);
      }
    } else {
      markedMathSciModulesAndMCs = markExemptedWaivedModules(markedMathSciModulesAndMCs, exemptedModules, waivedModules, equivalentModule, originalModule);
    }
  } else {
    markedMathSciModulesAndMCs = markExemptedWaivedModules(markedMathSciModulesAndMCs, exemptedModules, waivedModules, equivalentModule, originalModule);
  }

  return markedMathSciModulesAndMCs;
}
