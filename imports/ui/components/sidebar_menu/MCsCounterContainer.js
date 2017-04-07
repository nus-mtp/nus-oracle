import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

// Import React components
import MCsCounter from './MCsCounter.jsx';

// Import logic functions
import { getTotalMCsForAllModules } from './../../../api/crud-controller/module/methods.js';

/**
 * Checks if the number of MCs is valid to be printed onscreen.
 *
 * Valid Display Format:
 * Display if takenMCs is not undefined, not NaN and we accept it even if it is 0
 *
 * @return {Boolean} True if is in valid display format, false otherwise
 */
function isValidMCsValue(takenMCs) {
  return takenMCs || takenMCs == 0 || !isNaN(takenMCs);
}

export default MCsCounterContainer = createContainer((props) => {
  const maxMCs = 160;
  let takenMCs = getTotalMCsForAllModules(props.activePlannerId);

  // Set display format for number of MCs
  let numMCs = "";
  if (isValidMCsValue(takenMCs)) {
    numMCs = takenMCs + ""; // Convert to string format
  }

  // Boolean to check if can graduate with this number of taken MCs
  let canGraduate = (takenMCs >= maxMCs);

  return {
    numMCs,
    canGraduate,
  };
}, MCsCounter);
