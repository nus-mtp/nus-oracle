import { searchByModuleCode } from '../../../../../../../database-controller/module/methods';

export const findUnrestrictedElectivesRequirementModules = function findUnrestrictedElectivesRequirementModules(totalRequiredMCs, graduationMCs, studentSemesters) {
  // get total required MC to graduate
  let totalMCsInPlanner = 0;

  // loop through the planner, find total MCs in planner
  for (var i=0; i<studentSemesters.length; i++) {
    let modules = Object.keys(studentSemesters[i].moduleHashmap);
    for (var j=0; j<modules.length; j++)  {
      totalMCsInPlanner += searchByModuleCode(modules[j]).moduleMC;
    }
  }

  //console.log("totalMCsRequired " + totalRequiredMCs);
  //console.log("graduationMCs " + graduationMCs);

  const requiredMCsForUEs = graduationMCs - totalRequiredMCs;
  const plannerMCsForUEs = totalMCsInPlanner - totalRequiredMCs;

  //console.log("requiredMCs " + requiredMCsForUEs);
  //console.log("plannerMCs " + plannerMCsForUEs);

  if (plannerMCsForUEs >= requiredMCsForUEs)  {
    return true;
  }

  return false;
}
