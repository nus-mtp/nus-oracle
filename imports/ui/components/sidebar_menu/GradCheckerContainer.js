import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import { getGraduationRequirements } from '../../../api/gradchecker-controller/methods.js';
import { Criteria } from '../../../api/gradchecker-controller/criteria.js';
import { getAllSemestersInPlanner } from '../../../api/crud-controller/semester/methods';
import { getStudentExemptedModules, getStudentWaivedModules } from '../../../api/database-controller/student/methods';
import { AY1617 } from '../../../api/gradchecker-controller/allGraduationRequirements.js';
import { getStudentAcademicCohort } from '../../../api/database-controller/student/methods.js';
import Nestable from '../common/Nestable.jsx';
import NestableGradChecker from '../common/NestableGradChecker.jsx';

export default GradCheckerContainer = createContainer((props) => {
  const listType = props.listType;

  const semesters = getAllSemestersInPlanner(props.activePlannerId);
  const exempted = getStudentExemptedModules();
  const waived = getStudentWaivedModules();
  modulesCompleted = [[],[],[]];
  for(i in semesters)
    modulesCompleted[0] = modulesCompleted[0].concat(Object.keys(semesters[i].moduleHashmap));
  modulesCompleted[1] = modulesCompleted[1].concat(Object.keys(exempted));
  modulesCompleted[2] = modulesCompleted[2].concat(Object.keys(waived));

  // const foundationReq =
  //   { name: 'Computer Science Foundation', subreq:[0,
  //       {name: "CS1010"},
  //       {name: "CS1020"},
  //       {name: "CS1231"}
  //   ],
  //   requiredMC:8, isStrictMC:false};
  // const requirements;
  // const requirements = getGraduationRequirements(semesters);
  // foundation = new Criteria(foundationReq.name, modulesCompleted, foundationReq.requiredMC , foundationReq.isStrictMC, foundationReq.subreq);
  // criteria = new Criteria(foundationReq, modulesCompleted);

  // TODO: Alternative implementation of GradChecker - Experiment - @walrys Wenhan
  // criteria = new Criteria(AY1617,modulesCompleted);
  // const items = [requirements];
  // const items = [criteria];
  // const items = AY1617(modulesCompleted);
  // console.log(getStudentAcademicCohort());

  const requirements = getGraduationRequirements(semesters);

  //console.log("Panel Reqs " + JSON.stringify(requirements));
  //foundation = new Criteria(foundationReq.name, modulesCompleted, foundationReq.requiredMC , foundationReq.isStrictMC, foundationReq.subreq);
  //foundation = new Criteria(foundationReq);
  const items = [requirements];
  // const items = [foundation];

  return { items };
}, Nestable);
//}, NestableGradChecker);
