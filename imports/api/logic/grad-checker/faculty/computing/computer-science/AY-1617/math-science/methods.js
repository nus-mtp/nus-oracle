// import fulfilment methods here

export const findMathSciRequirementModules = function findMathSciRequirementModules(academicCohort, studentSemesters, mathSciModules, exemptedModules, waivedModules) {
  let markedMathSciModules = mathSciModules;
  let markedMathSciModulesModulesAndMCs = {
    mathSciModulesModules: mathSciModules,
    totalModuleMCs: 0
  };

  let moduleFulfilment = {};
  let moduleFulfilmentMappingEquivalent = [];
  const keyNames = Object.keys(mathSciModules);

  // loop through markedITProfessionalismModules
    for (var i=0; i<keyNames.length; i++) {
    // check equivalent module fulfilment if available
    moduleFulfilment = getModuleFulfilment(keyNames[i]);

    moduleFulfilmentMappingEquivalent = moduleFulfilment.moduleMapping[academicCohort].moduleEquivalent;
    markedMathSciModulesModulesAndMCs = markModules(markedMathSciModulesModulesAndMCs, studentSemesters, keyNames[i], keyNames[i]);
    markedMathSciModulesModulesAndMCs = markExemptedWaivedModules(markedMathSciModulesModulesAndMCs, exemptedModules, waivedModules, keyNames[i], keyNames[i]);

    if (!markedMathSciModulesModulesAndMCs.mathSciModulesModules[keyNames[i]] && moduleFulfilmentMappingEquivalent.length !== 0) {
      for (var j = 0; j < moduleFulfilmentMappingEquivalent.length; j++)  {
        // check if equivalent module exists in studentPlanner, exemptedModules, waivedModules
        // checks if in exempted or waived modules
        markedMathSciModulesModulesAndMCs = markExemptedWaivedModules(markedMathSciModulesModulesAndMCs, exemptedModules, waivedModules, moduleFulfilmentMappingEquivalent[j], keyNames[i]);
        markedMathSciModulesModulesAndMCs = markModules(markedMathSciModulesModulesAndMCs, studentSemesters, moduleFulfilmentMappingEquivalent[j], keyNames[i]);
        break;
      }
    }

  }
  // return { moduleCode: boolean } object
  return markedMathSciModulesModulesAndMCs;
}

const markModules = function markModules(markedMathSciModulesModulesAndMCs, studentSemesters, equivalentModule, originalModule) {
  for (var i = 0; i < studentSemesters.length; i++) {
    if (studentSemesters[i].moduleHashmap[equivalentModule]) {
      // mark markedFoundationModules as true if module exists in studentPlanner/exemptedModules/waivedModules
      markedMathSciModulesModulesAndMCs.mathSciModulesModules[originalModule] = true;
      markedMathSciModulesModulesAndMCs.totalModuleMCs += searchByModuleCode(originalModule).moduleMC;
      break;
    }
  }

  return markedMathSciModulesModulesAndMCs;
}

const markExemptedWaivedModules = function markExemptedWaivedModules(markedMathSciModulesModulesAndMCs, exemptedModules, waivedModules, equivalentModule, originalModule) {
  if (Object.keys(exemptedModules).length !== 0)  {
    if (exemptedModules[equivalentModule])  {
      markedMathSciModulesModulesAndMCs.mathSciModulesModules[originalModule] = true;
      markedMathSciModulesModulesAndMCs.totalModuleMCs += searchByModuleCode(originalModule).moduleMC;
    }
  }
  if (Object.keys(waivedModules).length !== 0)  {
    if (waivedModules[equivalentModule]) {
      markedMathSciModulesModulesAndMCs.mathSciModulesModules[originalModule] = true;
    }
  }
  return markedMathSciModulesModulesAndMCs;
}
