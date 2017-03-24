import { getStudentAcademicCohort,
         getStudentExemptedModules,
         getStudentWaivedModules } from '../database-controller/student/methods';
import { AY1617CSGradChecker } from '../logic/grad-checker/faculty/computing/computer-science/AY-1617/AY1617GradCheckerHandler.js';
import { AY1516CSGradChecker } from '../logic/grad-checker/faculty/computing/computer-science/AY-1516/AY1516GradCheckerHandler.js';
import { AY1415CSGradChecker } from '../logic/grad-checker/faculty/computing/computer-science/AY-1415/AY1415GradCheckerHandler.js';

export const getGraduationRequirements = function getGraduationRequirements(studentSemesters)  {
  // optional security check to see if studentplannerid can be found in the current user's planners
  const studentAcademicCohort = getStudentAcademicCohort();
  const studentExemptedModules = getStudentExemptedModules();
  const studentWaivedModules = getStudentWaivedModules();
  let graduationRequirements = {};

  // currently assumes only computing students
  switch (studentAcademicCohort)  {
    case 'AY 2016/2017':
    graduationRequirements = AY1617CSGradChecker(studentSemesters, studentAcademicCohort, studentExemptedModules, studentWaivedModules);
    break;
    case 'AY 2015/2016':
    graduationRequirements = AY1516CSGradChecker(studentSemesters, studentAcademicCohort, studentExemptedModules, studentWaivedModules);
    break;
    case 'AY 2014/2015':
    graduationRequirements = AY1415CSGradChecker(studentSemesters, studentAcademicCohort, studentExemptedModules, studentWaivedModules);
    break;
  }

  return graduationRequirements;
}
