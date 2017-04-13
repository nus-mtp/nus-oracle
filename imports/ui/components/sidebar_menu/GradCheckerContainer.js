import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import { getGraduationRequirements } from '../../../api/student-logic-controller/gradchecker-controller/methods.js';
import { Criteria } from '../../../api/student-logic-controller/gradchecker-controller/criteria.js';
import { getAllSemestersInPlanner } from '../../../api/student-logic-controller/crud-controller/semester/methods';
import { getStudentExemptedModules,
         getStudentWaivedModules,
         getStudentAcademicCohort } from '../../../api/profile/student/methods';
import { AY1617 } from '../../../api/student-logic-controller/gradchecker-controller/allGraduationRequirements.js';
import Nestable from '../common/Nestable.jsx';
import NestableGradChecker from '../common/NestableGradChecker.jsx';

export default GradCheckerContainer = createContainer((props) => {
  const listType = props.listType;

  // TODO: Alternative implementation of GradChecker - Experiment - @walrys Wenhan
//   const semesters = getAllSemestersInPlanner(props.activePlannerId);
//   const exempted = getStudentExemptedModules();
//   const waived = getStudentWaivedModules();
//   modulesCompleted = [[],[],[]];
//   for(i in semesters)
//     modulesCompleted[0] = modulesCompleted[0].concat(Object.keys(semesters[i].moduleHashmap));
//   modulesCompleted[1] = modulesCompleted[1].concat(Object.keys(exempted));
//   modulesCompleted[2] = modulesCompleted[2].concat(Object.keys(waived));
//   foundation = new Criteria(AY1617,modulesCompleted);
//   const items = [foundation];
//   return { items };
// }, NestableGradChecker);         // for original implementation of grad checker

// ORIGINAL: Original grad checker
  const semesters = getAllSemestersInPlanner(props.activePlannerId);
  const requirements = getGraduationRequirements(semesters);
  const items = [requirements];
  return { items };
}, Nestable); // for Alternate implementation of grad checker
