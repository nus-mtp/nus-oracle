import { getModuleFulfilment } from '../../../../../../../../database-controller/module-fulfilment/methods';
import { searchByModuleCode } from '../../../../../../../../database-controller/module/methods';

export const findTeamProjectRequirementModules = function findTeamProjectRequirementModules(academicCohort, studentSemesters, teamProjectModules, exemptedModules, waivedModules, requiredMCs)  {
  let markedTeamProjectModulesAndMCs = {
    name: 'Computer Systems Team Project',
    markedTeamProjectModules: teamProjectModules,
    numberOfTeamProjectModulesMarkedTrue: 0,
    totalModuleMCs: 0,
    moduleChecked: {},
    requiredMCs: requiredMCs,
    isFulfilled: false
  };

  let moduleFulfilment = {};
  let moduleFulfilmentMappingEquivalent = [];
  const keyNames = Object.keys(teamProjectModules);

  // loop through markedTeamProjectModules
    for (var i=0; i<keyNames.length; i++) {
    // check equivalent module fulfilment if available
    moduleFulfilment = getModuleFulfilment(keyNames[i]);
    if (Object.keys(moduleFulfilment).length <= 0)  {
      return {};
    }

    moduleFulfilmentMappingEquivalent = moduleFulfilment.moduleMapping[academicCohort].moduleEquivalent;
    markedTeamProjectModulesAndMCs = markModules(markedTeamProjectModulesAndMCs, studentSemesters, keyNames[i], keyNames[i]);
    markedTeamProjectModulesAndMCs = markExemptedWaivedModules(markedTeamProjectModulesAndMCs, exemptedModules, waivedModules, keyNames[i], keyNames[i]);

    if (!markedTeamProjectModulesAndMCs.markedTeamProjectModules[keyNames[i]] && moduleFulfilmentMappingEquivalent.length !== 0) {
      for (var j = 0; j < moduleFulfilmentMappingEquivalent.length; j++)  {
        // check if equivalent module exists in studentPlanner, exemptedModules, waivedModules
        // checks if in exempted or waived modules
        markedTeamProjectModulesAndMCs = markExemptedWaivedExceptions(markedTeamProjectModulesAndMCs, exemptedModules, waivedModules, moduleFulfilmentMappingEquivalent[j], keyNames[i]);
        markedTeamProjectModulesAndMCs = markExceptions(markedTeamProjectModulesAndMCs, studentSemesters, moduleFulfilmentMappingEquivalent[j], keyNames[i]);
        if (markedTeamProjectModulesAndMCs.markedTeamProjectModules[keyNames[i]])  {
          break;
        }
      }
    }
    if (markedTeamProjectModulesAndMCs.numberOfTeamProjectModulesMarkedTrue === keyNames.length) {
      markedTeamProjectModulesAndMCs.requiredMCs = markedTeamProjectModulesAndMCs.totalModuleMCs;
      markedTeamProjectModulesAndMCs.isFulfilled = true;
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
      markedTeamProjectModulesAndMCs.markedTeamProjectModules[originalModule] = true;
      markedTeamProjectModulesAndMCs.numberOfTeamProjectModulesMarkedTrue += 1;
      if (!markedTeamProjectModulesAndMCs.moduleChecked[equivalentModule])  {
        markedTeamProjectModulesAndMCs.moduleChecked[equivalentModule] = true;
        markedTeamProjectModulesAndMCs.totalModuleMCs += searchByModuleCode(equivalentModule).moduleMC;
      }
      break;
    }
  }

  return markedTeamProjectModulesAndMCs;
}

const markExemptedWaivedModules = function markExemptedWaivedModules(markedTeamProjectModulesAndMCs, exemptedModules, waivedModules, equivalentModule, originalModule) {
  if (Object.keys(exemptedModules).length !== 0)  {
    if (exemptedModules[equivalentModule])  {
      markedTeamProjectModulesAndMCs.markedTeamProjectModules[originalModule] = true;
      markedTeamProjectModulesAndMCs.numberOfTeamProjectModulesMarkedTrue += 1;
      if (!markedTeamProjectModulesAndMCs.moduleChecked[equivalentModule])  {
        markedTeamProjectModulesAndMCs.moduleChecked[equivalentModule] = true;
        markedTeamProjectModulesAndMCs.totalModuleMCs += searchByModuleCode(equivalentModule).moduleMC;
      }
    }
  }
  if (Object.keys(waivedModules).length !== 0)  {
    if (waivedModules[equivalentModule]) {
      markedTeamProjectModulesAndMCs.markedTeamProjectModules[originalModule] = true;
      markedTeamProjectModulesAndMCs.numberOfTeamProjectModulesMarkedTrue += 1;
      if (!markedTeamProjectModulesAndMCs.moduleChecked[equivalentModule])  {
        markedTeamProjectModulesAndMCs.moduleChecked[equivalentModule] = true;
      }
    }
  }

  return markedTeamProjectModulesAndMCs;
}

const markExceptions = function markExceptions(markedTeamProjectModulesAndMCs, studentSemesters, equivalentModule, originalModule)  {
  switch(originalModule)  {
    case 'Project I':
    if (markedTeamProjectModulesAndMCs.moduleChecked['CS3201']) {
      markedTeamProjectModulesAndMCs = markModules(markedTeamProjectModulesAndMCs, studentSemesters, 'CS3202', originalModule);
    } else if (markedTeamProjectModulesAndMCs.moduleChecked['CS3216'])  {
      markedTeamProjectModulesAndMCs = markModules(markedTeamProjectModulesAndMCs, studentSemesters, 'CS3217', originalModule);
    } else if (markedTeamProjectModulesAndMCs.moduleChecked['CS3281'])  {
      markedTeamProjectModulesAndMCs = markModules(markedTeamProjectModulesAndMCs, studentSemesters, 'CS3282', originalModule);
    } else if (markedTeamProjectModulesAndMCs.moduleChecked['CS3283'])  {
      markedTeamProjectModulesAndMCs = markModules(markedTeamProjectModulesAndMCs, studentSemesters, 'CS3284', originalModule);
    } else {
      markedTeamProjectModulesAndMCs = markModules(markedTeamProjectModulesAndMCs, studentSemesters, equivalentModule, originalModule);
    }
    break;
    case 'Project II':
    if (markedTeamProjectModulesAndMCs.moduleChecked['CS3202']) {
      markedTeamProjectModulesAndMCs = markModules(markedTeamProjectModulesAndMCs, studentSemesters, 'CS3201', originalModule);
    } else if (markedTeamProjectModulesAndMCs.moduleChecked['CS3217'])  {
      markedTeamProjectModulesAndMCs = markModules(markedTeamProjectModulesAndMCs, studentSemesters, 'CS3216', originalModule);
    } else if (markedTeamProjectModulesAndMCs.moduleChecked['CS3282'])  {
      markedTeamProjectModulesAndMCs = markModules(markedTeamProjectModulesAndMCs, studentSemesters, 'CS3281', originalModule);
    } else if (markedTeamProjectModulesAndMCs.moduleChecked['CS3284'])  {
      markedTeamProjectModulesAndMCs = markModules(markedTeamProjectModulesAndMCs, studentSemesters, 'CS3283', originalModule);
    } else {
      markedTeamProjectModulesAndMCs = markModules(markedTeamProjectModulesAndMCs, studentSemesters, equivalentModule, originalModule);
    }
    break;
  }
  return markedTeamProjectModulesAndMCs;
}

//check if keyname is ScienceTwo, if so, check if ST2131 is in moduleChecked, if so, only allow ST2132 else allow all science module
const markExemptedWaivedExceptions = function markExemptedWaivedExceptions(markedTeamProjectModulesAndMCs, exemptedModules, waivedModules, equivalentModule, originalModule)  {
  switch(originalModule)  {
    case 'Project I':
    if (markedTeamProjectModulesAndMCs.moduleChecked['CS3201']) {
      markedTeamProjectModulesAndMCs = markExemptedWaivedModules(markedTeamProjectModulesAndMCs, exemptedModules, waivedModules, 'CS3202', originalModule);
    } else if (markedTeamProjectModulesAndMCs.moduleChecked['CS3216'])  {
      markedTeamProjectModulesAndMCs = markExemptedWaivedModules(markedTeamProjectModulesAndMCs, exemptedModules, waivedModules, 'CS3217', originalModule);
    } else if (markedTeamProjectModulesAndMCs.moduleChecked['CS3281'])  {
      markedTeamProjectModulesAndMCs = markExemptedWaivedModules(markedTeamProjectModulesAndMCs, exemptedModules, waivedModules,'CS3282', originalModule);
    } else if (markedTeamProjectModulesAndMCs.moduleChecked['CS3283'])  {
      markedTeamProjectModulesAndMCs = markExemptedWaivedModules(markedTeamProjectModulesAndMCs, exemptedModules, waivedModules, 'CS3284', originalModule);
    } else {
      markedTeamProjectModulesAndMCs = markExemptedWaivedModules(markedTeamProjectModulesAndMCs, exemptedModules, waivedModules, equivalentModule, originalModule);
    }
    break;
    case 'Project II':
    if (markedTeamProjectModulesAndMCs.moduleChecked['CS3202']) {
      markedTeamProjectModulesAndMCs = markExemptedWaivedModules(markedTeamProjectModulesAndMCs, exemptedModules, waivedModules, 'CS3201', originalModule);
    } else if (markedTeamProjectModulesAndMCs.moduleChecked['CS3217'])  {
      markedTeamProjectModulesAndMCs = markExemptedWaivedModules(markedTeamProjectModulesAndMCs, exemptedModules, waivedModules, 'CS3216', originalModule);
    } else if (markedTeamProjectModulesAndMCs.moduleChecked['CS3282'])  {
      markedTeamProjectModulesAndMCs = markExemptedWaivedModules(markedTeamProjectModulesAndMCs, exemptedModules, waivedModules, 'CS3281', originalModule);
    } else if (markedTeamProjectModulesAndMCs.moduleChecked['CS3284'])  {
      markedTeamProjectModulesAndMCs = markExemptedWaivedModules(markedTeamProjectModulesAndMCs, exemptedModules, waivedModules, 'CS3283', originalModule);
    } else {
      markedTeamProjectModulesAndMCs = markExemptedWaivedModules(markedTeamProjectModulesAndMCs, exemptedModules, waivedModules, equivalentModule, originalModule);
    }
    break;
  }
  return markedTeamProjectModulesAndMCs;
}
