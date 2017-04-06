import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

// Import React components
import AddNewPlanner from './AddNewPlanner.jsx';

// Import Logic methods
import { getStudentRepackagedDefaultPlannerIDs } from './../../../api/database-controller/student/methods.js';

export default AddNewPlannerContainer = createContainer((props) => {
  let defaultPlannerObjs = getStudentRepackagedDefaultPlannerIDs();

  // CS Foundation planner templates
  let genericCSPlannerName = null;
  let genericCSPlannerID = null;

  // Focus Area planner templates
  let focusAreaPlannerObjs = null;

  // Assign the appropriate CS Foundation and Focus Area study plan template
  // objects if available from backend
  if (defaultPlannerObjs) {
    genericCSPlanner = defaultPlannerObjs[0];
    focusAreaPlannerObjs = defaultPlannerObjs[1];

    // Get the generic CS planner name and ID if it exists
    if (genericCSPlanner) {
      genericCSPlannerName = Object.keys(genericCSPlanner)[0];
      genericCSPlannerID = genericCSPlanner[genericCSPlannerName];
    }
  }

  return {
    genericCSPlannerName,
    genericCSPlannerID,
    focusAreaPlannerObjs,
  };
}, AddNewPlanner);
