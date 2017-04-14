import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session';
import { createContainer } from 'meteor/react-meteor-data';

// Import logic methods
import { getAllModulesInSemester } from '../../../api/student-logic-controller/crud-controller/module/methods.js';
import { findModuleInfo } from './../../../api/student-logic-controller/searcher-controller/controller.js';

// Import React components
import SemModulesCard from './SemModulesCard.jsx';

export default SemModulesCardContainer = createContainer((props) => {
  const sem = props.sem;
  const semesterIndex = props.semesterIndex;
  const plannerID = props.plannerID;

  // Load modules in the user's study plan based on the semester and planner
  // Map of module codes, e.g. {"CS1010" : "CS1010"}
  const moduleCodesMap = getAllModulesInSemester(semesterIndex, plannerID);

  let moduleCodesArray = Object.keys(moduleCodesMap);
  let modules = [];
  for (let i = 0; i < moduleCodesArray.length; i++) {
    modules.push(findModuleInfo(moduleCodesArray[i]));
  }

  return {
    sem,
    modules,
  };
}, SemModulesCard);
