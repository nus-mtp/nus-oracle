import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

import { getStudentRepackagedDefaultPlannerIDs } from './../../../api/database-controller/student/methods.js';

import AddNewPlanner from './AddNewPlanner.jsx';

export default AddNewPlannerContainer = createContainer((props) => {
  const genericCSPlannerName = "Generic CS Module";
  let defaultPlannerIDs = getStudentRepackagedDefaultPlannerIDs();

  return {
    defaultPlannerIDs,
    genericCSPlannerName,
  };
}, AddNewPlanner);
