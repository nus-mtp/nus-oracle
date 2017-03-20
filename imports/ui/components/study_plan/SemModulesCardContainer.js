import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session';
import { createContainer } from 'meteor/react-meteor-data';

// Import logic methods
import { getAllModulesInSemester } from '../../../api/crud-controller/module/methods.js';

// Import React components
import SemModulesCard from './SemModulesCard.jsx';

export default SemModulesCardContainer = createContainer((props) => {
  const sem = props.sem;
  const semesterIndex = props.semesterIndex;
  const plannerID = props.plannerID;

  // Load modules in the user's study plan based on the semester and planner
  const modules = getAllModulesInSemester(semesterIndex, plannerID);

  return {
    sem,
    modules,
  };
}, SemModulesCard);
