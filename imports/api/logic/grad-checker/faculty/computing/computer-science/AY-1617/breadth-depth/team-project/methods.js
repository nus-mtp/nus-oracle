
export const findTeamProjectRequirementModules = function findTeamProjectRequirementModules(academicCohort, studentPlanner, teamProjectModules, exemptedModules, waivedModules, requiredMCs)  {
  let markedTeamProjectModulesAndMCs = {
    markedTeamProjectModules: teamProjectModules,
    numberOfTeamProjectModulesMarkedTrue: 0,
    totalModuleMCs: 0,
    moduleChecked: {},
    requiredMCs: requiredMCs
  };

  let moduleFulfilment = {};
  let moduleFulfilmentMappingEquivalent = [];
  const keyNames = Object.keys(mathSciModules);

  // loop through markedMathSciModules
    for (var i=0; i<keyNames.length; i++) {
    // check equivalent module fulfilment if available
    moduleFulfilment = getModuleFulfilment(keyNames[i]);

    moduleFulfilmentMappingEquivalent = moduleFulfilment.moduleMapping[academicCohort].moduleEquivalent;
    markedTeamProjectModulesAndMCs = markModules(markedTeamProjectModulesAndMCs, studentSemesters, keyNames[i], keyNames[i]);
    markedTeamProjectModulesAndMCs = markExemptedWaivedModules(markedTeamProjectModulesAndMCs, exemptedModules, waivedModules, keyNames[i], keyNames[i]);

    if (!markedTeamProjectModulesAndMCs.markedMathSciModules[keyNames[i]] && moduleFulfilmentMappingEquivalent.length !== 0) {
      for (var j = 0; j < moduleFulfilmentMappingEquivalent.length; j++)  {
        // check if equivalent module exists in studentPlanner, exemptedModules, waivedModules
        // checks if in exempted or waived modules
        markedTeamProjectModulesAndMCs = markExemptedWaivedExceptions(markedTeamProjectModulesAndMCs, exemptedModules, waivedModules, moduleFulfilmentMappingEquivalent[j], keyNames[i]);
        // early termination here
        if (markedTeamProjectModulesAndMCs.markedMathSciModules[keyNames[i]]) {
          break;
        }
        markedTeamProjectModulesAndMCs = markExceptions(markedTeamProjectModulesAndMCs, studentSemesters, moduleFulfilmentMappingEquivalent[j], keyNames[i]);
      }
    }
    if (markedTeamProjectModulesAndMCs.numberOfMathSciModulesMarkedTrue === keyNames.length) {
      markedTeamProjectModulesAndMCs.requiredMCs = markedTeamProjectModulesAndMCs.totalModuleMCs;
      break;
    }
  }
  // return { moduleCode: boolean } object
  return markedTeamProjectModulesAndMCs;
}

const markModules = function markModules(markedTeamProjectModulesAndMCs, studentSemesters, equivalentModule, originalModule) {
  for (var i = 0; i < studentSemesters.length; i++) {
    if (studentSemesters[i].moduleHashmap[equivalentModule]) {
      // mark markedFoundationModules as true if module exists in studentPlanner/exemptedModules/waivedModules
      markedTeamProjectModulesAndMCs.markedMathSciModules[originalModule] = true;
      markedTeamProjectModulesAndMCs.numberOfMathSciModulesMarkedTrue += 1;
      if (!markedTeamProjectModulesAndMCs.moduleChecked[equivalentModule])  {
        markedTeamProjectModulesAndMCs.moduleChecked[equivalentModule] = true;
        markedTeamProjectModulesAndMCs.totalModuleMCs += searchByModuleCode(equivalentModule).moduleMC;
      }
      break;
    }
  }

  return markedTeamProjectModulesAndMCs;
}
