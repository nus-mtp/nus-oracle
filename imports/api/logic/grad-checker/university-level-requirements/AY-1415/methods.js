import { getModuleFulfilment } from '../../../../database-controller/module-fulfilment/methods';
import { searchByModuleCode } from '../../../../database-controller/module/methods';
import { getFirstNChars } from '../../../../../utils/util'

/* Explanation
 * There are 5 functions in this file. To migrate to a new AY, unless there is a
 * huge change in calculation of graduation requirements, the only functions that
 * should be modified are markExceptions and markExemptedWaivedExceptions.
 *
 * The 2 methods above are where code for any new execptions to the calculation of
 * graduation requirement should be placed. If there are no exceptions, simply return
 * markModules and markExemptedWaivedModules
 *
 * IMPORTANT to note: ULR check for breadth is coded to work only for CS students
 *                    To expand it to all students, makes sure exception check for breadth be updated for other faculties
 */

export const findULRRequirementModules = function findULRRequirementModules(
  academicCohort, studentSemesters, ULRModules, exemptedModules,
  waivedModules, moduleChecked, requiredMCs) {

  let markedULRModulesAndMCs = {
    name: 'University Level Requirement',
    markedULRModules: ULRModules,
    numberOfULRMarkedTrue: 0,
    totalModuleMCs: 0,
    moduleChecked: moduleChecked,
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

    moduleFulfilmentMappingEquivalent = moduleFulfilment.moduleMapping[academicCohort].moduleEquivalent;
    markedULRModulesAndMCs = markExceptions(markedULRModulesAndMCs, studentSemesters, keyNames[i], keyNames[i]);
    markedULRModulesAndMCs = markExemptedWaivedExceptions(markedULRModulesAndMCs, exemptedModules, waivedModules, keyNames[i], keyNames[i]);


    if (!markedULRModulesAndMCs.markedULRModules[keyNames[i]]
        && moduleFulfilmentMappingEquivalent.length !== 0) {
      for (var j = 0; j < moduleFulfilmentMappingEquivalent.length; j++)  {
        // check if equivalent module exists in studentPlanner, exemptedModules, waivedModules
        // checks if in exempted or waived modules
        markedULRModulesAndMCs = markExemptedWaivedExceptions(markedULRModulesAndMCs, exemptedModules, waivedModules, moduleFulfilmentMappingEquivalent[j], keyNames[i]);
        markedULRModulesAndMCs = markExceptions(markedULRModulesAndMCs, studentSemesters, moduleFulfilmentMappingEquivalent[j], keyNames[i]);
        if (markedULRModulesAndMCs.markedULRModules[keyNames[i]] ) {
          break;
        }
      }
    }
    if (markedULRModulesAndMCs.numberOfULRMarkedTrue === keyNames.length) {
      markedULRModulesAndMCs.requiredMCs = markedULRModulesAndMCs.totalModuleMCs;
      markedULRModulesAndMCs.isFulfilled = true;
      break;
    }
  }
  // return { moduleCode: boolean } object

  return markedULRModulesAndMCs;
}

const markModules = function markModules(markedULRModulesAndMCs, studentSemesters, equivalentModule, originalModule) {
  for (var i = 0; i < studentSemesters.length; i++) {
    if (studentSemesters[i].moduleHashmap[equivalentModule] &&
        !markedULRModulesAndMCs.moduleChecked[equivalentModule]) {
      markedULRModulesAndMCs.markedULRModules[originalModule] = true;
      markedULRModulesAndMCs.numberOfULRMarkedTrue += 1;
      markedULRModulesAndMCs.moduleChecked[equivalentModule] = true;
      markedULRModulesAndMCs.totalModuleMCs += searchByModuleCode(equivalentModule).moduleMC;
      break;
    }
  }

  return markedULRModulesAndMCs;
}

const markExemptedWaivedModules = function markExemptedWaivedModules(markedULRModulesAndMCs, exemptedModules, waivedModules, equivalentModule, originalModule) {
  if (Object.keys(exemptedModules).length !== 0)  {
    if (exemptedModules[equivalentModule] &&
        !markedULRModulesAndMCs.moduleChecked[equivalentModule])  {
      markedULRModulesAndMCs.markedULRModules[originalModule] = true;
      markedULRModulesAndMCs.numberOfULRMarkedTrue += 1;
      markedULRModulesAndMCs.moduleChecked[equivalentModule] = true;
      markedULRModulesAndMCs.totalModuleMCs += searchByModuleCode(equivalentModule).moduleMC;
    }
  }
  if (Object.keys(waivedModules).length !== 0)  {
    if (waivedModules[equivalentModule] &&
        !markedULRModulesAndMCs.moduleChecked[equivalentModule]) {
      markedULRModulesAndMCs.markedULRModules[originalModule] = true;
      markedULRModulesAndMCs.numberOfULRMarkedTrue += 1;
      markedULRModulesAndMCs.moduleChecked[equivalentModule] = true;
    }
  }
  return markedULRModulesAndMCs;
}

const markExceptions = function markExceptions(markedULRModulesAndMCs, studentSemesters, equivalentModule, originalModule)  {
  // parse equivalent module here for checking breadth
  if (originalModule === "Breadth One" || originalModule === "Breadth Two") {
    for (var i = 0; i < studentSemesters.length; i++) {
      if (markedULRModulesAndMCs.markedULRModules[originalModule])  {
        break;
      }
      const modules = Object.keys(studentSemesters[i].moduleHashmap);
      for (var j=0; j<modules.length; j++)  {
        let parsedPrefixTwo = getFirstNChars(modules[j], 2);
        let parsedPrefixThree = getFirstNChars(modules[j], 3);
        if (parsedPrefixTwo === "CP" || parsedPrefixTwo === "BT" ||
            parsedPrefixTwo === "CS" || parsedPrefixTwo === "IS" ||
            parsedPrefixTwo === "IT" || parsedPrefixTwo === "SS")  {
              continue;
        } else {
          if (!markedULRModulesAndMCs.moduleChecked[modules[j]]) {
              markedULRModulesAndMCs.markedULRModules[originalModule] = true;
              markedULRModulesAndMCs.numberOfULRMarkedTrue += 1;
              markedULRModulesAndMCs.moduleChecked[modules[j]] = true;
              markedULRModulesAndMCs.totalModuleMCs += searchByModuleCode(modules[j]).moduleMC;
              break;
            }
          }
        }
      }
      return markedULRModulesAndMCs;
  }
  return markModules(markedULRModulesAndMCs, studentSemesters, equivalentModule, originalModule);
}

const markExemptedWaivedExceptions = function markExemptedWaivedExceptions(markedULRModulesAndMCs, exemptedModules, waivedModules, equivalentModule, originalModule)  {
  if (originalModule == "Breadth One" || originalModule == "Breadth Two") {
    for (var i = 0; i < exemptedModules.length; i++) {
      if (markedULRModulesAndMCs.markedULRModules[originalModule])  {
        break;
      }
      let modules = Object.keys(exemptedModules);
      for (var j=0; j<modules.length; j++)  {
        let parsedPrefix = getFirstNChars(modules[j], 2);
        if (parsedPrefix === "CP" || parsedPrefix === "BT" ||
            parsedPrefix === "CS" || parsedPrefix === "IS" ||
            parsedPrefix === "IT" || parsedPrefixTwo === "SS")  {
            continue;
        } else {
          if (!markedULRModulesAndMCs.moduleChecked[modules[j]]) {
              markedULRModulesAndMCs.markedULRModules[originalModule] = true;
              markedULRModulesAndMCs.numberOfULRMarkedTrue += 1;
              markedULRModulesAndMCs.moduleChecked[modules[j]] = true;
              markedULRModulesAndMCs.totalModuleMCs += searchByModuleCode(modules[j]).moduleMC;
              break;
            }
          }
        }
      }
      for (var i = 0; i < waivedModules.length; i++) {
        if (markedULRModulesAndMCs.markedULRModules[originalModule])  {
          break;
        }
        let modules = Object.keys(waivedModules);
        for (var j=0; j<modules.length; j++)  {
          let parsedPrefix = getFirstNChars(modules[j], 2);
          if (parsedPrefix === "CP" || parsedPrefix === "BT" ||
              parsedPrefix === "CS" || parsedPrefix === "IS" ||
              parsedPrefix === "IT" || parsedPrefixTwo === "SS")  {
              continue;
          } else {
            if (!markedULRModulesAndMCs.moduleChecked[modules[j]]) {
                markedULRModulesAndMCs.markedULRModules[originalModule] = true;
                markedULRModulesAndMCs.numberOfULRMarkedTrue += 1;
                markedULRModulesAndMCs.moduleChecked[modules[j]] = true;
                break;
              }
            }
          }
        }
        return markedULRModulesAndMCs;
  }
  return markExemptedWaivedModules(markedULRModulesAndMCs, exemptedModules, waivedModules, equivalentModule, originalModule);
}
