import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

// Import React components
import MCsCounter from './MCsCounter.jsx';

// Import logic functions
import { getTotalMCsForAllModules } from './../../../api/crud-controller/module/methods.js';

export default MCsCounterContainer = createContainer((props) => {
  const maxMCs = 160;
  let takenMCs = getTotalMCsForAllModules(props.activePlannerId);
  console.log(takenMCs);

  // Set display format for number of MCs
  let numMCs = "";
  if (takenMCs) {
    numMCs = takenMCs + ""; // Convert to string format
  }

  // Boolean to check if can graduate with this number of taken MCs
  let canGraduate = (takenMCs >= maxMCs);

  return {
    numMCs,
    canGraduate,
  };
}, MCsCounter);
