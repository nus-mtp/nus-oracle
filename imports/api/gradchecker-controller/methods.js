import { getStudentAcademicCohort,
         getStudentExemptedModules,
         getStudentWaivedModules } from '../database-controller/student/methods';
import { getAllSemestersInPlanner } from '../crud-controller/semester/methods';
import { AY1617CSGradChecker } from '../logic/grad-checker/faculty/computing/computer-science/AY-1617';

export const getGraduationRequirements = function getGraduationRequirements(studentPlannerID)  {
  // optional security check to see if studentplannerid can be found in the current user's planners
  const studentAcademicCohort = getStudentAcademicCohort();
  const studentExemptedModules = getStudentExemptedModules();
  const studentWaivedModules = getStudentWaivedModules();
  const studentSemesters = getAllSemestersInPlanner(studentPlannerID);
  let graduationRequirements = {};

  if (studentAcademicCohort === 'AY 2016/2017') {
    graduationRequirements = AY1617CSGradChecker(studentSemesters, studentAcademicCohort, studentExemptedModules, studentWaivedModules);
  }
  return graduationRequirements;
}
