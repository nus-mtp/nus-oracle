import { searchByModuleCode } from '../../../../../../../database-controller/module/methods';

export const findUnrestrictedElectivesRequirementModules = function findUnrestrictedElectivesRequirementModules(graduationRequirements, graduationMCs, studentInfoObject) {
  let totalRequiredMCs = 0
  let moduleRequirementTitle = Object.keys(graduationRequirements);
  for (var i=0; i<moduleRequirementTitle.length-1; i++) {
    totalRequiredMCs += graduationRequirements[moduleRequirementTitle[i]].requiredMCs;
  }

  // get total required MC to graduate
  let electiveMCs = 0;

  // loop through the planner, find total MCs in planner
  for (var i=0; i<studentInfoObject.studentSemesters.length; i++) {
    let modules = Object.keys(studentInfoObject.studentSemesters[i].moduleHashmap);
    for (var j=0; j<modules.length; j++)  {
      if (!studentInfoObject.moduleChecked[modules[j]]) {
        electiveMCs += searchByModuleCode(modules[j]).moduleMC;
      }
    }
  }

  // loop through exempted modules and add to totalMCs
  let exemptedModules = Object.keys(studentInfoObject.studentExemptedModules);
  for (var i=0; i<exemptedModules.length; i++) {
    if (!studentInfoObject.moduleChecked[exemptedModules[i]]) {
      electiveMCs += searchByModuleCode(exemptedModules[i]).moduleMC;
    }
  }

  // loop through waived modules and subtract to totalMCs
  let waivedModules = Object.keys(studentInfoObject.studentWaivedModules);
  for (var i=0; i<waivedModules.length; i++) {
    totalRequiredMCs -= searchByModuleCode(waivedModules[i]).moduleMC;
  }

  if (electiveMCs >= (graduationMCs - totalRequiredMCs))  {
    return true;
  }

  return false;
}
