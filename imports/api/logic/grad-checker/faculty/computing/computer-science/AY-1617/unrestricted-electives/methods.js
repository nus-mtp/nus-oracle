import { searchByModuleCode } from '../../../../../../../database-controller/module/methods';

/* Explanation for UE calculation
 * The algorithm first finds the total required number of MCs a student has to complete
 * given all the fixed requirements earlier
 *
 * Next, it finds the total number of elective MCs from modules that are
 * inside the planner after being checked by all other requirements
 * It then adds to the elective MCs the number of MCs of exempted modules
 *
 * Next, it removes from the total required number of MCs, the MCs of
 * waived modules. This is because waived modules do count for electives
 *
 * Finally, we find the MCs the student needs to meet by comparing the difference
 * between the graduation required MCs and the total required MCs with the electiveMCs
 * accumulated earlier. If the electiveMCs exceed the difference, this means the student
 * has complete UEs. Otherwise, it the student has not
 */

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
